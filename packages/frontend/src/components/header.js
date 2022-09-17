import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  backgroundColor: '#888888',
}))

export function Header() {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  return (
    <AppBar component="nav" sx={{ boxShadow: 'none' }}>
      <ToolbarStyled>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: 'block' }}
        >
          ET-VAULT
        </Typography>
        <Box sx={{ display: 'block' }}>
          {isConnected ? (
            <ConnectButton />
          ) : (
            <Button sx={{ color: '#fff' }} onClick={() => openConnectModal()}>
              Connect Wallet
            </Button>
          )}
        </Box>
      </ToolbarStyled>
    </AppBar>
  )
}
