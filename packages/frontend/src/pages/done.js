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
          Congratulations!
        </Typography>
        <Typography variant="h3" gutterBottom>
          You have successfully set up your vault!
        </Typography>
      </Paper>
    </Layout>
  )
}
