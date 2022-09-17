import * as React from 'react'
import { Box, Container } from '@mui/material'
import { Header } from '../components/header'

export function Layout(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Container maxWidth="md" sx={{ marginTop: 10 }}>
        {props.children}
      </Container>
    </Box>
  )
}
