import React, { PureComponent } from 'react'
import styled from 'react-emotion'
import { Circle } from 'rc-progress'

import { Div } from '../base-components'

//====== COMPONENT ======\\

class Downloading extends PureComponent {
  state = {
    complete: false,
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevProps.downloadPercent < 100 &&
      this.props.downloadPercent === 100 &&
      !prevState.complete
    ) {
      this.setState({ complete: true }, () => this.props.nextSlide())
    }
  }

  render() {
    const { color, downloadPercent } = this.props

    return (
      <Div column width="75%" height="100%">
        <Circle
          strokeWidth={1}
          strokeColor={color}
          strokeLinecap="round"
          percent={downloadPercent}
        />
        <H2 color={color}>{downloadPercent} %</H2>
      </Div>
    )
  }
}

export default Downloading

//====== STYLED ======\\

const H2 = styled('h2')`
  transition: color 250ms ease-in-out;
  color: ${({ color }) => color};
  position: absolute;
  font-size: 1.66rem;
`
