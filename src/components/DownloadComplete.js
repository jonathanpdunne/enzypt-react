import React from 'react'
import styled from 'react-emotion'

//====== COMPONENT ======\\

const DownloadComplete = props => {
  return <Message>DOWNLOAD COMPLETE.</Message>
}

export default DownloadComplete

//====== STYLED ======\\

const Message = styled('h2')`
  color: ${({ theme }) => theme.colors.white};
`
