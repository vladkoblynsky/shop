import { IFilter } from "@temp/components/Filter";
import { FilterOpts, MinMax } from "@temp/types";
import { createDateField, createTextField } from "@temp/utils/filters/fields";
import { defineMessages, IntlShape } from "react-intl";

export enum OrderDraftFilterKeys {
  created = "created",
  customer = "customer"
}

export interface OrderDraftListFilterOpts {
  created: FilterOpts<MinMax>;
  customer: FilterOpts<string>;
}

const messages = defineMessages({
  created: {
    id: "created",
    defaultMessage: "Created",
    description: "draft order"
  },
  customer: {
    id: "customer",
    defaultMessage: "Customer",
    description: "draft order"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: OrderDraftListFilterOpts
): IFilter<OrderDraftFilterKeys> {
  return [
    {
      ...createDateField(
        OrderDraftFilterKeys.created,
        intl.formatMessage(messages.created),
        opts.created.value
      ),
      active: opts.created.active
    },
    {
      ...createTextField(
        OrderDraftFilterKeys.customer,
        intl.formatMessage(messages.customer),
        opts.customer.value
      ),
      active: opts.customer.active
    }
  ];
}
