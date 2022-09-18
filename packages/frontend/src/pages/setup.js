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

export default function SetupPage() {
  return (
    <Layout>
      <Paper elevation={0} sx={{ border: '2px solid #B2B5B2', padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          Vault Setup
        </Typography>
        <VerticalLinearStepper />
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
    label: 'Create an ad',
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
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.component()}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
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
      We are very concerned about the safety of your funds. Thats why we use
      gnosis-safe to store your funds in a battle tested vault. Follow this{' '}
      <Link href="https://gnosis-safe.io/app/welcome" target={'_blank'}>
        Link
      </Link>{' '}
      to create your vault with the easy 4 steps process on the gnosis website.
      Make sure to yourself and your inheritors as owners of the vault, and keep
      the <b>requires the confirmation of</b> as 1 out of X owner(s)
    </Typography>
  )
}

function SetupGuard() {
  return <Typography>Address Guard: {GUARD_CONTRACT}</Typography>
}
