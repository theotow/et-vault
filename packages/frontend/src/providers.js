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

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, provider, webSocketProvider } = configureChains(
  [chain.goerli],
  [publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
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
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
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
