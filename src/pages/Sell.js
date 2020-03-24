import React, { Component } from 'react'
import styled from 'react-emotion'
import MdInfoOutline from 'react-icons/lib/md/info-outline'
import MdClose from 'react-icons/lib/md/close'
import throttle from 'lodash.throttle'

import { Main, Div } from '../base-components'

import {
  FileDragDrop,
  Info,
  Carousel,
  UploadForm,
  Uploading,
  FileShowCard,
  UploadSuccess,
  EnzyptHeader,
  CanvasShapes
} from '../components'

import { Button, BuiltByFlex, FaqIcon } from '../elements'

import { Consumer } from '../stores/AppState'

import Web3 from 'web3'
const web3 = new Web3(
  Web3.givenProvider || 'https://mainnet.infura.io/T1YIsUqqHW568dijGClq'
)

// ========= INDEX ========= \\

class Sell extends Component {
  state = {
    showInfo: true,
    mobile: false,
    innerHeight: window.innerHeight
  }

  toggleInfo = () => {
    this.setState(({ showInfo }) => ({ showInfo: !showInfo }))
  }

  handleResize = () => {
    this.setState({ innerHeight: window.innerHeight })
  }

  componentDidMount = () => {
    window.addEventListener('resize', throttle(this.handleResize, 150))
    if (window.innerWidth < 450) {
      this.setState({ mobile: true })
    }
  }

  render() {
    let { showInfo, innerHeight, mobile } = this.state
    const { toggleInfo } = this

    return (
      <React.Fragment>
        <CanvasShapes />
        <AbsoluteMain height={`${innerHeight}px`} padding="1rem">
          <Consumer>
            {({
              files,
              metadata,
              carouselActiveIndex,
              addMetadata,
              mobileShowCard,
              toggleMobileShowCard,
              userInputEthAddress
            }) => (
              <React.Fragment>
                <EnzyptHeader />

                {carouselActiveIndex === 1 && window.innerWidth < 1024 ? (
                  <PreviewButton
                    buttonColor="c2"
                    show={true}
                    onClick={toggleMobileShowCard}
                  >
                    {mobileShowCard ? 'HIDE' : 'PREVIEW'}
                  </PreviewButton>
                ) : null}
                {showInfo ? (
                  <CloseButton onClick={toggleInfo} />
                ) : (
                  <InfoButton onClick={toggleInfo} />
                )}
                <AppContainer
                  height="90%"
                  overflow="visible"
                  noWrap
                  maxWidth="800px"
                  maxHeight="700px"
                >
                  <App
                    addMetadata={addMetadata}
                    userInputEthAddress={userInputEthAddress}
                  />
                  <FilePreview />
                </AppContainer>
                <FaqIcon />
                <Info
                  visible={showInfo}
                  sell
                  hide={toggleInfo}
                  mobile={mobile}
                />
                <BuiltByFlex />
              </React.Fragment>
            )}
          </Consumer>
        </AbsoluteMain>
      </React.Fragment>
    )
  }
}

export default Sell

//===== COMPONENTS =====\\

class App extends Component {
  componentDidMount = () => {
    this.getMetamaskAccount()
  }

  getMetamaskAccount = async () => {
    if (this.props.userInputEthAddress) return
    let accounts
    if (window.ethereum) {
      accounts = await window.ethereum.enable()
    }
    if (window.web3 && web3.currentProvider) {
      accounts = await web3.eth.getAccounts()
    }
    if (accounts[0]) {
      this.props.addMetadata({ sellerEthAddress: accounts[0] })
      return
    }
    window.setTimeout(this.getMetamaskAccount, 100)
  }

  render() {
    return (
      <Consumer>
        {({
          updateCarouselIndex,
          addFiles,
          removeFile,
          addMetadata,
          files,
          metadata,
          userInput,
          userInputEthAddress
        }) => (
          <React.Fragment>
            <Carousel
              height="100%"
              width="45%"
              currentIndex={updateCarouselIndex}
            >
              <Carousel.Slide>
                <FileDragDrop
                  multiple
                  addFiles={addFiles}
                  removeFile={removeFile}
                  addMetadata={addMetadata}
                  files={files}
                />
              </Carousel.Slide>
              <Carousel.Slide>
                <UploadForm
                  addMetadata={addMetadata}
                  metadata={metadata}
                  userInput={userInput}
                  userInputEthAddress={userInputEthAddress}
                />
              </Carousel.Slide>
              <Carousel.Slide>
                <Uploading
                  files={files}
                  metadata={metadata}
                  addMetadata={addMetadata}
                />
              </Carousel.Slide>
              <Carousel.Slide>
                <UploadSuccess metadata={metadata} />
              </Carousel.Slide>
            </Carousel>
          </React.Fragment>
        )}
      </Consumer>
    )
  }
}

const FilePreview = () => {
  return (
    <Consumer>
      {({ metadata, mobileShowCard, userEthConversionRate, userCurrency }) => {
        const { name, price, totalFileSize, sellerEthAddress } = metadata

        return (
          <FileShowCard
            name={`${name}.zip`}
            price={price}
            size={totalFileSize}
            userEthConversionRate={userEthConversionRate}
            userCurrency={userCurrency}
            sellerEthAddress={sellerEthAddress}
            height="100%"
            width="45%"
            mobileShowCard={mobileShowCard}
          />
        )
      }}
    </Consumer>
  )
}

export const AbsoluteMain = styled(Main)`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  @media (max-width: 1024px) {
    min-height: 568px;
  }
`

const InfoButton = styled(MdInfoOutline)`
  color: ${({ theme }) => theme.colors.c1};
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
`
const CloseButton = InfoButton.withComponent(MdClose)

const PreviewButton = styled(Button)`
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 500ms ease-in-out;
  transition-delay: 750ms;
  position: fixed;
  top: 0.15rem;
  padding: 0.25rem 0.5rem;
`

const AppContainer = styled(Div)`
  top: 1rem;
`
