import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

import { Div } from '../base-components'

import logo from '../assets/icons/cloud.svg'

//====== ELEMENT ======\\

const Logo = props => {
  const { onClick } = props
  return (
    <LogoContainer onClick={onClick ? onClick : () => {}}>
      <Link to="/">
        <ImgContainer>
          <Img src={logo} />
        </ImgContainer>
      </Link>
    </LogoContainer>
  )
}

export default Logo

//====== STYLED ======\\

const LogoContainer = styled(Div)`
  width: auto;
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 1;
`

const Img = styled('img')`
  width: 2.75rem;
`

const ImgContainer = styled('div')`
  border-radius: 50%;
  border: 2px solid transparent;
  padding: 0.5rem;
  transition: border 250ms ease-in-out;
  &:hover {
    border-color: ${({ theme }) => theme.colors.white};
  }
`
