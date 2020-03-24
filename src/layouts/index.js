import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'emotion-theming'

import AppState from '../stores/AppState'

import theme from '../styles/theme'

import './reset.css'
import './globals.css'

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        {
          name: 'description',
          content:
            'Sell encrypted files using the Ethereum blockchain and Ipfs',
        },
        {
          name: 'keywords',
          content: 'ipfs, ethereum, metamask, decentralized, storage, encrypt',
        },
      ]}
      link={[
        {
          href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Sans',
          rel: 'stylesheet',
        },
        {
          href: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono',
          rel: 'stylesheet',
        },
      ]}
    />
    <AppState>
      <ThemeProvider theme={theme}>{children()}</ThemeProvider>
    </AppState>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
