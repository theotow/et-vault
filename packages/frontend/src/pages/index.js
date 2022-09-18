import * as React from 'react'
import { Layout } from '../components/layout'
import { Paper, Typography, Button, Box } from '@mui/material'
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
        <Typography sx={{ textAlign: 'center' }} variant="h2" gutterBottom>
          Secure your legacy for the who you love & care.
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{ maxWidth: 450, margin: '0 auto', mt: 4 }}
        >
          Crypto funds stored in Blockchain Wallets might be frozen for eternity
          when the owner dies. As any other assets they should be passed on to
          the respective heirs as defined in the last will. ETVault allows
          owners of crypto assets stored in a Gnosis Safe to make their will on
          the blockchain and make sure that all inheritors get their share as
          defined.
        </Typography>
        <Box justifyContent={'center'} sx={{ mt: 4, display: 'flex' }}>
          <Button
            variant="contained"
            size="large"
            disabled={isConnected}
            onClick={() => openConnectModal()}
          >
            Get started
          </Button>
        </Box>
      </Paper>
    </Layout>
  )
}
