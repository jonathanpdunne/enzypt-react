import React from 'react'
import styled from 'react-emotion'

import { Div } from '../base-components'
import MetamaskFox from '../assets/icons/MetamaskFox'

//====== COMPONENT ======\\

const MetamaskPopup = props => {
  const { installMetamask, wrongNetwork } = props
  return (
    <Popup show={installMetamask || wrongNetwork}>
      <Container column radius="true">
        <FoxContainer href="https://metamask.io/">
          <MetamaskFox />
        </FoxContainer>
        {wrongNetwork ? <ChangeNetwork /> : <InstallMetamask />}
      </Container>
    </Popup>
  )
}

export default MetamaskPopup

const InstallMetamask = () => (
  <React.Fragment>
    <P>
      Purchasing files on enzypt.io requires a web3 enabled browser. Sign in to
      your account or create one. We recommend:
    </P>
    <Link target="_blank" href="https://metamask.io/" color="c3">
      Metamask
    </Link>
    <Link target="_blank" href="https://trustwalletapp.com/" color="c3">
      Trust Wallet
    </Link>
    <Link target="_blank" href="https://www.toshi.org/" color="c3">
      Toshi Browser (mobile)
    </Link>
  </React.Fragment>
)

const ChangeNetwork = () => (
  <P>
    You need to be on the Ethereum mainnet to purchase files on enzypt. Click
    the dropdown in the top left corner of your metamask extension and switch to
    mainnet.
  </P>
)

//====== STYLED ======\\

const Popup = styled(Div)`
  position: absolute;
  background: ${({ theme }) => theme.colors.transparent};
  z-index: ${({ show }) => (show ? `2` : '-1')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transition: opacity 750ms ease-in-out;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`

const Container = styled(Div)`
  width: 66%;
  background: white;
  padding: 2rem;
  @media (max-width: 1024px) {
    width: 100%;
  }
`

const FoxContainer = styled('a')`
  width: 30%;
`

const Link = styled('a')`
  color: ${({ theme, color }) => theme.colors[color]};
  margin: 0.5rem;
`

const P = styled('p')`
  width: 66%;
  @media (max-width: 1024px) {
    width: 75%;
    text-align: center;
  }
`
