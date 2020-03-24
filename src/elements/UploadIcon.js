import React from 'react'
import styled from 'react-emotion'

import MdVerticalAlignBottom from 'react-icons/lib/md/vertical-align-bottom'

//====== STYLED ======\\

const Div = styled('div')`
  padding: 1rem;
  opacity: ${({ showFiles }) => (showFiles ? '0' : '1')};
  transition: opacity 500ms ease-in-out;
`

//====== ELEMENT ======\\

const UploadIcon = props => (
  <Div {...props}>
    <MdVerticalAlignBottom size={props.size || 30} />
  </Div>
)

export default UploadIcon
