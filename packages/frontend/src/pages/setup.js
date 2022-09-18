import * as React from 'react'
import { Layout } from '../components/layout'
import {
  Paper,
  Stepper,
  Typography,
  StepLabel,
  Step,
  StepContent,
  Box,
  Button,
  Link,
} from '@mui/material'
import { Setup } from '../components/setup'
import { GUARD_CONTRACT } from '../constants'
import { AuthGuard } from '../guard/auth'

export default function SetupPage() {
  return (
    <Layout>
      <Paper elevation={0} sx={{ border: '2px solid #B2B5B2', padding: 2 }}>
        <Typography sx={{ textAlign: 'center' }} variant="h2" gutterBottom>
          Vault Setup
        </Typography>
        <Typography
          variant="body1"
          sx={{ mb: 4, maxWidth: 650, ml: 'auto', mr: 'auto' }}
        >
          Getting things in order is always a bit of work, so is the process to
          setup your inheritance distribution. We utilize the gnosis-vault to
          keep your assets secure. By installing a guard in the vault we can
          control that your assets are only passed on to your inheritors after
          your passing.
        </Typography>
        <AuthGuard>
          <VerticalLinearStepper />
        </AuthGuard>
      </Paper>
    </Layout>
  )
}

const steps = [
  {
    label: 'Setup gnosis vault',
    component: () => <SetupGnosis />,
  },
  {
    label: 'Install gnosis guard',
    component: () => <SetupGuard />,
  },
  {
    label: 'Create vault and inheritors',
    component: () => <Setup />,
  },
]

function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.component()}
              <Box sx={{ mb: 2 }}>
                <div>
                  {index === steps.length - 1 ? null : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Continue
                    </Button>
                  )}
                  {index != 0 && (
                    <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                      Back
                    </Button>
                  )}
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  )
}

function SetupGnosis() {
  return (
    <Typography>
      Follow this{' '}
      <Link href="https://gnosis-safe.io/app/welcome" target={'_blank'}>
        link
      </Link>{' '}
      to create your vault with the easy 4 step process on the gnosis website.
      Make sure to yourself and your inheritors as owners of the vault, and keep
      the <b>requires the confirmation of</b> as 1 out of X owner(s)
    </Typography>
  )
}

function SetupGuard() {
  return (
    <Typography>
      Please follow following{' '}
      <Link
        href="https://help.gnosis-safe.io/en/articles/5496893-add-a-transaction-guard"
        target={'_blank'}
      >
        tutorial
      </Link>{' '}
      to install the guard. The address of the guard contract is:{' '}
      <b>{GUARD_CONTRACT}</b>
    </Typography>
  )
}
