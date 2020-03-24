import React, { Component } from 'react'

const Context = React.createContext()

const { Provider, Consumer } = Context

class AppState extends Component {
  state = {
    files: [],
    metadata: {
      name: 'Filename',
      price: '0',
      totalFileSize: '0 MB',
      sellerEthAddress: '0x0000000000000000000000000000000000000000'
    },
    carouselActiveIndex: 0,
    mobileShowCard: false,
    userInputEthAddress: false,
    userEthConversionRate: null,
    userCurrency: ''
  }

  addFiles = (newFiles, callback) => {
    this.setState(
      ({ files }) => ({ files: [...files, ...newFiles] }),
      () => callback(this.state.files)
    )
  }

  removeFile = (fileName, callback) => {
    this.setState(
      ({ files }) => ({
        files: files.filter(file => file.name !== fileName)
      }),
      () => callback(this.state.files)
    )
  }

  addMetadata = data =>
    this.setState(({ metadata }) => ({
      metadata: Object.assign({}, metadata, data)
    }))

  updateCarouselIndex = index => this.setState({ carouselActiveIndex: index })

  toggleMobileShowCard = () =>
    this.setState(({ mobileShowCard }) => ({ mobileShowCard: !mobileShowCard }))

  userInput = () => this.setState({ userInputEthAddress: true })

  setUserEthConversionRate = rate =>
    this.setState({ userEthConversionRate: rate })

  setUserCurrency = currency => this.setState({ userCurrency: currency })

  render() {
    const {
      files,
      metadata,
      carouselActiveIndex,
      mobileShowCard,
      userInputEthAddress,
      userEthConversionRate,
      userCurrency
    } = this.state
    const {
      addFiles,
      removeFile,
      addMetadata,
      updateCarouselIndex,
      toggleMobileShowCard,
      userInput,
      setUserEthConversionRate,
      setUserCurrency
    } = this
    const { children } = this.props

    return (
      <Provider
        value={{
          files,
          metadata,
          carouselActiveIndex,
          addFiles,
          addMetadata,
          updateCarouselIndex,
          removeFile,
          mobileShowCard,
          toggleMobileShowCard,
          userInputEthAddress,
          userInput,
          userEthConversionRate,
          setUserEthConversionRate,
          userCurrency,
          setUserCurrency
        }}
      >
        {children}
      </Provider>
    )
  }
}

export { AppState as default, Consumer }
