import { useAccount } from 'wagmi'
import { Typography, Box } from '@mui/material'

export function AuthGuard(props) {
  const { isConnected } = useAccount()

  if (isConnected) {
    return props.children
  } else {
    return (
      <>
        <Box justifyContent={'center'} sx={{ mt: 4, display: 'flex' }}>
          <Typography variant="body1" gutterBottom>
            Please connect your wallet to view page
          </Typography>
        </Box>
      </>
    )
  }
}
