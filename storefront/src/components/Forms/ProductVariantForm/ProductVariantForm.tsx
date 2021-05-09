import './scss/ProductVariantForm.scss'

import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { FormControl, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import { ProductVariant } from '@sdk/fragments/types/ProductVariant'
import { MAX_CHECKOUT_VARIANT_LINES } from '@temp/constants'
import _ from 'lodash'
import Button from '@material-ui/core/Button'
import {
	ProductWithVariants,
	ProductWithVariants_variants_attributes
} from '@sdk/fragments/types/ProductWithVariants'
import {
	getProductVariantsAttributes,
	selectVariantByAttributes
} from '@temp/views/ProductDetails/utils'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
	select: {
		padding: '10px 14px'
	},
	chipsRoot: {
		display: 'flex',
		flexWrap: 'wrap',
		'& > *': {
			margin: theme.spacing(0.5)
		}
	},
	chipsLabel: {
		paddingLeft: 5,
		color: '#000'
	}
}))

export type TFormProductVariantData = {
	variant: string
	quantity: number
}

interface ProductVariantFormProps {
	product: ProductWithVariants
	selectedVariant: ProductVariant | null
	checkoutVariantQuantity: (selectedVariantId: string) => number

	addVariantToCheckoutSubmit(values: TFormProductVariantData): void

	setSelectedVariant(variant: ProductVariant | null): void

	setSelectedQuantity(quantity: number)
}

const getInitialAttributes = (
	attrs: ProductWithVariants_variants_attributes[]
) => {
	const data = {}
	if (attrs) {
		attrs.forEach((attr) => {
			if (!!attr.values.length) {
				data[attr.attribute.id] = attr.values[0].id
			}
		})
	}
	return data
}

const ProductVariantForm: React.FC<ProductVariantFormProps> = ({
	product,
	addVariantToCheckoutSubmit,
	setSelectedVariant,
	setSelectedQuantity,
	selectedVariant,
	checkoutVariantQuantity
}) => {
	const classes = useStyles()
	const [selectedAttrs, setSelectedAttrs] = React.useState(
		getInitialAttributes(product.variants[0]?.attributes)
	)
	let selectedVariantStockQuantity = 0
	let availableQuantity = MAX_CHECKOUT_VARIANT_LINES
	if (selectedVariant) {
		selectedVariantStockQuantity = _.sumBy(
			selectedVariant.stocks,
			(stock) => stock.stockQuantity
		)
		availableQuantity = Math.min(
			selectedVariantStockQuantity -
				checkoutVariantQuantity(selectedVariant.id),
			MAX_CHECKOUT_VARIANT_LINES
		)
	}

	const schema = Yup.object().shape({
		variant: Yup.string().required('Вариант не выбран'),
		quantity: Yup.number()
			.required('Минимальное количество заказа 1')
			.integer('Должно быть целое число')
			.positive('Минимальное количество заказа 1')
			.max(availableQuantity, `Доступно ${availableQuantity}`)
	})
	const attributes = getProductVariantsAttributes(product)
	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			variant: product.variants[0]?.id || '',
			quantity: 1
		},
		validationSchema: schema,
		onSubmit: (values: TFormProductVariantData) => {
			addVariantToCheckoutSubmit(values)
			form.resetForm()
			setSelectedAttrs(getInitialAttributes(product.variants[0]?.attributes))
		}
	})

	useEffect(() => {
		const selectedVariant = product.variants.filter(
			(el) => el.id === form.values.variant
		)[0]
		setSelectedVariant(selectedVariant || null)
		setSelectedQuantity(form.values.quantity)
	}, [form.values])

	useEffect(() => {
		form.setFieldValue('quantity', 1)
	}, [form.values.variant])

	useEffect(() => {
		form.resetForm()
	}, [product])

	const onChangeAttributeChip = (attrId, value) => () => {
		const newAttrs = {
			...selectedAttrs,
			[attrId]: value
		}
		setSelectedAttrs(newAttrs)
		const newSelectedVariant = selectVariantByAttributes(
			product.variants,
			newAttrs
		)
		form.setFieldValue('variant', newSelectedVariant?.id)
	}

	const isDisabledChip = (attrId, value): boolean => {
		const newAttrs = {
			...selectedAttrs,
			[attrId]: value
		}
		return !selectVariantByAttributes(product.variants, newAttrs)
	}

	return (
		<div className='product-form'>
			<form onSubmit={form.handleSubmit}>
				<Grid container spacing={0}>
					{attributes.map((attr) => {
						const options = attr.values
							.map((val) => ({
								label: val.name,
								value: val.id
							}))
							.filter((opt) => !isDisabledChip(attr.id, opt.value))
						if (options.length < 2) return null
						return (
							<Grid key={attr.id} item xs={12}>
								<div className={classes.chipsLabel}>{attr.name}</div>
								<div className={classes.chipsRoot}>
									{options.map((opt, idx) => (
										<Chip
											label={opt.label}
											key={idx}
											variant={
												selectedAttrs[attr.id] === opt.value
													? 'default'
													: 'outlined'
											}
											onClick={onChangeAttributeChip(attr.id, opt.value)}
											// size='small'
											color='secondary'
										/>
									))}
								</div>
								<div className='my-10'>
									<Divider />
								</div>
							</Grid>
						)
					})}
				</Grid>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={4}>
						<div className='product-form__quantity'>
							<FormControl margin='normal' fullWidth>
								<TextField
									id='id_quantity'
									name='quantity'
									label='Количество'
									disabled={availableQuantity === 0}
									inputProps={{
										min: 1,
										max: availableQuantity,
										step: 1
									}}
									type='number'
									helperText={form.touched.quantity && form.errors.quantity}
									error={!!(form.touched.quantity && form.errors.quantity)}
									onChange={form.handleChange}
									value={form.values.quantity}
									onBlur={form.handleBlur}
									variant='outlined'
									fullWidth
								/>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12} sm={8} className='flex items-center'>
						<div className='pt-5 w-full'>
							<Button
								type='submit'
								variant='contained'
								color='secondary'
								size='large'
								fullWidth
								disabled={!form.isValid || !selectedVariantStockQuantity}
							>
								Добавить в корзину
							</Button>
						</div>
					</Grid>
				</Grid>
			</form>
		</div>
	)
}

export default ProductVariantForm
