import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

export default () => <Icon to="/faq">FAQ</Icon>

const Icon = styled(Link)`
  border: 1px solid ${({ theme }) => theme.colors.c1};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.c1};
  padding: 0.25rem 1rem;
  position: absolute;
  top: 1.15rem;
  right: 4rem;
  z-index: 1;
  transition: background 250ms ease-in-out;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.colors.c1};
    color: ${({ theme }) => theme.colors.black};
  }
`
