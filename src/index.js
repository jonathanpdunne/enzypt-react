import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'emotion-theming'
import theme from './styles/theme'
import AppState, { Consumer } from '../src/stores/AppState'
import App from './App'

import './layouts/globals.css'
import './layouts/reset.css'

ReactDOM.render(
  <AppState>
    <ThemeProvider theme={theme}>
    <Consumer>
    {({setUserEthConversionRate, setUserCurrency}) => (
      <App 
        setUserEthConversionRate={setUserEthConversionRate} 
        setUserCurrency={setUserCurrency}
      />      
    )}
    </Consumer>
    </ThemeProvider>
  </AppState>,
  document.getElementById('root')
)
