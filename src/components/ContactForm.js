import React from 'react'
import styled from 'react-emotion'

import { Button } from '../elements'

const ContactForm = props => (
  <Form action="https://formspree.io/hello@flexdapps.com" method="POST">
    <Input type="text" name="name" placeholder="NAME" />
    <Input type="email" name="_replyto" placeholder="EMAIL" />
    <TextArea name="enquiry" placeholder="ENQUIRY" />
    <input type="hidden" name="_format" value="plain" />
    <input type="hidden" name="_subject" value="enzypt.io enquiry" />
    <input type="hidden" name="_next" value="https://enzypt.io" />
    <Button>SUBMIT</Button>
  </Form>
)
export default ContactForm

const Form = styled('form')`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.c1};
  border-radius: 4px;
  padding: 2rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  width: 100%;
`

const Input = styled('input')`
  width: 100%;
  padding: 0.5em 0;
  margin: 0.5rem 0;
  border: none;
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.text.t1};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.c1}`};
  outline: none;
  &:focus {
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.c3}`};
    box-shadow: none;
  }
  &:invalid {
    box-shadow: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.c1};
  }
`

const TextArea = styled('textarea')`
  padding: 0.5em 0;
  margin: 0.5rem 0;
  resize: none;
  border: none;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.text.t1};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.c1}`};
  background: transparent;
  width: 100%;
  height: 10rem;
  &:focus {
    outline: none;
    border-bottom: ${({ theme }) => `1px solid ${theme.colors.c3}`};
  }
  &::placeholder {
    color: ${({ theme }) => theme.colors.c1};
  }
`
