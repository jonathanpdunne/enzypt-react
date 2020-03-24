import styled from 'react-emotion'
import { Div } from '../base-components'

const GradientBorderDiv = styled(Div)`
  border-radius: 6px;
  box-shadow: 3px 3px 0 0 black;
  border: 2px solid transparent;
  background-image: ${({ theme, flipped }) =>
    flipped
      ? `linear-gradient(${theme.colors.black}, ${theme.colors.black}),
    linear-gradient(270deg, ${theme.colors.c3}, ${theme.colors.c2} 42%, ${
          theme.colors.c1
        })`
      : `linear-gradient(${theme.colors.black}, ${theme.colors.black}),
    linear-gradient(270deg, ${theme.colors.c1}, ${theme.colors.c2} 42%, ${
          theme.colors.c3
        })`};
  background-origin: border-box;
  background-clip: content-box, border-box;
`

export default GradientBorderDiv
