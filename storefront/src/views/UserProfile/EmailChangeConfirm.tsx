import React, { useContext, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/client'
import { confirmEmailChangeMutation } from '@sdk/mutations/user'
import {
	ConfirmEmailChange,
	ConfirmEmailChangeVariables
} from '@sdk/mutations/types/ConfirmEmailChange'
import { userProfileSettingsUrl } from '@temp/app/routes'
import { UserContext } from '@temp/components/User/context'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const EmailChangeConfirm: React.FC = () => {
	const { enqueueSnackbar } = useSnackbar()
	const router = useRouter()
	const token = router.query?.token as string
	const user = useContext(UserContext)
	const [confirm] = useMutation<
		ConfirmEmailChange,
		ConfirmEmailChangeVariables
	>(confirmEmailChangeMutation)

	useEffect(() => {
		handleConfirm()
	}, [token])

	const handleConfirm = () => {
		confirm({
			variables: {
				token
			}
		})
			.then((res) => {
				const data = res.data.confirmEmailChange
				const errors = data.accountErrors
				if (!errors?.length) {
					user.logout()
					enqueueSnackbar(
						'Ваш email успешно изменен! Войдите в аккаунт с новыми данными',
						{
							variant: 'success'
						}
					)
				} else {
					enqueueSnackbar('Токен недействителен или истек срок действия', {
						variant: 'error'
					})
				}
			})
			.catch((err) => {
				enqueueSnackbar(err.message, {
					variant: 'error'
				})
			})
	}
	return (
		<div>
			<NextLink href={userProfileSettingsUrl}>
				<a>Аккаунт</a>
			</NextLink>
		</div>
	)
}

export default EmailChangeConfirm
