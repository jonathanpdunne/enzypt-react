import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import throttle from 'lodash.throttle'

import { Div } from '../base-components'
import { Spinner, Button } from '../elements'

//====== COMPONENT ======\\

class DownloadFile extends PureComponent {
  handleClick = () => {
    this.props.downloadFile()
    const throttledNext = throttle(this.props.nextSlide, 150)
    throttledNext()
  }

  render() {
    const { loading, previousPurchase, free } = this.props
    return (
      <React.Fragment>
        <Div column>
          {loading ? (
            <React.Fragment>
              <Spinner />
              <Message>
                Waiting for transaction to be submitted and confirmed, please
                keep this window open...
              </Message>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Message>
                {free
                  ? 'This file is free!'
                  : previousPurchase
                    ? 'Your purchase has been successfully recovered!'
                    : 'Purchase confirmed!'}
              </Message>
              <Button onClick={this.handleClick}>Decrypt & Download</Button>
            </React.Fragment>
          )}
        </Div>
      </React.Fragment>
    )
  }
}

export default DownloadFile

//====== STYLED ======\\

const Message = styled('h2')`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  padding: 1rem;
`
