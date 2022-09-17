import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
} from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  backgroundColor: '#888888',
}))

export function Header() {
  return (
    <AppBar component="nav" sx={{ boxShadow: 'none' }}>
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => {}}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          Icon
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          MUI
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button sx={{ color: '#fff' }}>Connect Wallet</Button>
        </Box>
      </ToolbarStyled>
    </AppBar>
  )
}
