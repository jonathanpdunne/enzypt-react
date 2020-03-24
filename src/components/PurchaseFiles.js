import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import throttle from 'lodash.throttle'

import { Div } from '../base-components'
import { Spinner, Button } from '../elements'

//====== COMPONENT ======\\

class PurchaseFiles extends PureComponent {
  componentDidUpdate = prevProps => {
    if (!prevProps.zipFileHash && this.props.zipFileHash) {
      this.props.nextSlide()
    }
  }

  handleClick = () => {
    this.props.purchaseFile()
    const throttledNext = throttle(this.props.nextSlide, 150)
    throttledNext()
  }

  render() {
    const { loading, name, price, zipFileHash } = this.props
    return (
      <React.Fragment>
        {loading ? (
          <Div column>
            <Spinner />
            <Message>Waiting for message to be signed</Message>
          </Div>
        ) : (
          <Button
            onClick={this.handleClick}
            style={zipFileHash ? { display: 'none' } : null}
          >
            Purchase <Span>{name}.zip</Span> for <Span>{price} ETH</Span>
          </Button>
        )}
      </React.Fragment>
    )
  }
}

export default PurchaseFiles

//====== STYLED ======\\

const Span = styled('span')`
  font-weight: 400;
  color: ${({ theme }) => theme.colors.c2};
`

const Message = styled('h2')`
  color: ${({ theme }) => theme.colors.white};
`
