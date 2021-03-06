import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import { ProductErrorFragment } from '@temp/sections/products/types/ProductErrorFragment'
import CardTitle from '@temp/components/CardTitle'
import FormSpacer from '@temp/components/FormSpacer'
import { commonMessages } from '@temp/intl'
import { getFormErrors, getProductErrorMessage } from '@temp/utils/errors'
import React from 'react'
import { useIntl } from 'react-intl'
import { RichCKEditor } from '@temp/components/RichCkeditor'
import { Grid } from '@material-ui/core'

interface ProductDetailsFormProps {
	data: {
		description: string
		name: string
		unit: string
	}
	disabled?: boolean
	errors: ProductErrorFragment[]
	initialDescription?: string
	onChange(event: any)
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
	data,
	disabled,
	errors,
	initialDescription,
	onChange
}) => {
	const intl = useIntl()

	const formErrors = getFormErrors(['name', 'description', 'unit'], errors)

	return (
		<Card>
			<CardTitle
				title={intl.formatMessage(commonMessages.generalInformation)}
			/>
			<CardContent>
				<Grid container spacing={1}>
					<Grid item xs={10}>
						<TextField
							error={!!formErrors.name}
							helperText={getProductErrorMessage(formErrors.name, intl)}
							disabled={disabled}
							fullWidth
							label={intl.formatMessage({
								id: 'name',
								defaultMessage: 'Name',
								description: 'product name'
							})}
							name='name'
							value={data.name}
							onChange={onChange}
						/>
					</Grid>
					<Grid item xs={2}>
						<TextField
							error={!!formErrors.unit}
							helperText={getProductErrorMessage(formErrors.unit, intl)}
							disabled={disabled}
							fullWidth
							label={intl.formatMessage({
								id: 'unit',
								defaultMessage: 'Unit',
								description: 'product unit'
							})}
							name='unit'
							value={data.unit}
							onChange={onChange}
						/>
					</Grid>
				</Grid>
				<FormSpacer />
				<RichCKEditor
					disabled={disabled}
					data={data.description}
					name={'description'}
					onChange={onChange}
				/>
			</CardContent>
		</Card>
	)
}
export default ProductDetailsForm
