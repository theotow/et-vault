import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import Link from 'next/link'

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  backgroundColor: '#888888',
}))

export function Header() {
  const { isConnected } = useAccount()
  const { openConnectModal } = useConnectModal()
  return (
    <AppBar component="nav" sx={{ boxShadow: 'none' }}>
      <ToolbarStyled>
        <Link href="/">
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: 'block',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            ET-VAULT
          </Typography>
        </Link>
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
