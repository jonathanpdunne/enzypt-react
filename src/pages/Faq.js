import React from 'react'
import styled from 'react-emotion'

import { AbsoluteMain } from './Sell'
import { CanvasShapes, EnzyptHeader, ContactForm } from '../components'
import { BuiltByFlex } from '../elements'

const Faq = props => (
  <AbsoluteMain height="100vh" padding="1rem">
    <CanvasShapes />
    <EnzyptHeader />
    <Section>
      <Heading>FAQ</Heading>

      <SectionHeading>General Questions</SectionHeading>

      <Container>
        <Question>
          What is <Italic>enzypt.io?</Italic>
        </Question>
        <Answer>
          A web3-enabled website to buy and sell files through Ethereum and
          IPFS.
        </Answer>
      </Container>

      <Container>
        <Question>
          How much of the file price goes to <Italic>enzypt</Italic>?
        </Question>
        <Answer>
          None. The payment goes straight from the seller to the buyer.{' '}
          <Italic>enzypt</Italic> currently provides this service for free.
        </Answer>
      </Container>

      <Container>
        <Question>
          Are my files safe on <Italic>enzypt</Italic>?
        </Question>
        <Answer>
          <Italic>enzypt</Italic> does not store your files. The files and the
          metadata (price, seller) are stored on the{' '}
          <Link href="https://ipfs.io/" target="_blank" rel="noreferrer">
            Interplanetary File System (IPFS).
          </Link>{' '}
          However, <Italic>enzypt</Italic> encrypts your files before uploading
          them, so no one can access the files without purchasing them.
        </Answer>
      </Container>

      <Container>
        <Question>Can I offer a file for free?</Question>
        <Answer>
          Sure. The buyers still have to pay for{' '}
          <Link
            href="https://kb.myetherwallet.com/gas/what-is-gas-ethereum.html"
            target="_blank"
            rel="noreferrer"
          >
            gas
          </Link>, though.
        </Answer>
      </Container>

      <Container>
        <Question>
          Who built <Italic>enzypt.io?</Italic>
        </Question>
        <Answer>
          {' '}
          <Link href="https://flexdapps.com" target="_blank" rel="noreferrer">
            Flex Dapps.
          </Link>
        </Answer>
      </Container>

      <SectionHeading>Questions on Selling</SectionHeading>

      <Container>
        <Question>Where does my file go on upload?</Question>
        <Answer>
          The files and the metadata (price, seller) are stored on the{' '}
          <Link href="https://ipfs.io/" target="_blank" rel="noreferrer">
            Interplanetary File System (IPFS).
          </Link>{' '}
          <Italic>Enzypt</Italic> does not reveal the file's IPFS address.
        </Answer>
      </Container>

      <Container>
        <Question>Why can I only upload files up to 100MB?</Question>
        <Answer>
          This is a current limitation of encrypting files in the browser.
          Depending on the computer used, it will crash the browser with files
          that are too large, so we decided to limit it to 100MB to be safe.
        </Answer>
      </Container>

      <Container>
        <Question>
          I uploaded a file, but now I changed my mind. How do I remove it?
        </Question>
        <Answer>
          You can't. Files sold through enzypt are stored on IPFS and
          distributed among many nodes of the network as soon as anyone requests
          it. If the file is never requested and "pinned", it will eventually
          drop out of IPFS, but the details of that are determined by the
          network itself and enzypt has no influence on them.
        </Answer>
      </Container>

      <SectionHeading>Questions on Buying</SectionHeading>

      <Container>
        <Question>How do I buy a file?</Question>
        <Answer>
          To be able to use <Italic>enzypt</Italic>, you need a web3-enabled
          browser. For desktop browsers, we recommend{' '}
          <Link href="https://metamask.io/" target="_blank" rel="noreferrer">
            MetaMask
          </Link>. We don't currently support mobile devices as they don't
          support in browser downloads.
        </Answer>
      </Container>

      <Container>
        <Question>
          I bought a file, but I never received it. What do I do?
        </Question>
        <Answer>
          If the Ethereum transaction was successful, just revisit the purchase
          link and sign a message to prove ownership of the purchasing Ethereum
          address and your files will be available for download. If the
          transaction was not sent, simply start over.
        </Answer>
      </Container>

      <Container>
        <Question>
          Why are you hiding the Ethereum address of the seller?
        </Question>
        <Answer>
          We don't keep it secret, we want to discourage users from completing
          the payment manually and possibly forgetting the payload signifying
          the payment for a specific file. This payload is used to make sure you
          actually paid for the file you are requesting.
        </Answer>
      </Container>

      <Container>
        <Question>
          I paid for a file, but the transaction takes forever to mine/confirm.
          What do I do?
        </Question>
        <Answer>
          If you want to accelerate the process, re-submit the transaction with
          a higher gas price if your browser allows you to do that. Otherwise,
          re-visit the purchase link once the transaction is mined and once you
          sign a message to prove ownership of the purchasing Ethereum address
          your files will be available to download.
        </Answer>
      </Container>

      <Container>
        <Question>How often can I download the file I bought?</Question>
        <Answer>
          Unless the purchased file is 'pinned' on IPFS, it can drop out of the
          network at any time. Other than that, you can always come back and
          "restore" your purchase as long as you remember the purchasing link.
          You only have to sign a message to prove the ownership of the
          purchasing Ethereum address.
        </Answer>
      </Container>

      <SectionHeading>Get In Touch</SectionHeading>
      <ContactForm />
    </Section>
    <BuiltByFlex />
  </AbsoluteMain>
)

export default Faq

const Section = styled('section')`
  width: 100%;
  padding: 0 25%;
  max-height: 90vh;
  overflow: scroll;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 1024px) {
    width: 80%;
    padding: 0;
  }
  @media (max-width: 812px) {
    width: 100%;
    padding: 0;
  }
`

const Heading = styled('h1')`
  font-weight: 700;
  font-size: 2.33rem;
  width: 25%;
  text-align: center;
  margin: 2rem auto;
  color: ${({ theme }) => theme.colors.c1};
`

const SectionHeading = styled('h2')`
  margin: 1rem 0;
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1.66rem;
  font-weight: 400;
`

const Container = styled('div')`
  margin: 2rem 0;
`

const Question = styled('h3')`
  font-size: 1.33rem;
  margin: 0.5rem 0;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.c4};
`

const Answer = styled('p')`
  font-weight: 300;
`

const Link = styled('a')`
  color: ${({ theme }) => theme.colors.c2};
`

const Italic = styled('span')`
  font-style: italic;
`
