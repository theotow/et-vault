import { useState } from 'react'
import { Layout } from '../components/layout'
import { Paper, Alert, Typography, Button, Stack } from '@mui/material'
import { useContractWrite } from 'wagmi'
import { LoadingButton } from '@mui/lab'
import { FRONTEND_CONTRACT } from '../constants'
import FrontendAbi from '../abi/contracts/Frontend.sol/Frontend.json'

export default function Main(props) {
  return (
    <Layout>
      <Paper elevation={0} sx={{ border: '2px solid #B2B5B2', padding: 2 }}>
        <Typography variant="h2" gutterBottom>
          Congratulations!
        </Typography>
        <Typography variant="h3" gutterBottom>
          You have successfully set up your vault!
        </Typography>
        <IamAlive />
      </Paper>
    </Layout>
  )
}

function IamAlive() {
  const [error, setError] = useState()
  const executeWrite = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: FRONTEND_CONTRACT,
    contractInterface: FrontendAbi,
    functionName: 'iamAlive',
    args: [],
    onSettled: (_, error) => {
      if (!error) {
        window.location.reload()
      }
    },
    onError: (e) => setError(e.message),
  })

  return (
    <>
      <LoadingButton
        loading={executeWrite.isLoading}
        loadingPosition="start"
        disabled={!executeWrite.write}
        variant="contained"
        size="medium"
        onClick={() => executeWrite.write()}
      >
        I Am Alive
      </LoadingButton>
      {error && (
        <Alert sx={{ mt: 1 }} severity="error">
          {error}
        </Alert>
      )}
    </>
  )
}
