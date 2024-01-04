import { useState, useEffect, type ReactNode, type Dispatch, type SetStateAction, useCallback } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Formik, Form, type FormikConfig, type FormikValues, type FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { Stack, Step, Stepper, StepLabel } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Dialog } from '../modal/Modal'
import { Border } from '../table'
import { FacebookCircularProgress } from '../Loader'
import { HorizontalLine } from '../elements'
import { Button, Typography } from '..'
import { useWindowSize } from '@/hooks'
export interface FormikStepProps {
  children: ReactNode
}
interface FormRoute {
  readonly element: JSX.Element | ReactNode
  readonly validationSchema?: Yup.AnySchema
  /** Called when the step is submitted */
  readonly onSubmitStep?: (
    values: any, // eslint-disable-line
    // eslint-disable-next-line no-unused-vars
    helpers: FormikHelpers<FormikValues>
  ) => void | Promise<void>
  /** The route title for the progress stepper */
  readonly progressStepTitle?: string
}
interface WizardProps {
  handleClose: Dispatch<SetStateAction<boolean>>
  open: boolean
  steps: string[]
  title: string
  isLoading: boolean
  success: boolean
  routes: ReadonlyArray<FormRoute>
}
type Combined = FormikConfig<FormikValues> & WizardProps
export function FormWizard({
  open,
  handleClose,
  title,
  isLoading,
  success,
  steps = [],
  routes,
  ...formikProps
}: Combined) {
  const { innerHeight: height } = useWindowSize()
  const theme = useTheme()
  const isLight = theme.palette.mode === 'light'

  const [step, setStep] = useState(0)
  const currentChild = routes[step]
  const currentValidationSchema = currentChild.validationSchema

  const onClose = useCallback(
    function () {
      setStep(0)
      handleClose(false)
    },
    [handleClose]
  )
  function isLastStep() {
    return step === routes.length - 1
  }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    setStep(0)
    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose, success])
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: isLight ? '#ffffff' : '#0A0A0A',
          border: '1px solid',
          borderColor: isLight ? '#7a7a7a' : '#2d3748',
          width: { xs: 380, sm: 500, lg: 600 },
          overflow: 'hidden',
          maxHeight: 'calc(100% - 10px)'
        }
      }}
    >
      <Border placement="top" />
      <Typography
        variant="h5"
        id="modal-title"
        sx={{
          textAlign: 'center',
          p: 2,
          colorScheme: 'normal',
          ...(isLight && { color: '#0b214a' }),
          fontFamily: 'Poppins',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
          borderRadius: '0 0 15px 15px'
        }}
      >
        {title}
      </Typography>

      <Formik
        {...formikProps}
        onSubmit={async (values, helpers) => {
          if (isLastStep()) {
            await formikProps.onSubmit(values, helpers)
          } else {
            setStep(s => s + 1)
            helpers.setTouched({})
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
              minHeight: height! > 740 ? '650px' : '575px',
              overflowY: 'auto',
              paddingTop: '1rem'
            }}
          >
            <Stepper alternativeLabel activeStep={step} sx={{ width: '100%', mt: 1 }}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel sx={{ fontFamily: 'Poppins' }}> {label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Stack
              sx={{
                p: 2,
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
            <>
              <HorizontalLine mt={1} />

              <Stack
                sx={{
                  alignItems: 'center',
                  columnGap: 2.5,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  justifySelf: 'flex-end',
                  px: 2,
                  py: 2
                  // maxHeight: '100px',
                  // minWidth: '110px',
                  // fontWeight: 400
                }}
              >
                <Button
                  variant="outlined"
                  width="compact"
                  as="border"
                  sx={{
                    minWidth: '110px',
                    fontWeight: 400
                  }}
                  onClick={step === 0 ? onClose : () => setStep(s => s - 1)}
                >
                  {step > 0 ? (
                    <>
                      <ArrowBackIcon sx={{ fontSize: '0.95rem', mr: 0.7 }} /> Back
                    </>
                  ) : (
                    'Cancel'
                  )}
                </Button>
                <Button
                  as="common"
                  width="compact"
                  type={'submit'}
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
            </>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}
