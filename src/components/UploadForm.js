import React, { Component } from 'react'
import styled from 'react-emotion'
import throttle from 'lodash.throttle'

import { Forms } from '../components'
import { Button } from '../elements'

//====== STYLED ======\\

class UploadForm extends Component {
  state = {
    initialEthAddress: this.props.metadata.sellerEthAddress
  }

  render() {
    const { addMetadata, nextSlide, metadata, userInput } = this.props
    const { name, price, sellerEthAddress } = metadata
    const { initialEthAddress } = this.state

    return (
      <React.Fragment>
        <Forms
          height="100%"
          border
          nextSlide={throttle(nextSlide, 150)}
          addMetadata={addMetadata}
          userInput={userInput}
          preFilledValue={
            sellerEthAddress !== initialEthAddress ? sellerEthAddress : ''
          }
          {...this.props}
        >
          <Forms.Input
            name="name"
            label="Name"
            placeholder={name}
            maxLength="20"
            required
          />
          <Forms.Input
            name="price"
            label="Price"
            placeholder={price}
            type="number"
            postLabel="ETH"
            onInput={e => {
              if (e.target.value.length > 6)
                e.target.value = e.target.value.slice(0, 6)
            }}
          />
          <Forms.Input
            name="sellerEthAddress"
            label="ETH Address"
            hidden={price === '0' || (price && Number(price) === 0) || !price}
            placeholder={
              sellerEthAddress === initialEthAddress ? sellerEthAddress : ''
            }
            maxLength="42"
            type="eth"
            required
          />
          <Forms.Button label="ENCRYPT & UPLOAD" />
          <BackButton onClick={throttle(this.props.previousSlide, 150)}>
            BACK
          </BackButton>
        </Forms>
      </React.Fragment>
    )
  }
}

export default UploadForm

//====== STYLED ======\\

const BackButton = styled(Button)`
  position: absolute;
  bottom: 0;
  left: 0;
  border-color: ${({ theme }) => theme.colors.error};
  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
  }
`
