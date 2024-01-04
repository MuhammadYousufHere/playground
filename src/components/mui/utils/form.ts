/* eslint-disable security/detect-object-injection */
import { FormikValues, type FormikErrors } from 'formik'
import { FieldOptions, ImageDimension } from '@/@types'

/**
 * Scrolls to the first form field with an error in the given order.
 *
 * @param {FormikErrors<unknown>} errors - Formik errors object.
 * @param {boolean} isSubmitting - Formik isSubmitting state, true if the form is currently being submitted.
 * @param {FieldOptions[]} fields - An array of FieldOptions objects.
 * Each FieldOptions object should have an 'error' property, which is the error message for that field.
 * An 'element' property, which is the actual HTML element for that field's input element.
 */

export const scrollToError = (errors: FormikErrors<unknown>, isSubmitting: boolean, fields: FieldOptions[]) => {
  if (isSubmitting && Object.keys(errors).length) {
    const errorField = fields.find(field => field.error && field.element)

    errorField?.element?.scrollIntoView({
      block: 'center',
      behavior: 'smooth'
    })
  }
}

/**
 * Returns an object containing the updated values by comparing the original values with the new values.
 * If a value has been updated, the key-value pair will be included in the returned object.
 *
 * @param {FormikValues} originalValues - The original form values.
 * @param {FormikValues} newValues - The new form values.
 * @returns {Partial<FormikValues>} An object containing only the updated values.
 */
export const getUpdatedValues = (originalValues: FormikValues, newValues: FormikValues) => {
  const updatedValues: Partial<FormikValues> = {}

  Object.keys(originalValues).forEach(key => {
    if (JSON.stringify(originalValues[key]) !== JSON.stringify(newValues[key])) {
      updatedValues[key] = newValues[key]
    }
  })

  return updatedValues as any // eslint-disable-line
}

/**
 * Gets the dimensions of an image.
 * @param {File} file - The image file.
 * @returns {Promise<ImageDimension>} A promise that resolves to the dimensions of the image.
 * The promise is rejected if the image fails to load.
 */
export const getDimensions = (file: File): Promise<ImageDimension> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ height: img.height, width: img.width })
      URL.revokeObjectURL(img.src)
    }
    img.onerror = () => reject('Failed to load image')
    img.src = URL.createObjectURL(file)
  })
}

/**
 * Checks if the aspect ratio of an image is 1:1.
 * @param {File | null} value - The image file, or null if no file is provided.
 * @returns {boolean} True if the image is square and false otherwise.
 */
export const isAspectRatioOneToOne = async (value: File | null) => {
  if (!value) return false

  const { width, height } = await getDimensions(value)

  return width === height
}
