import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { FormSpacer } from "@temp/components/FormSpacer";
import ListField from "@temp/components/ListField";
import { buttonMessages } from "@temp/intl";
import { UserError } from "@temp/types";
import { getFieldError } from "@temp/utils/errors";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {useFormik} from "formik";

export interface FormData {
  name: string;
  values: Array<{
    label: string;
    value: string;
  }>;
}

export interface ProductTypeAttributeEditDialogProps {
  disabled: boolean;
  errors: UserError[];
  name: string;
  opened: boolean;
  title: string;
  values: Array<{
    label: string;
    value: string;
  }>;
  onClose: () => void;
  onConfirm: (data: FormData) => void;
}

const ProductTypeAttributeEditDialog: React.FC<ProductTypeAttributeEditDialogProps> = ({
  disabled,
  errors,
  name,
  opened,
  title,
  values,
  onClose,
  onConfirm
}) => {
  const intl = useIntl();

  const initialForm: FormData = {
    name: name || "",
    values: values || []
  };
  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
    onSubmit: onConfirm
  })

  return (
    <Dialog onClose={onClose} open={opened}>
      <form onSubmit={form.handleSubmit}>
          <>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <TextField
                disabled={disabled}
                error={!!getFieldError(errors, "name")}
                fullWidth
                label={intl.formatMessage({id: 'attribute_name',
                  defaultMessage: "Attribute name"
                })}
                helperText={getFieldError(errors, "name")?.message}
                name="name"
                value={form.values.name}
                onChange={form.handleChange}
              />
              <FormSpacer />
              <ListField
                autoComplete="off"
                disabled={disabled}
                error={
                  !!getFieldError(errors, "values") ||
                  !!getFieldError(errors, "addValues") ||
                  !!getFieldError(errors, "removeValues")
                }
                fullWidth
                name="values"
                label={intl.formatMessage({
                  defaultMessage: "Attribute values"
                })}
                helperText={
                  getFieldError(errors, "values") ||
                  getFieldError(errors, "addValues") ||
                  getFieldError(errors, "removeValues")
                }
                values={form.values.values}
                onChange={form.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <Button color="primary" variant="contained" type="submit">
                <FormattedMessage {...buttonMessages.confirm} />
              </Button>
            </DialogActions>
          </>
      </form>
    </Dialog>
  );
};
ProductTypeAttributeEditDialog.displayName = "ProductTypeAttributeEditDialog";
export default ProductTypeAttributeEditDialog;
