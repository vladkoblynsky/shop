import '../globalStyles/scss/index.scss'

import React, { useMemo } from 'react'
import { NextQueryParamProvider } from '@temp/components/NextQueryParamProvider'
import { App as StorefrontApp } from '@temp/app'
import { SnackbarProvider } from 'notistack'
import { ShopProvider } from '@temp/components/Shop'
import CheckoutProvider from '@temp/components/CheckoutProvider'
import UserProvider from '@temp/components/User'
import { OverlayProvider } from '@temp/components'
import FavoritesProvider from '@temp/components/FavoritesProvider'
import { ErrorBoundary } from 'react-error-boundary'
import {
	defaultTheme,
	desktopSsrMatchMedia,
	mobileSsrMatchMedia
} from '@temp/themes'
import { apiUrl, ssrMode } from '@temp/constants'
import { gtmId, isDev } from '@temp/core/config'
import TagManager from 'react-gtm-module'
import { ThemeProvider } from '@material-ui/styles'
import withApollo from 'next-with-apollo'
import {
	ApolloClient,
	ApolloLink,
	ApolloProvider,
	defaultDataIdFromObject,
	InMemoryCache
} from '@apollo/client'
import { relayStylePagination } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { isJwtError } from '@temp/core/errors'
import { authLink, removeAuthToken } from '@temp/core/auth'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { RetryLink } from '@apollo/client/link/retry'
import { getDataFromTree } from '@apollo/client/react/ssr'
import SwiperCore, { Lazy, Navigation, Pagination, Thumbs } from 'swiper'

async function initTagManager() {
	TagManager.initialize({
		gtmId: gtmId
	})
}
if (!ssrMode) {
	SwiperCore.use([Thumbs, Navigation, Lazy, Pagination])
}
if (!ssrMode && !isDev && !!gtmId) {
	initTagManager().then(() => {
		console.log('App started! GTM initialized!')
	})
}

function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
	console.log('error boundary', error)
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<pre>{componentStack}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

const AppWithApollo = ({ Component, pageProps, apollo }) => {
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])
	const theme = useMemo(() => {
		return {
			...defaultTheme,
			props: {
				MuiUseMediaQuery: {
					ssrMatchMedia:
						pageProps?.deviceType === 'mobile'
							? mobileSsrMatchMedia
							: desktopSsrMatchMedia
				}
			}
		}
	}, [pageProps?.deviceType, defaultTheme])
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				maxSnack={3}
				autoHideDuration={3000}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
			>
				<NextQueryParamProvider>
					<ApolloProvider client={apollo}>
						<OverlayProvider>
							<FavoritesProvider>
								<ShopProvider>
									<CheckoutProvider>
										<UserProvider>
											<ErrorBoundary FallbackComponent={ErrorFallback}>
												<StorefrontApp>
													<Component {...pageProps} />
												</StorefrontApp>
											</ErrorBoundary>
										</UserProvider>
									</CheckoutProvider>
								</ShopProvider>
							</FavoritesProvider>
						</OverlayProvider>
					</ApolloProvider>
				</NextQueryParamProvider>
			</SnackbarProvider>
		</ThemeProvider>
	)
}

export default withApollo(
	({ initialState, ctx, headers }) => {
		const cache = new InMemoryCache({
			typePolicies: {
				Query: {
					fields: {
						products: relayStylePagination([
							'categories',
							'attributes',
							'price',
							'sortBy',
							'filter',
							'ids'
						])
					}
				}
			},
			dataIdFromObject: (obj) => {
				if (obj.__typename === 'Shop') {
					return 'shop'
				}
				return defaultDataIdFromObject(obj)
			}
		}).restore(initialState || {})
		const invalidTokenLink = onError((error: any) => {
			console.log(error)
			try {
				if (
					(error.networkError && error.networkError.statusCode === 401) ||
					error.graphQLErrors?.some(isJwtError)
				) {
					removeAuthToken()
				}
			} catch (e) {
				console.log(e)
			}
		})

		const batchLink = new BatchHttpLink({ uri: apiUrl, batchInterval: 50 })
		const link = ApolloLink.from([
			invalidTokenLink,
			authLink,
			new RetryLink(),
			batchLink
		])
		return new ApolloClient({
			link: link,
			credentials: 'include',
			headers: {
				cookie: ctx?.req?.headers.cookie || ''
			},
			cache: cache,
			ssrMode: ssrMode,
			ssrForceFetchDelay: 0
		})
	},
	{
		getDataFromTree: getDataFromTree
	}
)(AppWithApollo)
