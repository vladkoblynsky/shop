import { gql } from "@apollo/client";

export const ShopImageFragment = gql`
fragment ShopImageFragment on SiteBannerImage{
    id
    alt
    description
    sortOrder
    url(size: "1600x900", method: THUMBNAIL_WEBP)
}
`;

export const ShopBaseFragment = gql`
    fragment Shop on Shop{
        name
        description
        headerText
        defaultCurrency
        defaultMailSenderAddress
        defaultMailSenderName
        defaultWeightUnit
        domain{
            host
            url
        }
    }
`;