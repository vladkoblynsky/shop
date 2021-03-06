import { WindowTitle } from "@temp/components/WindowTitle";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import React from "react";
import { useIntl } from "react-intl";

import PageDetailsPage from "../components/PageDetailsPage";
import { TypedPageCreate } from "../mutations";
import { PageCreate as PageCreateData } from "../types/PageCreate";
import { pageListUrl, pageUrl } from "../urls";

export interface PageCreateProps {
  id: string;
}

export const PageCreate: React.FC<PageCreateProps> = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handlePageCreate = (data: PageCreateData) => {
    if (data.pageCreate.errors.length === 0) {
      notify({
        text: intl.formatMessage({
          id: "successfully_created_page",
          defaultMessage: "Successfully created new page"
        })
      });
      navigate(pageUrl(data.pageCreate.page.id));
    }
  };

  return (
    <TypedPageCreate onCompleted={handlePageCreate}>
      {(pageCreate, pageCreateOpts) => (
        <>
          <WindowTitle
            title={intl.formatMessage({
              id: "create_page",
              defaultMessage: "Create Page",
              description: "header"
            })}
          />
          <PageDetailsPage
            disabled={pageCreateOpts.loading}
            errors={pageCreateOpts.data?.pageCreate.errors || []}
            saveButtonBarState={pageCreateOpts.status}
            page={null}
            onBack={() => navigate(pageListUrl())}
            onRemove={() => undefined}
            onSubmit={formData =>
              pageCreate({
                variables: {
                  input: {
                    content: formData.content,
                    isPublished: formData.isPublished,
                    publicationDate: formData.isPublished
                      ? null
                      : formData.publicationDate === ""
                      ? null
                      : formData.publicationDate,
                    slug: formData.slug === "" ? null : formData.slug,
                    title: formData.title
                  }
                }
              })
            }
          />
        </>
      )}
    </TypedPageCreate>
  );
};
PageCreate.displayName = "PageCreate";
export default PageCreate;
