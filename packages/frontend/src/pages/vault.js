import { useState } from 'react'
import { Layout } from '../components/layout'
import {
  Paper,
  Alert,
  Typography,
  Divider,
  Chip,
  Button,
  Box,
  Stack,
  Tooltip,
  List,
  ListItem,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FRONTEND_CONTRACT } from '../constants'
import FrontendAbi from '../abi/contracts/Frontend.sol/Frontend.json'
import { AuthGuard } from '../guard/auth'
import {
  useContractRead,
  useAccount,
  useWaitForTransaction,
  useContractWrite,
} from 'wagmi'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Vault() {
  const { address } = useAccount()
  const router = useRouter()
  const query1 = useContractRead({
    addressOrName: FRONTEND_CONTRACT,
    contractInterface: FrontendAbi,
    functionName: 'vaultAddressToOwnerAddress',
    args: [router.query.id],
  })
  const query2 = useContractRead({
    addressOrName: FRONTEND_CONTRACT,
    contractInterface: FrontendAbi,
    functionName: 'ownerToTestemonies',
    args: [query1.data],
  })
  const query3 = useContractRead({
    addressOrName: FRONTEND_CONTRACT,
    contractInterface: FrontendAbi,
    functionName: 'getter',
    args: [query1.data],
  })
  const inheritors = query3.data || []
  const days = (query2.data?.reportTime?.toNumber() || 0) / (60 * 60 * 24)
  const isOwner = query2.data?.owner === address && !!address
  return (
    <Layout>
      <Paper elevation={0} sx={{ border: '2px solid #B2B5B2', padding: 2 }}>
        <AuthGuard>
          {isOwner && (
            <OwnerFlow data={query2.data} days={days} inheritors={inheritors} />
          )}
          {!isOwner && <InheritorFlow />}
        </AuthGuard>
      </Paper>
    </Layout>
  )
}

function InheritorFlow() {
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: 'center' }} gutterBottom>
        Claim Inheritance
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center' }} gutterBottom>
        Someone you love left this world. He/She left you something behind. Go
        to the vault to claim it.
      </Typography>
      <Box justifyContent={'center'} sx={{ mt: 4, display: 'flex' }}>
        <GoVault />
      </Box>
    </>
  )
}

function OwnerFlow(props) {
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: 'center' }} gutterBottom>
        Vault details
      </Typography>
      <Divider sx={{ mt: 4 }}>
        <Chip sx={{ borderRadius: 0 }} label="Settings" />
      </Divider>
      {props.data && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Owner of the vault: {props.data.owner}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <Tooltip title="The last time you reported yourself as alive with the Button below">
              <span>
                Last life signal:{' '}
                {new Date(
                  props.data.lastAlive.toNumber() * 1000,
                ).toLocaleDateString()}{' '}
                {new Date(
                  props.data.lastAlive.toNumber() * 1000,
                ).toLocaleTimeString()}
              </span>
            </Tooltip>
          </Typography>

          <Typography variant="body1" gutterBottom>
            <Tooltip title="After how many days your funds will be unlocked if you dont report yourself as alive">
              <span>Report-time: {props.days} days</span>
            </Tooltip>
          </Typography>
          <InheritorsList inheritors={props.inheritors} />
        </Box>
      )}
      <Divider>
        <Chip sx={{ borderRadius: 0 }} label="Actions" />
      </Divider>
      <Actions />
      <Divider>
        <Chip sx={{ borderRadius: 0 }} label="Next Steps" />
      </Divider>
      <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
        1. Bookmark this url so that your inheritors and you can find it.
      </Typography>
      <Typography variant="body1">
        2. Mark yourself alive at least every {props.days} days, otherwise the
        vault will be unlocked.
      </Typography>
    </>
  )
}

function InheritorsList(props) {
  return (
    <>
      <Typography variant="body1" gutterBottom>
        <span>Inheritors:</span>
      </Typography>
      <List>
        {props.inheritors.map((item) => (
          <ListItem key={item[0]}>
            Address: {item[0]} / Share: {item[1].toNumber()}%
          </ListItem>
        ))}
      </List>
    </>
  )
}

function GoVault() {
  const router = useRouter()
  return (
    <Link
      href={'https://gnosis-safe.io/app/gor:' + router.query.id}
      target={'_blank'}
    >
      <Button variant="contained" size="large">
        Go to gnosis vault
      </Button>
    </Link>
  )
}

function Actions() {
  const [error, setError] = useState()
  const executeWrite = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: FRONTEND_CONTRACT,
    contractInterface: FrontendAbi,
    functionName: 'iamAlive',
    args: [],
    onError: (e) => setError(e.message),
  })
  const waitForTx = useWaitForTransaction({
    hash: executeWrite.data?.hash,
    onError: (e) => setError(e.message),
  })

  return (
    <>
      <Box sx={{ mb: 4, mt: 4 }}>
        <Stack direction="row" spacing={2}>
          <LoadingButton
            loading={executeWrite.isLoading || waitForTx.isLoading}
            loadingPosition="center"
            disabled={!executeWrite.write}
            variant="contained"
            size="large"
            sx={{ mr: 1, ml: 1 }}
            onClick={() => executeWrite.write()}
          >
            Mark me as alive
          </LoadingButton>
          <GoVault />
        </Stack>
      </Box>
      {error && (
        <Alert sx={{ mt: 1 }} severity="error">
          {error}
        </Alert>
      )}
    </>
  )
}
