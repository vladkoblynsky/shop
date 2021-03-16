import { useApolloClient } from '@apollo/client'
import * as React from 'react'

import { getAuthToken, removeAuthToken, setAuthToken } from '../../core/auth'
import { UserContext } from './context'
import { tokenVeryficationMutation } from '@sdk/mutations/user'
import {
	VerifyToken,
	VerifyTokenVariables
} from '@sdk/mutations/types/VerifyToken'
import { TokenAuth_tokenCreate_user } from '@sdk/mutations/types/TokenAuth'
import { User } from '@sdk/fragments/types/User'
import { useCallback, useContext, useEffect, useState } from 'react'
import {
	CheckoutContext,
	FavoritesContextInterface
} from '@temp/components/CheckoutProvider/context'

interface IProps {
	tokenExpirationHandler?(callback: () => void): void
}

const UserProvider: React.FC<IProps> = ({
	children,
	tokenExpirationHandler
}) => {
	const apolloClient = useApolloClient()
	const checkout = useContext<FavoritesContextInterface>(CheckoutContext)
	const [errors, setErrors] = useState(null)
	const [token, setToken] = useState<string | null>(getAuthToken())
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(!!token)

	useEffect(() => {
		if (tokenExpirationHandler) {
			tokenExpirationHandler(logout)
		}
	}, [tokenExpirationHandler])

	useEffect(() => {
		if (token) {
			authenticate(token)
		}
	}, [token])

	useEffect(() => {
		if (token) {
			setAuthToken(token)
		} else {
			removeAuthToken()
		}
	}, [token])

	const login = useCallback(
		(token: string, user: TokenAuth_tokenCreate_user) => {
			setErrors(null)
			setLoading(false)
			setToken(token)
			setUser(user)
			checkout.findUserCheckout()
		},
		[]
	)

	const logout = useCallback(() => {
		setToken(null)
		setUser(null)
		if (checkout.checkout.token) {
			checkout.resetCheckout()
		}
	}, [])

	const authenticate = useCallback(
		async (token: string) => {
			setLoading(true)
			try {
				const {
					data: {
						tokenVerify: { user }
					}
				} = await apolloClient.mutate<VerifyToken, VerifyTokenVariables>({
					mutation: tokenVeryficationMutation,
					variables: { token }
				})
				setErrors(null)
				setToken(token)
				setUser(user)
				setLoading(false)
				checkout.findUserCheckout()
			} catch ({ message }) {
				setErrors(message)
				setLoading(false)
				if (checkout.checkout.token) {
					checkout.resetCheckout()
				}
			}
		},
		[user]
	)

	const updateUser = useCallback((user: User | null) => {
		setUser(user)
	}, [])
	return (
		<UserContext.Provider
			value={{
				token,
				user,
				authenticate,
				errors,
				loading,
				login,
				logout,
				updateUser
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
