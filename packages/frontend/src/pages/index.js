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
        <Typography variant="h1" gutterBottom>
          Landing Page
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => openConnectModal()}
        >
          Get started
        </Button>
      </Paper>
    </Layout>
  )
}

function Write() {
  const { config } = usePrepareContractWrite({
    addressOrName: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    contractInterface: ['function approve(address, uint256)'],
    functionName: 'approve',
    args: ['0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 1],
  })
  const { write, error } = useContractWrite(config)
  console.log(error)
  return (
    <button disabled={!write} onClick={() => write?.(1, 2)}>
      Write
    </button>
  )
}
