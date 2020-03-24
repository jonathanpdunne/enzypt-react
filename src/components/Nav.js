import React, { Component } from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

//====== COMPONENT ======\\

class Nav extends Component {
  static Item = ({ index, children, to, url, click }) => {
    return (
      <NavContext.Consumer>
        {({ activeIndex }) =>
          url ? (
            <a href={to} target="_blank">
              {this.renderItems(activeIndex, index, children, click)}
            </a>
          ) : (
            <Link to={to || ' '}>
              {this.renderItems(activeIndex, index, children, click)}
            </Link>
          )
        }
      </NavContext.Consumer>
    )
  }

  state = {
    activeIndex: 0,
    activeRoute: '',
  }

  renderItems = (activeIndex, index, children, click) => {
    if (React.Children.count(children) === 1 && typeof children === 'string') {
      return activeIndex === index ? (
        <ActiveListItem onClick={click}>{children}</ActiveListItem>
      ) : (
        <ListItem onClick={click}>{children}</ListItem>
      )
    } else {
      return activeIndex === index
        ? React.cloneElement(children, { active: true, onClick: click })
        : React.cloneElement(children, { onClick: click })
    }
  }

  handleKeyDown(event) {
    const { activeIndex, activeRoute } = this.state
    const { length } = this.props.children

    if (event.keyCode === 40 || event.keyCode === 39) {
      const index = activeIndex !== length - 1 ? activeIndex + 1 : 0
      this.setState({
        activeIndex: index,
        activeRoute: this.props.children[index].props.to,
      })
    }
    if (event.keyCode === 38 || event.keyCode === 37) {
      const index =
        activeIndex !== 0 ? activeIndex - 1 : this.props.children.length - 1
      this.setState({
        activeIndex: index,
        activeRoute: this.props.children[index].props.to,
      })
    }
    if (event.keyCode === 13) {
      if (activeRoute.charAt(0) === '/') {
        this.props.history.push(activeRoute)
      } else {
        window.open(activeRoute, '_blank')
      }
    }
  }

  componentDidMount() {
    this.handleKeyDown = this.handleKeyDown.bind(this)
    window.addEventListener('keydown', this.handleKeyDown)
    this.setState({ activeRoute: this.props.children[0].props.to })
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    return (
      <NavContext.Provider
        value={{
          activeIndex: this.state.activeIndex,
          updateActiveIndex: index => this.setState({ activeIndex: index }),
          updateActiveRoute: route => this.setState({ activeRoute: route }),
        }}
      >
        <Ul {...this.props}>
          {React.Children.map(this.props.children, (child, i) =>
            React.cloneElement(child, {
              index: i,
            })
          )}
        </Ul>
      </NavContext.Provider>
    )
  }
}

export default Nav

//====== STYLED ======\\

const Ul = styled('ul')`
  position: ${({ position = 'initial' }) => position};
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  justify-content: ${({ centerX }) => (centerX ? 'center' : 'initial')};
  align-items: ${({ centerY }) => (centerY ? 'center' : 'initial')};
  width: ${({ width = 'auto' }) => width};
  height: ${({ height = 'auto' }) => height};
  padding: 1rem;
  border: ${({ theme, border }) =>
    border ? `1px solid ${theme.colors.c1}` : 'none'};
`

const ListItem = styled('li')`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.c3};
  padding: 0.5em;
  font-size: ${({ theme }) => theme.text.h4};
`

const ActiveListItem = styled(ListItem)`
  color: ${({ theme }) => theme.colors.c2};
`

//====== CONTEXT ======\\

const NavContext = React.createContext({
  activeIndex: 0,
  updateIndex: () => {},
})
