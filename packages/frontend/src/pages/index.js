import * as React from 'react'
import { Layout } from '../components/layout'
import { Paper, Typography, Button } from '@mui/material'
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'

export default function MainPage() {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  const router = useRouter()

  React.useEffect(() => {
    if (isConnected) {
      router.replace('/setup')
    }
  }, [isConnected, router])

  return (
    <Layout>
      <Paper elevation={0} sx={{ border: '2px solid #B2B5B2', padding: 2 }}>
        <Typography sx={{ textAlign: 'center' }} variant="h1" gutterBottom>
          Landing Page
        </Typography>
        <Button
          variant="contained"
          size="large"
          disabled={isConnected}
          onClick={() => openConnectModal()}
        >
          Get started
        </Button>
      </Paper>
    </Layout>
  )
}
