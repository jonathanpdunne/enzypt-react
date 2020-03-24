import styled from 'react-emotion'
import FaSpinner from 'react-icons/lib/fa/spinner'
import { spin } from '../styles/animations'

const Spinner = styled(FaSpinner)`
  animation: ${spin} 2s infinite linear;
  color: ${({ theme }) => theme.colors.c1};
  font-size: 4rem;
  margin: 1rem;
`

export default Spinner
