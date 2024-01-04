import { ReactNode, useEffect, useState } from 'react'
import { Form, Formik, type FormikValues, type FormikConfig } from 'formik'
import * as Yup from 'yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { Stack } from '@mui/material'
import { HorizontalLine } from '@/components/elements'
import { FacebookCircularProgress } from '@/components/Loader'
import { Button } from '@/components'

export interface FormRoute {
  readonly element: JSX.Element | ReactNode
  readonly validationSchema?: Yup.AnySchema

  /** The route title for the progress stepper */
  readonly progressStepTitle?: string
}
export interface WizardProps {
  steps?: string[]
  success: boolean
  isLoading: boolean
  routes: ReadonlyArray<FormRoute>
}
type Combined = FormikConfig<FormikValues> & WizardProps
export default function FormFlatWizard({ isLoading, success, routes, ...formikProps }: Combined) {
  const [step, setStep] = useState(0)
  const currentChild = routes[step]
  const currentValidationSchema = currentChild.validationSchema

  function isLastStep() {
    return step === routes.length - 1
  }
  useEffect(() => {
    if (success) {
      setStep(0)
    }
  }, [success])
  return (
    <Formik
      {...formikProps}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          helpers.setTouched({})
          await formikProps.onSubmit(values, helpers)
        } else {
          setStep(s => s + 1)
          helpers.setTouched({}, false)
        }
      }}
      validationSchema={currentValidationSchema}
    >
      {({ isSubmitting }) => (
        <Form
          autoComplete="off"
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: '1rem'
          }}
        >
          {/* <Stepper alternativeLabel activeStep={step} sx={{ width: '100%', mt: 1 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel sx={{ fontFamily: 'Poppins' }}> {label}</StepLabel>
              </Step>
            ))}
          </Stepper> */}
          <Stack
            sx={{
              overflowY: 'auto',
              flex: 1,
              '&::-webkit-scrollbar': {
                width: '0.6em',
                height: '0.6em'
              },
              '&::-webkit-scrollbar-track': {
                background: '#eaecee'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c7cfd9',
                borderRadius: '10px'
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#8f99a6'
              }
            }}
          >
            {currentChild.element}
          </Stack>

          <HorizontalLine mt={1} />

          <Stack
            sx={{
              alignItems: 'center',
              columnGap: 2.5,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              justifySelf: 'flex-end',
              pl: 2,
              pt: 1.5
            }}
          >
            {step > 0 && (
              <Button
                variant="outlined"
                width="compact"
                as="border"
                sx={{
                  minWidth: '110px',
                  fontWeight: 400
                }}
                onClick={() => setStep(s => s - 1)}
              >
                <ArrowBackIcon sx={{ fontSize: '0.95rem', mr: 0.7 }} /> Back
              </Button>
            )}
            <Button
              as="common"
              width="compact"
              type="submit"
              sx={{
                textAlign: 'center',
                background: 'linear-gradient(101.63deg,#28a1c0 8.53%,#16489c 107.27%)',
                transition: 'opacity',
                minWidth: '110px',
                fontWeight: 400,
                '&:hover': {
                  opacity: '.9',
                  transition: 'opacity .4s'
                }
              }}
            >
              {isSubmitting || isLoading ? <FacebookCircularProgress /> : isLastStep() ? 'Submit' : 'Next'}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  )
}
