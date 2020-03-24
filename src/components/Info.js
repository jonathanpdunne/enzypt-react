import React from 'react'
import styled from 'react-emotion'

import { Aside } from '../base-components'
import { Button } from '../elements'

//====== COMPONENT ======\\

const Info = props => {
  const { sell, visible, hide, mobile } = props
  return (
    <Wrapper visible={visible} column noWrap align="flex-start">
      <Heading>
        Welcome to <Emphasis>enzypt.</Emphasis>
      </Heading>
      {sell ? (
        <List>
          <ListItem>
            <Emoji role="img" aria-label="Paper">
              📄
            </Emoji>{' '}
            No registration
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Flying cash">
              💸
            </Emoji>It's free
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Weight lifter">
              🏋
            </Emoji>Sell up to 100MB of files at a time
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Chains">
              🔗
            </Emoji>Peer to peer payments
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="100">
              💯
            </Emoji>Keep 100% of your sales
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Question mark">
              ❓
            </Emoji>Completely anonymous
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Shaka">
              🤙
            </Emoji>Easily share your files with a unique purchase link
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Padlock and key">
              🔐
            </Emoji>End to end encryption
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Satellite">
              🛰{' '}
            </Emoji>Decentralized storage
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem>
            <Emoji role="img" aria-label="Paper">
              📄
            </Emoji>No registration
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Question mark">
              ❓
            </Emoji>Completely anonymous
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Flying cash">
              💸
            </Emoji>It's free
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Chains">
              🔗
            </Emoji>Peer to peer payments
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="100">
              💯
            </Emoji>100% of your payment goes to the seller
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Timer">
              ⌛
            </Emoji>Instantly download your files after payment
          </ListItem>
          <ListItem>
            <Emoji role="img" aria-label="Padlock and key">
              🔐
            </Emoji>End to end encryption
          </ListItem>
        </List>
      )}

      <P>
        Check out how it works
        <Link
          href="https://enzypt.io/pgAURDzqsifWBaQsie3s00hdihRD9d5B/ooE3eYpc6cgsfyHFIBCMRnpF1MFx0w9ersoH1CtnT3U"
          target="_blank"
        >
          by purchasing this demo file.
        </Link>
      </P>
      {mobile ? <CloseButton onClick={hide}>Sell my files</CloseButton> : null}
    </Wrapper>
  )
}

export default Info

//====== STYLED ======\\

const Wrapper = styled(Aside)`
  width: ${({ visible }) => (visible ? '39%' : '0')};
  opacity: ${({ visible }) => (visible ? '1' : '0')};
  transition: ${({ visible }) =>
    `width 150ms ease-in-out ${
      visible ? '0ms' : '120ms'
    }, opacity 150ms ease-in-out ${visible ? '120ms' : '0ms'}`};
  height: 80vh;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 1350px) {
    position: absolute;
    right: 0;
    height: 100vh;
    padding: 1rem;
    z-index: ${({ visible }) => (visible ? 0 : -1)};
    background: ${({ theme }) => theme.colors.black};
  }
  @media (max-width: 812px) {
    width: 100%;
  }
`

const Heading = styled('h1')`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.c3};
  margin: 1rem;
`

const Emphasis = styled('span')`
  font-style: italic;
  font-weight: 700;
  font-size: 2.33rem;
  color: ${({ theme }) => theme.colors.c2};
`

const List = styled('ul')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 500px;
  font-size: 1.2rem;
`

const ListItem = styled('li')`
  display: flex;
  margin: 0.5rem 0;
  width: 95%;
`

const Emoji = styled('span')`
  display: block;
  margin-right: 1rem;
`

const P = styled('p')`
  margin: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
`

const CloseButton = styled(Button)`
  width: 100%;
  text-align: center;
`

const Link = styled('a')`
  color: ${({ theme }) => theme.colors.c2};
  padding: 0 0.5rem;
`
