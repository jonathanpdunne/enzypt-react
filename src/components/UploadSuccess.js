import React, { Component } from 'react'
import styled from 'react-emotion'

import { Div } from '../base-components'
import { GradientBorderDiv, Spinner } from '../elements'
import MdContentCopy from 'react-icons/lib/md/content-copy'

//====== COMPONENT ======\\

class UploadSuccess extends Component {
  state = {
    showTooltip: false,
  }

  handleClick = () => {
    this.copyEmailToClipboard()
    this.toggleTooltip()

    setTimeout(this.toggleTooltip, 3000)
  }

  toggleTooltip = () => {
    this.setState(({ showTooltip }) => ({ showTooltip: !showTooltip }))
  }

  copyEmailToClipboard = () => {
    const { uniqueUrl, decryptionKey } = this.props.metadata
    const { k: key } = decryptionKey

    const el = document.createElement('input')
    el.value = `https://enzypt.io/${uniqueUrl}/${key}`
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  render() {
    const { showTooltip } = this.state
    const { uniqueUrl, decryptionKey } = this.props.metadata

    return (
      <GradientBorderDiv column height="100%">
        <Div padding="3rem">
          {!uniqueUrl ? (
            <React.Fragment>
              <Spinner />
              <H2>Generating unique purchase link...</H2>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Done>Done!</Done>
              <H2>Here is your unique purchase link:</H2>
              <PurchaseLink>
                {`https://enzypt.io/${uniqueUrl}/${decryptionKey.k}`}
                <CopyToClipboard onClick={this.handleClick} />
              </PurchaseLink>
              <Span show={showTooltip}>Copied to clipboard!</Span>
            </React.Fragment>
          )}
        </Div>
      </GradientBorderDiv>
    )
  }
}

export default UploadSuccess

//====== STYLED ======\\

const Done = styled('h1')`
  font-size: ${({ theme }) => theme.text.h3};
  color: ${({ theme }) => theme.colors.c1};
  margin: 1rem;
`

const PurchaseLink = styled('p')`
  position: relative;
  width: 100%;
  padding: 2rem;
  margin: 1rem;
  border: ${({ theme }) => `2px solid ${theme.colors.c3}`};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.c2};
`

const CopyToClipboard = styled(MdContentCopy)`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  font-size: ${({ theme }) => theme.text.h3};
  &:hover {
    cursor: pointer;
  }
`

const Span = styled('span')`
  width: ${({ show }) => (show ? '15rem' : '0')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  color: ${({ theme }) => theme.colors.c1};
  transition: width 200ms ease-in-out 200ms, opacity 250ms ease-in-out;
  overflow: hidden;
  height: 2rem;
  padding: 0.5rem 0;
  text-align: center;
`

const H2 = styled('h2')`
  color: ${({ theme }) => theme.colors.white};
`
