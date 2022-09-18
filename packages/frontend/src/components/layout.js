import * as React from 'react'
import { Box, Container, Typography } from '@mui/material'
import { Header } from '../components/header'

export function Layout(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Container maxWidth="md" sx={{ marginTop: 10 }}>
        {props.children}
        <div>
          <Typography
            component={'a'}
            href="https://github.com/theotow/et-vault"
            target={'_blank'}
            textAlign="center"
            variant="overline"
            display="block"
            gutterBottom
          >
            Github
          </Typography>
        </div>
      </Container>
    </Box>
  )
}
