import * as React from 'react'
import { Layout } from '../components/layout'
import { Paper, TextField, Typography, Button, Stack } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import {
  useConnect,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi'

export default function Main(props) {
  return (
    <Layout>
      <Paper elevation={0} sx={{ border: '2px solid #B2B5B2', padding: 2 }}>
        <Typography variant="h1" gutterBottom>
          Vault Setup
        </Typography>
        <Typography variant="h2" gutterBottom>
          h2. Heading
        </Typography>
        <Typography variant="h3" gutterBottom>
          h3. Heading
        </Typography>
        <Typography variant="h4" gutterBottom>
          h4. Heading
        </Typography>
        <Typography variant="h5" gutterBottom>
          h5. Heading
        </Typography>
        <Typography variant="h6" gutterBottom>
          h6. Heading
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="body2" gutterBottom>
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography variant="button" display="block" gutterBottom>
          button text
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          caption text
        </Typography>
        <Typography variant="overline" display="block" gutterBottom>
          overline text
        </Typography>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          sx={{ width: '100%' }}
        />
        {/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}
        <Stack direction="column" spacing={2}>
          <Button variant="contained">Outlined</Button>
          <Button variant="outlined">Primary</Button>
          <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
        </Stack>
        <Write />
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
