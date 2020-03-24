import React from 'react'
import styled from 'react-emotion'
import FaHeart from 'react-icons/lib/fa/heart'

import Flex from '../assets/icons/flex-logo.svg'
import { trippy } from '../styles/animations'

const BuiltByFlex = props => {
  return (
    <Container>
      Made with
      <span>
        <Love />
      </span>
      by
      <A href="https://flexdapps.com" target="_blank" rel="noopener noreferrer">
        <LogoContainer>
          <img src={Flex} alt="Flex Dapps Logo" />
        </LogoContainer>
        <FlexText>Flex Dapps</FlexText>
      </A>
    </Container>
  )
}

export default BuiltByFlex

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0.5rem;
  left: 0.5rem;
  color: white;
  @media (max-width: 1024px) {
    left: initial;
  }
`

const Love = styled(FaHeart)`
  margin: 0 0.25rem;
  color: hotpink;
`

const LogoContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.25rem;
  width: 1.25rem;
  img {
    max-width: 100%;
    height: auto;
  }
`

const FlexText = styled('span')`
  font-family: ${({ theme }) => theme.fonts.secondary};
  animation: ${trippy} 10s infinite alternate;
`

const A = styled('a')`
  display: flex;
  align-items: center;
  justify-content: center;
`
