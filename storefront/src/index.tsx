import { hot } from "react-hot-loader";
import { ThemeProvider } from '@material-ui/core/styles';

import {
    useAuth
} from "@sdk/react";
import { defaultTheme } from "@styles";

// import { persistCache } from "apollo-cache-persist";
import * as React from "react";
import { render } from "react-dom";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";

import { App } from "./app";
import { apiUrl } from "./constants";
// import { history } from "./history";

import {OverlayProvider} from "./components";

import {
    authLink,
    removeAuthToken,
} from "./core/auth";
import {ErrorBoundary} from "react-error-boundary";
import {SnackbarProvider, useSnackbar} from "notistack";
import {isJwtError} from "@temp/core/errors";
import UserProvider from "@temp/components/User";
import CheckoutProvider from "@temp/components/CheckoutProvider";
import FavoritesProvider from "@temp/components/FavoritesProvider";
import {RetryLink} from "@apollo/client/link/retry";
import {BatchHttpLink} from "@apollo/client/link/batch-http";
import {ApolloClient, ApolloLink, ApolloProvider, defaultDataIdFromObject, InMemoryCache} from "@apollo/client";
import {ErrorResponse, onError} from "@apollo/client/link/error";

interface ResponseError extends ErrorResponse {
    networkError?: Error & {
        statusCode?: number;
        bodyText?: string;
    };
}

// const { link: invalidTokenLink } = invalidTokenLinkWithTokenHandlerComponent(
//     UserProvider
// );

const invalidTokenLink = onError((error: ResponseError) => {
    if (
        (error.networkError && error.networkError.statusCode === 401) ||
        error.graphQLErrors?.some(isJwtError)
    ) {
        removeAuthToken();
    }
});

const link = ApolloLink.from([
    invalidTokenLink,
    authLink,
    new RetryLink(),
    new BatchHttpLink({ uri: apiUrl }),
]);

const cache = new InMemoryCache({
    dataIdFromObject: obj => {
        if (obj.__typename === "Shop") {
            return "shop";
        }
        return defaultDataIdFromObject(obj);
    },
});

const startApp = async () => {
    // await persistCache({
    //   cache,
    //   storage: window.localStorage,
    // });

    const apolloClient = new ApolloClient({
        cache,
        link,
    });

    const Root = hot(module)(() => {
        const Notifications = () => {
            const { enqueueSnackbar } = useSnackbar();

            // const { updateAvailable } = React.useContext(ServiceWorkerContext);
            const updateAvailable = false;

            React.useEffect(() => {
                if (updateAvailable) {
                    enqueueSnackbar(
                        "To update the application to the latest version, please refresh the page!",
                        {
                            variant: 'warning',
                            autoHideDuration: 3000,
                            action: true,
                        }
                    );
                }
            }, [updateAvailable]);

            useAuth((authenticated: boolean) => {
                if (authenticated) {
                    enqueueSnackbar("Вы вошли в свой аккаунт", {
                        variant: "info"
                    });
                } else {
                    enqueueSnackbar("Вы вышли из своего аккаунта",{
                        variant: "info"
                    });
                }
            });
            return null;
        };

        function ErrorFallback({error, componentStack, resetErrorBoundary}) {
            console.log('error boundary', error);
            return (
                <div role="alert">
                    <p>Something went wrong:</p>
                    <pre>{error.message}</pre>
                    <pre>{componentStack}</pre>
                    <button onClick={resetErrorBoundary}>Try again</button>
                </div>
            )
        }
        const errorHandler = (error: Error, componentStack: string) => {
            // Do something with the error
            // E.g. log to an error logging client here
            console.log('error handler', error);
        };

        return (
            <BrowserRouter>
                <QueryParamProvider ReactRouterRoute={Route}>
                    <ApolloProvider client={apolloClient}>
                        <CheckoutProvider>
                            {({checkoutContext}) =>
                                <UserProvider refreshUser={true}
                                              apolloClient={apolloClient}
                                              onUserLogin={() => {
                                                  checkoutContext.findUserCheckout()
                                              }
                                              }
                                              onUserLogout={() => {
                                                  if (checkoutContext.checkout.token) {
                                                      checkoutContext.resetCheckout();
                                                  }
                                              }
                                              }>
                                    <OverlayProvider>
                                        <FavoritesProvider>
                                            <ErrorBoundary
                                                FallbackComponent={ErrorFallback}
                                                onError={errorHandler}
                                                // onReset={() => {
                                                //     apolloClient.resetStore()
                                                // }}
                                            >
                                                <Switch>
                                                    <Route component={App} />
                                                </Switch>
                                                <Notifications />
                                            </ErrorBoundary>
                                        </FavoritesProvider>
                                    </OverlayProvider>
                                </UserProvider>
                            }
                        </CheckoutProvider>
                    </ApolloProvider>
                </QueryParamProvider>
            </BrowserRouter>
        );
    });
    render(
        <ThemeProvider theme={defaultTheme}>
            <SnackbarProvider maxSnack={3}
                              autoHideDuration={3000}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                              }}
                // action={(key) => (
                //     <IconButton onClick={() => closeSnackbar(key)}>
                //         <CloseIcon/>
                //     </IconButton>
                // )}
                              domRoot={document.getElementById("react-notification")}
            >
                <Root />
            </SnackbarProvider>
        </ThemeProvider>,
        document.getElementById("root")
    );
    // Hot Module Replacement API
    if (module.hot) {
        module.hot.accept();
    }
};

startApp();