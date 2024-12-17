import itemsService from '../../services/materialsService'
// Style
import Container from '../Container'
import Button from '../Button'
import { Header, Subtitle, Text, Title } from '../Text'
// Form and input validation
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  sku: Yup.string()
    .matches(
      /^[A-Za-z]{2}-[A-Za-z]{3}-[A-Za-z0-9]{4}$/,
      'SKU must follow the format XX-XXX-XXXX (2 letters, 3 letters, 4 alphanumeric characters)'
    )
    .required('SKU is required'),
})

const RemoveFromCatalogForm = () => {
  const handleSubmit = async (values: { sku: string }) => {
    if (
      !window.confirm(
        `Are you sure you want to remove ${values.sku} from the catalog?`
      )
    ) {
      return
    }
    await itemsService.remove(values.sku)
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-2">
        <Title text="Remove from Catalog" />
        <Subtitle text="Remove legacy items from the catalog" />
      </div>

      <Formik
        initialValues={{
          sku: '',
        }}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, isSubmitting, isValid }) => (
          <Form>
            <div className="flex flex-col gap-y-8 mt-4">
              <div className="flex flex-col gap-y-2">
                <Header text="Item Details" />
                <div className="grid grid-cols-[1fr_2fr] items-center gap-y-2 gap-x-4">
                  {/* Item SKU Number */}
                  <Text className="md:text-nowrap" text="SKU Number" />
                  <Field
                    name="sku"
                    placeholder="Identifier"
                    className={` ${
                      errors.sku && touched.sku
                        ? 'border-red-500 border-2 rounded'
                        : 'border-gray-300 border-b-2'
                    } p-2 ${values.sku ? 'text-black' : 'text-gray-400'}`}
                  />
                  <ErrorMessage
                    name="sku"
                    component="div"
                    className="text-red-500 col-span-2"
                  />
                </div>
              </div>

              <Button
                type="submit"
                text="Remove"
                onClick={() => null}
                disabled={!isValid || isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default RemoveFromCatalogForm
