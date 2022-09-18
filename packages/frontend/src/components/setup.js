import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { FRONTEND_CONTRACT } from '../constants'
import { TextField, Button, Box, Stack, Alert } from '@mui/material'
import { Add } from '@mui/icons-material'
import FrontendAbi from '../abi/contracts/Frontend.sol/Frontend.json'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import produce from 'immer'
import { useRouter } from 'next/router'

const getDummy = () => ({ address: '', percent: 100 })

export function Setup() {
  const router = useRouter()
  const [error, setError] = useState()
  const [gnosisAddress, setAddress] = useState('')
  const [pingTime, setPingTime] = useState(0)
  const [inheritors, setInheritor] = useState([getDummy()])
  const args = [
    inheritors.map((item) => [item.address, item.percent, 0]),
    Number(pingTime) * 60 * 60 * 24,
    gnosisAddress,
  ]
  console.log(args)
  const executeWrite = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: FRONTEND_CONTRACT,
    contractInterface: FrontendAbi,
    functionName: 'setup',
    args,
    onError: (e) => setError(e.message),
  })
  const fieldChange = (index) => (field, type) => (e) => {
    setInheritor(
      produce((draft) => {
        draft[index][field] =
          type == 'int' ? Number(e.target.value) : e.target.value
      }),
    )
  }
  const waitForTx = useWaitForTransaction({
    hash: executeWrite.data?.hash,
    onSettled: (_, error) => {
      if (!error) {
        router.push('/vault', { query: { id: gnosisAddress } })
      } else {
        setError(error.message)
      }
    },
    onError: (e) => setError(e.message),
  })
  const isLoading = waitForTx.isLoading || executeWrite.isLoading
  return (
    <div>
      <TextField
        id="filled-basic"
        label="gnosis-safe eth-address"
        variant="filled"
        onBlur={(e) => setAddress(e.target.value)}
        sx={{ width: '100%' }}
      />
      <Box sx={{ marginTop: 2 }} />
      {inheritors.map((data, index) => (
        <>
          <Inheritor key={index} data={data} fieldChange={fieldChange(index)} />
          <Box sx={{ marginTop: 2 }} />
        </>
      ))}
      <Box sx={{ marginTop: 2 }} />
      <Button
        variant="contained"
        size="medium"
        endIcon={<Add />}
        onClick={() => setInheritor((state) => [...state, getDummy()])}
      >
        Add inheritor
      </Button>
      <Box sx={{ marginTop: 2 }} />
      <TextField
        id="filled-basic"
        type={'number'}
        min={1}
        max={100}
        onBlur={(e) => setPingTime(e.target.value)}
        label="days until unlock if no sign of life"
        variant="filled"
        sx={{ width: '100%' }}
      />
      <Box sx={{ marginTop: 3 }} />
      <LoadingButton
        loading={isLoading}
        loadingPosition="center"
        disabled={!executeWrite.write}
        variant="contained"
        size="medium"
        onClick={() => executeWrite.write()}
      >
        Submit
      </LoadingButton>
      {error && (
        <Alert sx={{ mt: 1, mb: 1 }} severity="error">
          {error}
        </Alert>
      )}
    </div>
  )
}

function Inheritor(props) {
  return (
    <>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          id="filled-basic"
          label="inheritor eth-address"
          variant="filled"
          onBlur={props.fieldChange('address')}
          sx={{ width: '100%' }}
        />
        <TextField
          id="filled-basic"
          type={'number'}
          min={1}
          max={100}
          onBlur={props.fieldChange('percent', 'int')}
          label="accessible percentage"
          variant="filled"
          sx={{ width: '100%' }}
        />
      </Stack>
    </>
  )
}
