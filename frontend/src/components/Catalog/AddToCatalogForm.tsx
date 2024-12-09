import { ItemType } from '../../types'
// Style
import Container from '../Container'
import Button from '../Button'
import { Header, Subtitle, Text, Title } from '../Text'
// Form and input validation
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import itemsService from '../../services/materialsService'

const types = ['Consumable', 'Material']

const categories = [
  'Asset',
  'Ceiling',
  'Consumable',
  'Door Hardware',
  'Electrical',
  'Equipment',
  'Hardware',
  'HVAC',
  'Interstitial',
  'Protocol',
  'Safety',
  'Strut',
  'Tool',
  'Wall',
]

const units = ['Each', 'Linear ft', 'Pair', 'Square ft']

const validationSchema = Yup.object().shape({
  type: Yup.string().required('Type is required'),
  category: Yup.string().when('type', {
    is: (type: string) => type === types[0],
    then: (schema) => schema.required('Category is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  sku: Yup.string().when('type', {
    is: (type: string) => type === types[0],
    then: (schema) =>
      schema
        .matches(
          /^[A-Za-z]{2}-[A-Za-z]{3}-[A-Za-z0-9]{4}$/,
          'SKU must follow the format XX-XXX-XXXX (2 letters, 3 letters, 4 alphanumeric characters)'
        )
        .required('SKU is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  name: Yup.string().required('Name is required'),
  unitOfMeasure: Yup.string().required('Unit of Measure is required'),
})

const AddToCatalogForm = () => {
  const handleSubmit = async (values: ItemType) => {
    const item: ItemType = {
      id: '',
      type: values.type,
      category: values.category,
      sku: values.sku,
      name: values.name,
      unitOfMeasure: values.unitOfMeasure,
    }
    await itemsService.create(item)
  }

  return (
    <Container>
      <div className="flex flex-col space-y-2">
        <Title text="Add to Catalog" />
        <Subtitle text="Insert a new item type into the catalog" />
      </div>

      <Formik
        initialValues={{
          id: '',
          type: '',
          category: '',
          sku: '',
          name: '',
          unitOfMeasure: '',
          totalStock: 0,
          availableStock: 0,
          shelfStock: 0,
          overStock: 0,
          shelfStockLocation: '',
          overStockLocation: '',
        }}
        validateOnMount
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, isSubmitting, isValid }) => (
          <Form>
            <div className="flex flex-col space-y-8 mt-4">
              <div className="flex flex-col space-y-2">
                <Header text="Item Details" />
                <div className="grid grid-cols-[1fr_2fr] items-center gap-y-2 gap-x-4">
                  {/* Item type */}
                  <Text className="md:text-nowrap" text="Type" />
                  <Field
                    as="select"
                    name="type"
                    className={`border-b-2 ${
                      errors.type && touched.type
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } p-2 ${values.type ? 'text-black' : 'text-gray-400'}`}
                  >
                    <option value="">Select a type</option>
                    {types.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="type"
                    component="div"
                    className="text-red-500 col-span-2"
                  />

                  {/* Item Category */}

                  <Text className="md:text-nowrap" text="Category" />
                  <>
                    <Field
                      as="select"
                      name="category"
                      className={`border-b-2 border-gray-300 p-2 ${
                        values.category ? 'text-black' : 'text-gray-400'
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 col-span-2"
                    />
                  </>

                  {/* Item SKU Number */}
                  <Text className="md:text-nowrap" text="SKU Number" />
                  <>
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
                  </>

                  {/* Item Name */}
                  <Text className="md:text-nowrap" text="Item Name" />
                  <>
                    <Field
                      name="name"
                      placeholder="Name"
                      className={`border-b-2 border-gray-300 p-2 ${
                        values.name ? 'text-black' : 'text-gray-400'
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 col-span-2"
                    />
                  </>

                  {/* Unit of Measure */}
                  <Text className="md:text-nowrap" text="Unit of Measure" />

                  <>
                    <Field
                      as="select"
                      name="unitOfMeasure"
                      className={`border-b-2 border-gray-300 p-2 ${
                        values.unitOfMeasure ? 'text-black' : 'text-gray-400'
                      }`}
                    >
                      <option value="">Select a unit</option>
                      {units.map((unit, index) => (
                        <option key={index} value={unit}>
                          {unit}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="unit"
                      component="div"
                      className="text-red-500"
                      col-span-2
                    />
                  </>
                </div>
              </div>

              <Button
                type="submit"
                text="Add"
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

export default AddToCatalogForm
