import 'video.js/dist/video-js.css'
import { PropsProvider } from '../hooks/PropsContext'
import { ChakraProvider } from '@chakra-ui/react'

import {theme} from '../styles/theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <PropsProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </PropsProvider>
  )
}

export default MyApp