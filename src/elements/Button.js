import styled from 'react-emotion'

const Button = styled('button')`
  width: ${({ width = 'auto' }) => width};
  padding: 0.5rem 1rem;
  font-family: ${({ theme }) => theme.fonts.primary};
  margin: ${({ margin }) => margin || '1rem'};
  border: ${({ theme, buttonColor }) =>
    buttonColor
      ? `1px solid ${theme.colors[buttonColor]}`
      : `1px solid ${theme.colors.c1}`};
  border-radius: 4px;
  background: transparent;
  transition: background 200ms ease-in-out, color 150ms ease-in-out;
  color: ${({ color, theme }) =>
    color ? theme.colors[color] : theme.colors.white};
  &:hover {
    background: ${({ theme, buttonColor }) =>
      buttonColor ? theme.colors[buttonColor] : theme.colors.c1};
    cursor: pointer;
    color: ${({ theme }) => theme.colors.black};
  }
  &:focus {
    outline: none;
  }
`

export default Button
