import React, { Component } from 'react'
import styled from 'react-emotion'

import { Section } from '../base-components'

// ---------- ELEMENTS ----------- //

const CarouselContainer = styled(Section)`
  border-radius: 2px;
  overflow: hidden;
  @media (max-width: 1024px) {
    width: 100%;
  }
`

const SlideContainer = styled(Section)`
  height: 100%;
  opacity: ${({ opacity }) => opacity};
  transition: transform 500ms ease-in-out, opacity 250ms ease-in-out;
  transform: ${({ translate }) => translate};
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`

// ---------- CONTEXT ----------- //

const Context = React.createContext({
  activeIndex: 0,
  slidesLength: 0,
  nextSlide: () => {},
  previousSlide: () => {},
})

// ---------- COMPONENT ----------- //

class Carousel extends Component {
  static Slide = ({ index, children, ...rest }) => {
    return (
      <Context.Consumer>
        {({ activeIndex, nextSlide, previousSlide }) => (
          <SlideContainer
            translate={
              activeIndex - index >= 1
                ? 'translateX(-1000px)'
                : activeIndex - index <= -1
                  ? 'translateX(1000px)'
                  : 'translateX(0)'
            }
            opacity={activeIndex === index ? 1 : 0}
            {...rest}
          >
            {React.Children.map(children, child => {
              return React.cloneElement(child, {
                nextSlide: nextSlide,
                previousSlide: previousSlide,
                activeIndex: activeIndex === index,
              })
            })}
          </SlideContainer>
        )}
      </Context.Consumer>
    )
  }

  state = {
    activeIndex: 0,
    slidesLength: 0,
  }

  nextSlide = () => {
    const lastIndex = this.state.slidesLength - 1
    this.setState(
      ({ activeIndex }) => ({
        activeIndex: activeIndex === lastIndex ? activeIndex : activeIndex + 1,
      }),
      () =>
        this.props.currentIndex &&
        this.props.currentIndex(this.state.activeIndex)
    )
  }

  previousSlide = () => {
    const firstIndex = 0
    this.setState(
      ({ activeIndex }) => ({
        activeIndex: activeIndex === firstIndex ? firstIndex : activeIndex - 1,
      }),
      () =>
        this.props.currentIndex &&
        this.props.currentIndex(this.state.activeIndex)
    )
  }

  componentDidMount = () =>
    this.setState({
      slidesLength: React.Children.toArray(this.props.children).length,
    })

  render() {
    return (
      <Context.Provider
        value={{
          activeIndex: this.state.activeIndex,
          slidesLength: this.state.slidesLength,
          nextSlide: this.nextSlide,
          previousSlide: this.previousSlide,
        }}
      >
        <CarouselContainer {...this.props}>
          {React.Children.map(this.props.children, (child, i) =>
            React.cloneElement(child, { index: i })
          )}
        </CarouselContainer>
      </Context.Provider>
    )
  }
}

export default Carousel
