import { IFilter } from "@temp/components/Filter";
import { commonMessages } from "@temp/intl";
import { orderStatusMessages } from "@temp/misc";
import { FilterOpts, MinMax } from "@temp/types";
import { OrderStatusFilter } from "@temp/types/globalTypes";
import {
    createDateField,
    createOptionsField,
    createTextField
} from "@temp/utils/filters/fields";
import { defineMessages, IntlShape } from "react-intl";

export enum OrderFilterKeys {
    created = "created",
    customer = "customer",
    status = "status"
}

export interface OrderListFilterOpts {
    created: FilterOpts<MinMax>;
    customer: FilterOpts<string>;
    status: FilterOpts<OrderStatusFilter[]>;
}

const messages = defineMessages({
    customer: {
        id: "customer",
        defaultMessage: "Customer",
        description: "order"
    },
    placed: {
        id: "created",
        defaultMessage: "Created",
        description: "order"
    }
});

export function createFilterStructure(
    intl: IntlShape,
    opts: OrderListFilterOpts
): IFilter<OrderFilterKeys> {
    return [
        {
            ...createTextField(
                OrderFilterKeys.customer,
                intl.formatMessage(messages.customer),
                opts.customer.value
            ),
            active: opts.customer.active
        },
        {
            ...createDateField(
                OrderFilterKeys.created,
                intl.formatMessage(messages.placed),
                opts.created.value
            ),
            active: opts.created.active
        },
        {
            ...createOptionsField(
                OrderFilterKeys.status,
                intl.formatMessage(commonMessages.status),
                opts.status.value,
                true,
                [
                    {
                        label: intl.formatMessage(orderStatusMessages.cancelled),
                        value: OrderStatusFilter.CANCELED
                    },
                    {
                        label: intl.formatMessage(orderStatusMessages.fulfilled),
                        value: OrderStatusFilter.FULFILLED
                    },
                    {
                        label: intl.formatMessage(orderStatusMessages.partiallyFulfilled),
                        value: OrderStatusFilter.PARTIALLY_FULFILLED
                    },
                    {
                        label: intl.formatMessage(orderStatusMessages.unfulfilled),
                        value: OrderStatusFilter.UNFULFILLED
                    },
                    {
                        label: intl.formatMessage(orderStatusMessages.readyToCapture),
                        value: OrderStatusFilter.READY_TO_CAPTURE
                    },
                    {
                        label: intl.formatMessage(orderStatusMessages.readyToFulfill),
                        value: OrderStatusFilter.READY_TO_FULFILL
                    }
                ]
            ),
            active: opts.status.active
        }
    ];
}
