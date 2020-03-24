import styled from 'react-emotion'
import { Section } from '../base-components'

const BackgroundBlend = styled(Section)`
  padding: 0 1rem;
  margin: 0.5rem;
  &::after {
    content: '';
    position: absolute;
    background: ${({ theme }) =>
      `linear-gradient(270deg, ${theme.colors.c1}, ${theme.colors.c2}, ${
        theme.colors.c3
      }) no-repeat center`};
    background-size: 100%;
    top: 0;
    left: 0;
    height: 100%;
    transition: width 400ms ease-in-out;
    width: ${({ blend }) => (blend ? '100%' : '0')};
    ${({ blend }) => (blend ? `mix-blend-mode: color` : null)};
  }
`

export default BackgroundBlend
