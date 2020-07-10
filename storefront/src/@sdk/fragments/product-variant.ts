import gql from "graphql-tag";
import {attributeFragment} from "@sdk/fragments/attribute";

export const productVariantFragment = gql`
    ${attributeFragment}
    fragment ProductVariant on ProductVariant{
        id
        name
        sku
        stocks{
            id
            stockQuantity
        }
        price{
            currency
            amount
        }
        images{
            id
            url
            alt
        }
        weight{
            value
            unit
        },
        attributes{
            attribute{
                ...Attribute
            }
            values{
                id
                inputType
                name
                slug
            }
        }
    }
`;