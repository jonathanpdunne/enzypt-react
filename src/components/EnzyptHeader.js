import React from 'react'
import styled from 'react-emotion'

import { Header } from '../base-components'
import { Logo } from '../elements'

//====== COMPONENT ======\\

const EnzyptHeader = () => {
  return (
    <FixedHeader position>
      <Logo
        onClick={() => {
          window.location.pathname === '/' ? window.location.reload() : null
        }}
      />
    </FixedHeader>
  )
}

export default EnzyptHeader

const FixedHeader = styled(Header)`
  position: fixed;
  top: 1rem;
  left: 1rem;
  width: auto;
`
