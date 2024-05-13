import { Button } from 'antd';
import { Fields } from 'components';
import { Field } from 'formik';
import { useHooks } from 'hooks';
import Container from 'modules/container';

const SendModal = ({ sendModal, setThink, showSendModal, page, setAllData }: any) => {
  const { get, t } = useHooks()

  return (
    <div>
      <Container.Form
        url={`feedbacks/`}
        method="post"
        name="feedbacks"
        fields={[
          {
            name: "name",
            type: "string",
            required: true,
          },
          {
            name: "question",
            type: "string",
            value: get(sendModal, "data"),
            required: true,
          }
        ]}
        onSuccess={(data, resetForm, query) => {
          
          resetForm()
          page > 1 && setAllData((prev:any) => [get(data, "data"),...prev])
          setThink("")
          showSendModal({ open: false, data: {} })
        }}
        onError={(error) => {
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <div>
              <Field
                component={Fields.Input}
                className="mb-3 w-[100%]"
                name="name"
                type="text"
                placeholder={t("fullname")}
                size="large"
              />
              <div className="flex">
                <button className="comment-btn --secondary mr-[12px]" onClick={() => (
                  setThink(""),
                  showSendModal({ open: false, data: {} })
                )} type="button">
                  {t("Bekor qilish")}
                </button>
                <button className="comment-btn --primary" type="submit">
                  {t("Saqlash")}
                </button>
              </div>
            </div>
          );
        }}
      </Container.Form>
    </div>
  )
}

export default SendModal