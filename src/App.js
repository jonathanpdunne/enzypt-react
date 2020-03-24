import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import currencyManager from 'country-tz-currency'

import Sell from './pages/Sell'
import Buy from './pages/Buy'
import Faq from './pages/Faq'

class App extends Component {
  componentDidMount = () => {
    axios.get('https://ipinfo.io').then(res => {
      const country = res.data.country
      let currency
      try {
        currency = currencyManager.getCurrencyByCountryCode(country).code
      } catch (error) {
        currency = 'USD'
      }

      axios
        .get(
          `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=${currency}`
        )
        .then(res => {
          this.props.setUserEthConversionRate(res.data[currency])
          this.props.setUserCurrency(currency)
        })
    })
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Sell} />
          <Route exact path="/faq" component={Faq} />
          <Route path="/:productId/:decryptionKey" component={Buy} />
        </Switch>
      </Router>
    )
  }
}

export default App
