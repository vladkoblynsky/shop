import './scss/Search.scss'

import React, { useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import Autosuggest from 'react-autosuggest'
import { TextField } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { useLazyQuery } from '@apollo/client'
import { productsCardQuery } from '@sdk/queries/product'
import {
	ProductsCardDetails,
	ProductsCardDetailsVariables
} from '@sdk/queries/types/ProductsCardDetails'
import { getProductUrl, searchUrl } from '@temp/app/routes'
import { showPriceRange } from '@temp/core/utils'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import { OverlayContext, OverlayType } from '@temp/components'
import NextLink from 'next/link'

const getSuggestionValue = (edge) => edge.node?.name || edge.name || ''

const renderSuggestion = (edge: any) => {
	if (edge.id === 'empty') {
		return (
			<div className='flex items-center justify-center w-full'>
				Ничего не найдено
			</div>
		)
	}
	if (edge.id === 'showAll') {
		return (
			<div className='flex items-center justify-center w-full'>
				<NextLink href={`${searchUrl}?q=${edge.q}`} passHref>
					<Button component='a' color='primary' size='small'>
						Показать все результаты
					</Button>
				</NextLink>
			</div>
		)
	}
	return (
		<NextLink href={getProductUrl(edge.node.slug, edge.node.id)} passHref>
			<a>
				<div className='react-autosuggest__img'>
					{edge.node.thumbnail && (
						<img src={edge.node.thumbnail.url} alt={edge.node.thumbnail.alt} />
					)}
				</div>

				<div className='react-autosuggest__name'>{edge.node.name}</div>
				<div className='react-autosuggest__price'>
					<Typography variant='body1' className='leading-tight'>
						{showPriceRange(edge.node.priceRange)}
					</Typography>
				</div>
			</a>
		</NextLink>
	)
}

const renderInputComponent = ({ loading, ...inputProps }) => (
	<TextField
		name='q'
		{...inputProps}
		className='search__field'
		InputLabelProps={{
			shrink: true
		}}
		InputProps={{
			...inputProps,
			endAdornment: (
				<InputAdornment position='end'>
					<IconButton type='submit' aria-label='Поиск'>
						{loading ? <CircularProgress size={20} /> : <SearchIcon />}
					</IconButton>
				</InputAdornment>
			)
		}}
		fullWidth
		placeholder='Я ищу...'
		variant='outlined'
	/>
)

const PAGINATE_BY = 5

const debounced = _.debounce((cb: () => void) => {
	cb()
}, 1000)

const Search: React.FC = () => {
	const [value, setValue] = useState('')
	const [search, setSearch] = useState('')
	const [suggestions, setSuggestions] = useState<any[]>([])
	const overlay = useContext(OverlayContext)

	const [loadProducts, { data, loading }] = useLazyQuery<
		ProductsCardDetails,
		ProductsCardDetailsVariables
	>(productsCardQuery, {
		variables: {
			first: PAGINATE_BY,
			filter: {
				search: search
			},
			includeCategory: false
		}
	})

	useEffect(() => {
		if (data) {
			const empty = { id: 'empty' }
			const showAll = { id: 'showAll', q: search, name: search }
			const edges = data?.products?.edges
			let result = []
			if (edges && data.products.pageInfo.hasNextPage) {
				result = [...edges, showAll]
			} else if (edges && edges.length > 0) {
				result = edges
			} else {
				result = [empty]
			}
			setSuggestions(result)
		}
	}, [data])

	const onChange = (event, { newValue }) => {
		setValue(newValue)
	}
	const onFocus = (event) => {
		overlay.show(OverlayType.search)
	}
	const onBlur = (event) => {
		overlay.hide()
	}
	const onSuggestionsFetchRequested = async ({ value }) => {
		if (!!value && value.length > 1) {
			debounced(() => {
				setSearch(value)
				loadProducts()
			})
		}
	}
	const onSuggestionsClearRequested = () => {
		// setSuggestions([]);
	}

	const inputProps = {
		value,
		onChange,
		loading,
		onFocus,
		onBlur
	}

	return (
		<div className='search relative'>
			<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={onSuggestionsFetchRequested}
				onSuggestionsClearRequested={onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				renderInputComponent={renderInputComponent}
				inputProps={inputProps}
			/>
		</div>
	)
}

export default Search
