import React, { PureComponent } from 'react'
import styled from 'react-emotion'

import { Section } from '../base-components'
import { GradientBorderDiv } from '../elements'
import FolderZipped from '../assets/icons/FolderZipped'
import { shortenEthAddress } from '../utilities/utilities'

//====== COMPONENT ======\\

class FileShowCard extends PureComponent {
  calculateInUserCurrency = (price, userEthConversionRate) => {
    const amount = Number(price) * userEthConversionRate

    return amount.toString().length > 1 ? amount.toFixed(2) : amount
  }

  render() {
    const {
      name,
      price,
      sellerEthAddress,
      downloads,
      size,
      height,
      width,
      maxWidth,
      mobileShowCard,
      userEthConversionRate,
      userCurrency
    } = this.props

    const convertedPrice = userEthConversionRate
      ? `${this.calculateInUserCurrency(
          price,
          userEthConversionRate
        )} ${userCurrency}`
      : ''
    return (
      <ShowCard
        column
        height={height}
        width={width}
        maxWidth={maxWidth}
        margin="0.5rem"
        mobileShowCard={mobileShowCard}
        flipped="true"
      >
        <Section>
          <FolderZipped />
        </Section>
        <H1 inactive={name === 'Filename.zip'}>{name}</H1>
        <Span>{size}</Span>
        {downloads > 0 ? (
          <Span>
            {downloads} download{downloads > 1 ? 's' : null}
          </Span>
        ) : null}
        <H1
          color="c4"
          inactive={price === '0' || (price && Number(price) === 0) || !price}
        >
          {price === '0' || (price && Number(price) === 0) || !price
            ? 'FREE'
            : `${price} ETH `}
          {convertedPrice && `| ${convertedPrice}`}
        </H1>
        {price !== '0' ? (
          <P color="c3">{`Payable to: ${shortenEthAddress(
            sellerEthAddress
          )}`}</P>
        ) : null}
      </ShowCard>
    )
  }
}

export default FileShowCard

//====== STYLED ======\\

const ShowCard = styled(GradientBorderDiv)`
  transition: opacity 250ms ease-in;
  justify-content: center;
  align-items: initial;
  @media (max-width: 1024px) {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    height: 80vh;
    width: 100%;
    z-index: ${({ mobileShowCard }) => (mobileShowCard ? 1 : -1)};
    opacity: ${({ mobileShowCard }) => (mobileShowCard ? 1 : 0)};
  }
`

const H1 = styled('h1')`
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.white};
  opacity: ${({ inactive }) => (inactive ? '0.3' : '1')};
  width: 100%;
  font-weight: 400;
  font-size: 1.66rem;
  text-align: center;
  margin: 0.5rem auto;
`

const P = styled('p')`
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.white};
  opacity: ${({ inactive }) => (inactive ? '0.3' : '1')};
  width: 90%;
  text-align: center;
  margin: 0.5rem auto;
`

const Span = styled('h2')`
  color: ${({ theme }) => theme.colors.gray};
  margin: 0.5rem auto;
`
