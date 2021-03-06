import React from 'react'
import { Order_lines } from '@sdk/fragments/types/Order'
import NextLink from 'next/link'
import { getProductUrl } from '@temp/app/routes'
import { getDBIdFromGraphqlId, priceToString } from '@temp/core/utils'
import { Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import PlaceHolder from 'images/placeholder540x540.png'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	avatar: {
		width: 100,
		height: 100,
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			height: 'auto'
		},
		'& img': {
			objectFit: 'contain'
		}
	}
}))

const OrderLine: React.FC<{
	line: Order_lines
	divider?: boolean
	addReview(): void
	canAddReview: boolean
}> = ({ line, divider, addReview, canAddReview }) => {
	const classes = useStyles()

	return (
		<div className='flex flex-wrap py-10 relative'>
			<div className='max-w-300 pr-10 flex items-center m-auto'>
				<NextLink
					href={getProductUrl(
						line.variant?.product.slug,
						line.variant?.product.id
					)}
					passHref
				>
					<a className='block'>
						<Avatar
							src={line.thumbnail?.url || PlaceHolder}
							alt={line.productName}
							className={classes.avatar}
							variant='rounded'
						/>
					</a>
				</NextLink>
			</div>
			<div className='flex-1 pb-10 min-w-300 xs:text-center sm:text-left'>
				<div className='mb-5'>
					<NextLink
						href={getProductUrl(
							line.variant?.product.slug,
							line.variant?.product.id
						)}
						passHref
					>
						<Typography
							component={'a'}
							variant='h6'
							color='primary'
							className='text-xl'
						>
							{line.productName}
						</Typography>
					</NextLink>
				</div>
				<div className='text-gray-500'>
					№ {getDBIdFromGraphqlId(line.variant?.id, 'ProductVariant')}
				</div>
				<div className='text-base text-gray-500'>
					{line.variant?.attributes && (
						<div>
							{line.variant.attributes.map((attr, idx) => (
								<span key={idx}>
									{attr.attribute.name}:{' '}
									{attr.values.map((val) => (
										<span key={val.id}>{val.name}</span>
									))}
									;{' '}
								</span>
							))}
						</div>
					)}
					<div>Количетсво: {line.quantity}</div>
					<div>
						Цена за ед.:{' '}
						{priceToString({
							amount: line.unitPrice.gross.amount,
							currency: line.unitPrice.currency
						})}
					</div>
					<div>
						Сумма:{' '}
						{priceToString({
							amount: line.unitPrice.gross.amount * line.quantity,
							currency: line.unitPrice.currency
						})}
					</div>
				</div>
				{canAddReview && (
					<div className='mt-10'>
						<Button
							variant='outlined'
							size='small'
							disabled={!!line.productreview}
							onClick={(e) => (!line.productreview ? addReview() : null)}
						>
							{line.productreview ? 'Отзыв добавлен' : 'Оставить отзыв'}
						</Button>
					</div>
				)}
			</div>
			{divider && <Divider absolute />}
		</div>
	)
}

export default OrderLine
