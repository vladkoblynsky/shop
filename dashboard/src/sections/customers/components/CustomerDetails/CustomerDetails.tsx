import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CardTitle from '@temp/components/CardTitle'
import { ControlledCheckbox } from '@temp/components/ControlledCheckbox'
import Skeleton from '@temp/components/Skeleton'
import { AccountErrorFragment } from '@temp/sections/customers/types/AccountErrorFragment'
import { maybe } from '@temp/misc'
import { getFormErrors } from '@temp/utils/errors'
import getAccountErrorMessage from '@temp/utils/errors/account'
import moment from 'moment-timezone'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { CustomerDetails_user } from '../../types/CustomerDetails'

const useStyles = makeStyles(
	(theme) => ({
		cardTitle: {
			height: 72,
		},
		checkbox: {
			marginBottom: theme.spacing(),
		},
		content: {
			paddingTop: theme.spacing(),
		},
		subtitle: {
			marginTop: theme.spacing(),
		},
	}),
	{ name: 'CustomerDetails' }
)

export interface CustomerDetailsProps {
	customer: CustomerDetails_user
	data: {
		isActive: boolean
		note: string
	}
	disabled: boolean
	errors: AccountErrorFragment[]
	onChange: (event: React.ChangeEvent<any>) => void
}

const CustomerDetails: React.FC<CustomerDetailsProps> = (props) => {
	const { customer, data, disabled, errors, onChange } = props

	const classes = useStyles(props)
	const intl = useIntl()

	const formErrors = getFormErrors(['note'], errors)

	return (
		<Card>
			<CardTitle
				className={classes.cardTitle}
				title={
					<>
						{maybe<React.ReactNode>(() => customer.email, <Skeleton />)}
						{customer && customer.dateJoined ? (
							<Typography
								className={classes.subtitle}
								variant='caption'
								component='div'
							>
								<FormattedMessage
									id='activer_member_since{date}'
									defaultMessage='Active member since {date}'
									description='section subheader'
									values={{
										date: moment(customer.dateJoined).format('MMM YYYY'),
									}}
								/>
							</Typography>
						) : (
							<Skeleton style={{ width: '10rem' }} />
						)}
					</>
				}
			/>
			<CardContent className={classes.content}>
				<ControlledCheckbox
					checked={data.isActive}
					className={classes.checkbox}
					disabled={disabled}
					label={intl.formatMessage({
						id: 'user_account_active',
						defaultMessage: 'User account active',
						description: 'check to mark this account as active',
					})}
					name='isActive'
					onChange={onChange}
				/>
				<TextField
					disabled={disabled}
					error={!!formErrors.note}
					fullWidth
					multiline
					helperText={getAccountErrorMessage(formErrors.note, intl)}
					name='note'
					label={intl.formatMessage({
						id: 'note',
						defaultMessage: 'Note',
						description: 'note about customer',
					})}
					value={data.note}
					onChange={onChange}
				/>
			</CardContent>
		</Card>
	)
}
CustomerDetails.displayName = 'CustomerDetails'
export default CustomerDetails
