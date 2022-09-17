import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { Providers } from '../providers'
import NonSSRWrapper from '../components/no-ssr'

function MyApp({ Component, pageProps }) {
  return (
    <NonSSRWrapper>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </NonSSRWrapper>
  )
}

export default MyApp
