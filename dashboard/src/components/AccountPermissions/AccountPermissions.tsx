import {
	Checkbox,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CardTitle from '@temp/components/CardTitle'
import Skeleton from '@temp/components/Skeleton'
import useUser from '@temp/hooks/useUser'
import { PermissionData } from '@temp/sections/permissionGroups/components/PermissionGroupDetailsPage/PermissionGroupDetailsPage'
import React from 'react'
import { useIntl } from 'react-intl'

const useStyles = makeStyles(
	(theme) => ({
		checkboxContainer: {
			marginTop: theme.spacing(),
		},
		hr: {
			backgroundColor: theme.palette.divider,
			border: 'none',
			height: 1,
			marginBottom: 0,
			marginTop: 0,
		},
	}),
	{ name: 'AccountPermissions' }
)

interface AccountPermissionsProps {
	permissions: PermissionData[]
	permissionsExceeded: boolean
	data: {
		hasFullAccess: boolean
		permissions: string[]
	}
	disabled: boolean
	description: string
	errorMessage: string
	fullAccessLabel: string
	onChange: (event: React.ChangeEvent<any>, cb?: () => void) => void
}

const AccountPermissions: React.FC<AccountPermissionsProps> = (props) => {
	const {
		data,
		disabled,
		permissions,
		permissionsExceeded,
		onChange,
		description,
		fullAccessLabel,
		errorMessage,
	} = props
	const classes = useStyles(props)
	const intl = useIntl()
	const { user } = useUser()

	const handleFullAccessChange = () => {
		onChange({
			target: {
				name: 'permissions',
				value: !data.hasFullAccess ? permissions.map((perm) => perm.code) : [],
			},
		} as any)
		onChange({
			target: {
				name: 'hasFullAccess',
				value: !data.hasFullAccess,
			},
		} as any)
	}
	const handlePermissionChange = (key, value) => () => {
		onChange({
			target: {
				name: 'permissions',
				value: !value
					? data.permissions.concat([key])
					: data.permissions.filter((perm) => perm !== key),
			},
		} as any)
	}

	return (
		<Card>
			<CardTitle
				title={intl.formatMessage({
					id: 'permissions',
					defaultMessage: 'Permissions',
					description: 'dialog header',
				})}
			/>
			{permissionsExceeded && (
				<>
					<CardContent>
						<Typography>
							{intl.formatMessage({
								id: 'groups_permissions_exceeds_your_own',
								defaultMessage:
									'This groups permissions exceeds your own. You are able only to manage permissions that you have.',
								description: 'exceeded permissions description',
							})}
						</Typography>
					</CardContent>
					<hr className={classes.hr} />
					<CardContent>
						<Typography>
							{intl.formatMessage({
								id: 'available_permissions',
								defaultMessage: 'Available permissions',
								description: 'card section description',
							})}
						</Typography>
						<List dense={true}>
							{user.userPermissions.map((perm) => (
								<ListItem key={perm.code}>
									<ListItemText primary={`- ${perm.name}`} />
								</ListItem>
							))}
						</List>
					</CardContent>
				</>
			)}
			{!permissionsExceeded && (
				<>
					<CardContent>
						<Typography>{description}</Typography>
						<ListItem
							role={undefined}
							dense
							button
							onClick={handleFullAccessChange}
						>
							<ListItemIcon>
								<Checkbox
									edge='start'
									checked={data.hasFullAccess}
									disabled={disabled}
									tabIndex={-1}
									disableRipple
									inputProps={{ 'aria-labelledby': 'fullAccess' }}
								/>
							</ListItemIcon>
							<ListItemText primary={fullAccessLabel} />
						</ListItem>
					</CardContent>
					{!data.hasFullAccess && (
						<>
							<hr className={classes.hr} />
							<CardContent>
								{permissions === undefined ? (
									<Skeleton />
								) : (
									permissions.map((perm, i) => (
										<ListItem
											key={i}
											disabled={perm.disabled}
											role={undefined}
											dense
											button
											onClick={handlePermissionChange(
												perm.code,
												data.permissions.filter(
													(userPerm) => userPerm === perm.code
												).length === 1
											)}
										>
											<ListItemIcon>
												<Checkbox
													edge='start'
													checked={
														data.permissions.filter(
															(userPerm) => userPerm === perm.code
														).length === 1
													}
													tabIndex={-1}
													disableRipple
													name={perm.code}
													inputProps={{ 'aria-labelledby': perm.code }}
												/>
											</ListItemIcon>
											<ListItemText
												id={perm.code}
												primary={perm.name.replace(/\./, '')}
												secondary={
													perm.lastSource &&
													intl.formatMessage({
														id: 'group_is_last_source_of_that_permission',
														defaultMessage:
															'This group is last source of that permission',
														description: 'permission list item description',
													})
												}
											/>
										</ListItem>
									))
								)}
							</CardContent>
						</>
					)}
					{!!errorMessage && (
						<>
							<hr className={classes.hr} />
							<CardContent>
								<Typography color='error'>{errorMessage}</Typography>
							</CardContent>
						</>
					)}
				</>
			)}
		</Card>
	)
}

AccountPermissions.displayName = 'AccountPermissions'
export default AccountPermissions
