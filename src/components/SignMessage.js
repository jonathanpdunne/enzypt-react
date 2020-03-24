import React, { PureComponent } from 'react'
import styled from 'react-emotion'

import { Div } from '../base-components'
import { Button } from '../elements'

//====== COMPONENT ======\\

class SignMessage extends PureComponent {
  componentDidUpdate = prevProps => {
    if (!prevProps.skip && this.props.skip) {
      this.props.nextSlide()
    }
  }

  handleClick = () => {
    const { signMessage, nextSlide } = this.props
    signMessage()
    nextSlide()
  }

  render() {
    return (
      <Div column border="c1" radius="true" height="100%">
        <Message>
          To purchase this file we need to verify your account by sending you a
          message to sign with your public key. If you have already purchased
          this file, this will verify your previous transaction.
        </Message>
        <Button onClick={() => this.handleClick()}>SIGN MESSAGE</Button>
      </Div>
    )
  }
}

export default SignMessage

//====== STYLED ======\\

const Message = styled('p')`
  padding: 2rem;
  color: ${({ theme }) => theme.colors.white};
`
