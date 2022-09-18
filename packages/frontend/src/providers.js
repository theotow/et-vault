import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  chain,
} from 'wagmi'
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from '@rainbow-me/rainbowkit'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'ET-Vault',
  chains,
})

// Set up client
const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const font = "'Nunito Sans', sans-serif"

const theme = createTheme({
  typography: {
    fontFamily: font,
  },
  palette: {
    primary: {
      main: '#B2B5B2',
    },
    secondary: {
      main: '#ffffff',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  shadows: ['none'],
})

const walletTheme = lightTheme({
  accentColor: '#B2B5B2',
  accentColorForeground: 'white',
  borderRadius: 'none',
  fontStack: 'system',
  overlayBlur: 'none',
  connectButtonBackground: 'transparent',
})
walletTheme.shadows.connectButton = 'none'
walletTheme.fonts.body = font

export function Providers(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WagmiConfig client={client}>
        <RainbowKitProvider
          coolMode
          modalSize="compact"
          chains={chains}
          theme={walletTheme}
        >
          {props.children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ThemeProvider>
  )
}
