import gql from "graphql-tag";
import {paymentMethodFragment} from "@sdk/fragments/payment-method";

export const paymentMethodsQuery = gql`
    ${paymentMethodFragment}
    query PaymentMethods($first: Int!){
        paymentMethods(first: $first){
            edges{
                node{
                    ...PaymentMethod
                }
            }
        }
    }
`;