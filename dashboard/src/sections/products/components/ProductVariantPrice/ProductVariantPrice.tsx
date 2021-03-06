import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import CardTitle from "@temp/components/CardTitle";
import PriceField from "@temp/components/PriceField";
import { getFormErrors, getProductErrorMessage } from "@temp/utils/errors";
import React from "react";
import { useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    grid: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "ProductVariantPrice" }
);

interface ProductVariantPriceProps {
  currencySymbol?: string;
  priceOverride?: number;
  costPrice?: number;
  errors: ProductErrorFragment[];
  loading?: boolean;
  onChange(event: any);
}

const ProductVariantPrice: React.FC<ProductVariantPriceProps> = props => {
  const {
    currencySymbol,
    costPrice,
    errors,
    priceOverride,
    loading,
    onChange
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(["price_override", "cost_price"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({ id: 'pricing',
          defaultMessage: "Pricing",
          description: "product pricing, section header"
        })}
      />
      <CardContent>
        <div className={classes.grid}>
          <div>
            <PriceField
              error={!!formErrors.price_override}
              name="priceOverride"
              label={intl.formatMessage({ id: 'selling_price',
                defaultMessage: "Selling price override"
              })}
              hint={
                getProductErrorMessage(formErrors.price_override, intl) ||
                intl.formatMessage({
                  defaultMessage: "Optional",
                  description: "optional field",
                  id: "productVariantPriceOptionalPriceOverrideField"
                })
              }
              value={priceOverride}
              currencySymbol={currencySymbol}
              onChange={onChange}
              disabled={loading}
            />
          </div>
          <div>
            <PriceField
              error={!!formErrors.cost_price}
              name="costPrice"
              label={intl.formatMessage({ id: 'cost_price',
                defaultMessage: "Cost price override"
              })}
              hint={
                getProductErrorMessage(formErrors.cost_price, intl) ||
                intl.formatMessage({
                  defaultMessage: "Optional",
                  description: "optional field",
                  id: "productVariantPriceOptionalCostPriceField"
                })
              }
              value={costPrice}
              currencySymbol={currencySymbol}
              onChange={onChange}
              disabled={loading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
ProductVariantPrice.displayName = "ProductVariantPrice";
export default ProductVariantPrice;
