import styled from 'react-emotion'

export const Div = styled('div')`
  position: relative;
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  flex-wrap: ${({ noWrap }) => (noWrap ? 'nowrap' : 'wrap')};
  justify-content: ${({ justify = 'center' }) => justify};
  align-items: ${({ align = 'center' }) => align};
  width: ${({ width = '100%' }) => width};
  height: ${({ height = 'auto' }) => height};
  ${({ maxWidth }) => (maxWidth ? `max-width: ${maxWidth}` : null)};
  ${({ maxHeight }) => (maxHeight ? `max-height: ${maxHeight}` : null)};
  ${({ minWidth }) => (minWidth ? `min-width: ${minWidth}` : null)};
  ${({ minHeight }) => (minHeight ? `min-height: ${minHeight}` : null)};
  ${({ radius }) => (radius ? `border-radius: 4px` : null)};
  padding: ${({ padding = '0' }) => padding};
  margin: ${({ margin = '0' }) => margin};
  font-family: ${({ theme }) => theme.fonts.primary || 'inherit'};
  font-size: ${({ theme }) => theme.text.t1};
  color: ${({ theme, color }) =>
    color ? theme.colors[color] : theme.colors.black};
  background-color: ${({ theme, background = 'transparent' }) => background};
  ${({ debug, border, theme }) =>
    debug
      ? `border: 1px solid pink`
      : border
        ? `border: 2px solid ${theme.colors[border]}`
        : null};
  overflow: ${({ overflow = 'hidden' }) => overflow};
  ${({ z }) => (z ? `z-index: ${z}` : null)};
`

export const Main = Div.withComponent('main')
export const Section = Div.withComponent('section')
export const Article = Div.withComponent('article')
export const Aside = Div.withComponent('aside')
export const Header = Div.withComponent('header')
export const Footer = Div.withComponent('footer')
