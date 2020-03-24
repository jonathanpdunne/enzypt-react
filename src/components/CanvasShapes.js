import React, { Component } from 'react'
import styled from 'react-emotion'
import throttle from 'lodash.throttle'

class CanvasShapes extends Component {
	state = {
		width: null,
		height: null,
		canvasWidth: null,
		canvasHeight: null,
		maxShapes: 60,
		growSpeed: 0.1,
		colors: [ '05ffa1', '00ff9e', 'ff71ce', 'b967ff', '01cdfe', 'fffb96' ],
		shapes: []
	}

	canvasRef = React.createRef()
	ctx = null

	drawBackground = () => {
		const { width, height } = this.state
		const { ctx } = this

		//'#2a333f'

		ctx.fillStyle = '#282828'
		ctx.fillRect(0, 0, width, height)
	}

	drawCircle = (size, x, y, color, opacity) => {
		const { ctx } = this

		ctx.beginPath()
		ctx.arc(x, y, Math.abs(size / 2), 0, 2 * Math.PI)
		ctx.fill()
	}

	strokeCircle = (size, x, y) => {
		const { ctx } = this

		ctx.beginPath()
		ctx.arc(x, y, Math.abs(size / 2), 0, 2 * Math.PI)
		ctx.stroke()
	}

	drawSquare = (size, x, y) => {
		const { ctx } = this

		ctx.fillRect(x, y, size, size)
	}

	strokeSquare = (size, x, y) => {
		const { ctx } = this

		ctx.strokeRect(x, y, size, size)
	}

	drawDiamond = (size, x, y) => {
		const { ctx } = this

		ctx.save()
		ctx.rotate(45 * Math.PI / 180)
		ctx.fillRect(x, y, size, size)
		ctx.restore()
	}

	strokeDiamond = (size, x, y) => {
		const { ctx } = this

		ctx.save()
		ctx.rotate(45 * Math.PI / 180)
		ctx.strokeRect(x, y, size, size)
		ctx.restore()
	}

	drawShape = (shape, size, x, y) => {
		switch (shape) {
			case 0:
				this.drawSquare(size, x, y)
				break
			case 1:
				this.strokeSquare(size, x, y)
				break
			case 2:
				this.drawCircle(size, x, y)
				break
			case 3:
				this.strokeCircle(size, x, y)
				break
			case 4:
				this.drawDiamond(size, x, y)
				break
			case 5:
				this.strokeDiamond(size, x, y)
				break
			default:
				return
		}
	}

	renderShapes = () => {
		const { colors, growSpeed, shapes } = this.state
		const { ctx } = this

		for (let shape of shapes) {
			let middleAge = shape.age > shape.lifeTime / 2

			ctx.fillStyle = `#${colors[shape.color]}${shape.opacity}`
			ctx.strokeStyle = `#${colors[shape.color]}${shape.opacity}`

			shape.age++
			shape.translateX >= 0.5
				? (shape.x += shape.translateX / 6)
				: (shape.x -= shape.translateX / 6)
			shape.translateY >= 0.5
				? (shape.y += shape.translateY / 6)
				: (shape.y -= shape.translateY / 6)

			// shape.clockWise ? (shape.rotation += growSpeed) : (shape.rotation -= growSpeed)

			if (!middleAge && shape.size < shape.maxSize) {
				shape.size += growSpeed
			}

			if (middleAge) {
				shape.size -= growSpeed
			}

			if (shape.age > shape.lifeTime || shape.size < 0) {
				shapes.splice(shapes.indexOf(shape), 1)
			} else {
				this.drawShape(shape.type, shape.size, shape.x, shape.y, shape.rotation)
			}
		}
		this.setState({ shapes })
	}

	rollDie = dieSides => {
		return Math.round(Math.random() * dieSides)
	}

	addNewShapes = () => {
		const { shapes, maxShapes, width, height } = this.state
		if (shapes.length < maxShapes) {
			this.setState(({ shapes }) => ({
				shapes: [
					...shapes,
					{
						age: 0,
						size: 0,
						type: this.rollDie(5),
						color: this.rollDie(5),
						rotation: this.rollDie(45),
						lifeTime: this.rollDie(1000),
						maxSize: this.rollDie(10),
						opacity: this.rollDie(99),
						translateX: Math.random(),
						translateY: Math.random(),
						x: this.rollDie(width),
						y: this.rollDie(height)
					}
				]
			}))
		}
	}

	initialize = () => {
		const { innerWidth, innerHeight } = window

		this.setState({
			width: innerWidth,
			height: innerHeight,
			canvasWidth: innerWidth,
			canvasHeight: innerHeight
		})
	}

	frame = () => {
		this.drawBackground()
		this.addNewShapes()
		this.renderShapes()
		requestAnimationFrame(this.frame)
	}

	componentDidMount = () => {
		this.ctx = this.canvasRef.current.getContext('2d')
		this.initialize()
		this.ctx.scale(devicePixelRatio, devicePixelRatio)
		this.frame()
		window.addEventListener('resize', throttle(this.initialize, 150))
	}

	componentWillUnmount = () => {
		window.removeEventListener('resize', throttle(this.initialize, 150))
	}

	render() {
		const { canvasWidth, canvasHeight } = this.state

		return (
			<Canvas
				innerRef={this.canvasRef}
				width={`${canvasWidth}px`}
				height={`${canvasHeight}px`}
			/>
		)
	}
}

export default CanvasShapes

//========== Styled ========== \\

const Canvas = styled('canvas')`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: ${({ width }) => width || '100vw'};
  height: ${({ height }) => height || '100vh'};
`
