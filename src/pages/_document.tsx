// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Head, Html, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="shortcut icon"
            href="https://www.youtube.com/s/desktop/a386e432/img/favicon.ico"
            type="image/x-icon"
          />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
        </Head>
        <body>
        <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}