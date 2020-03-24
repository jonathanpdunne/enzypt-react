import React, { Component } from 'react'
import styled from 'react-emotion'

import { Button } from '../elements'
import { Div } from '../base-components'

//--------- COMPONENT --------\\

class Forms extends Component {
  static Input = ({
    type,
    name,
    label,
    placeholder,
    validate,
    required,
    postLabel,
    hidden,
    ...rest
  }) => {
    return (
      <Context.Consumer>
        {({ state, handleChange, validateField, setAsValid }) => {
          const errorMsg = state[name].errorMsg
          const validInput = state[name].validInput

          return (
            <Container style={{ display: hidden ? 'none' : null }}>
              <Div justify="initial">
                <Label>
                  {label}
                  {required && <Asterisk>*</Asterisk>}
                </Label>
                <Span error={errorMsg}>{errorMsg}</Span>
              </Div>
              {type === 'textarea' ? (
                <TextArea
                  onChange={handleChange(name, type)}
                  onBlur={
                    required || validate
                      ? validateField(name, type, required)
                      : setAsValid(name)
                  }
                  value={state[name].data}
                  placeholder={placeholder || ''}
                  valid={validInput}
                  {...rest}
                />
              ) : (
                <FlexDiv>
                  <Input
                    type={
                      type === 'eth' || type === undefined || type === 'number'
                        ? 'text'
                        : type
                    }
                    onChange={handleChange(name, type)}
                    onBlur={
                      required || validate
                        ? validateField(name, type, required)
                        : setAsValid(name)
                    }
                    value={state[name].data}
                    placeholder={placeholder || ''}
                    valid={validInput}
                    postLabel={postLabel}
                    {...rest}
                  />
                  {postLabel && (
                    <PostLabel valid={validInput}>{postLabel}</PostLabel>
                  )}
                </FlexDiv>
              )}
            </Container>
          )
        }}
      </Context.Consumer>
    )
  }

  static Button = ({ label, ...rest }) => {
    return (
      <Container>
        <CustomButton {...rest}>{label}</CustomButton>
      </Container>
    )
  }

  getInitialState = () => {
    const { children } = this.props
    const childrenArray = React.Children.toArray(children)

    const inputState = childrenArray.reduce((acc, child) => {
      const name = child.props.name
      const isRequired = child.props.required

      if (name) {
        acc[name] = {}
        acc[name].data = ''
        acc[name].errorMsg = ''
        acc[name].validInput = null
        acc[name].isRequired = isRequired
      }

      return acc
    }, {})

    return inputState
  }

  state = this.getInitialState()

  componentDidUpdate = () => {
    const { preFilledValue } = this.props
    if (!preFilledValue) return

    if (this.state.sellerEthAddress) {
      const {
        sellerEthAddress: { data }
      } = this.state

      if (data === '') {
        this.setState({
          sellerEthAddress: {
            data: preFilledValue,
            errorMsg: '',
            validInput: true,
            isRequired: true
          }
        })
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    const { state } = this

    let valid = true

    const data = Object.keys(state).reduce((acc, key) => {
      if (!state[key].validInput) {
        valid = false
        if (key !== 'sellerEthAddress') {
          this.setState(prevState => {
            return {
              [key]: {
                errorMsg: 'This field is required',
                validInput: false,
                data: prevState[key].data
              }
            }
          })
        }
      } else {
        acc[key] = state[key].data
      }
      return acc
    }, {})

    if (valid) {
      this.props.getData && this.props.getData(data)
      this.props.nextSlide()
    }
  }

  extractNumbers = str => {
    const match = str.match(/[0-9.]/g)
    return match === null ? '' : match.reduce((str, char) => str + char, '')
  }

  handleChange = (name, type) => event => {
    if (name === 'sellerEthAddress') {
      this.props.userInput()
    }
    if (event.target.type === 'checkbox') {
      this.setState({
        [name]: {
          errorMsg: '',
          validInput: null,
          data: event.target.checked
        }
      })
    } else {
      const value =
        type === 'number'
          ? this.extractNumbers(event.target.value)
          : event.target.value
      this.setState({
        [name]: {
          errorMsg: '',
          validInput: null,
          data: value
        }
      })
      this.props.addMetadata({ [name]: value })
    }
  }

  setAsValid = name => event => {
    const currentState = this.state[name]
    this.setState({
      [name]: Object.assign({}, currentState, {
        errorMsg: '',
        validInput: true
      })
    })
  }

  validateField = (name, type, required) => event => {
    const value = event.target.value
    const currentState = this.state[name]

    if (required && value === '') {
      this.setState({
        [name]: Object.assign({}, currentState, {
          errorMsg: 'This field is required',
          validInput: false
        })
      })
      return
    }

    if (type === 'eth' && !validation[type].regex.test(value)) {
      this.setState({
        [name]: Object.assign({}, currentState, {
          errorMsg: validation[type].message,
          validInput: false
        })
      })
      return
    }

    this.setState({
      [name]: Object.assign({}, currentState, {
        errorMsg: '',
        validInput: true
      })
    })
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: { ...this.state },
          handleChange: this.handleChange,
          validateField: this.validateField,
          setAsValid: this.setAsValid
        }}
      >
        <Form onSubmit={this.handleSubmit} {...this.props} noValidate>
          {this.props.children}
        </Form>
      </Context.Provider>
    )
  }
}

export default Forms

//--------- STYLED --------\\

const Form = styled('form')`
  position: relative;
  display: flex;
  flex-direction: ${({ row }) => (row ? 'row' : 'column')};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
  justify-content: center;
  align-items: center;
  width: ${({ width = '100%' }) => width};
  height: ${({ height = 'auto' }) => height};
  padding: 1rem 1rem 3rem 1rem;
  ${({ theme, border }) => border && `border: 2px solid ${theme.colors.c1}`};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.black || 'black'};
  @media (max-width: 1024px) {
    height: auto;
  }
`

const Container = styled('div')`
  display: flex;
  flex-flow: column nowrap;
  margin: 0.5rem 1rem;
  width: ${({ width = '100%' }) => width};
`

const Label = styled('label')`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.colors.white};
`

const FlexDiv = styled('div')`
  display: flex;
`

const Input = styled('input')`
  flex: 1;
  width: ${({ width = 'auto' }) => width};
  padding: 0.5rem 1rem;
  border: 1px solid;
  border-color: ${({ valid, theme }) =>
    valid === null
      ? theme.colors.gray
      : valid
        ? theme.colors.success
        : theme.colors.error};
  border-radius: ${({ postLabel }) => (postLabel ? '4px 0px 0px 4px' : '4px')};
  box-shadow: none;
  outline: none;
  resize: none;
  transition: border-color 200ms ease-in-out;
  &:focus {
    border-color: ${({ valid, theme }) =>
      valid === null
        ? theme.colors.black
        : valid
          ? theme.colors.success
          : theme.colors.error};
  }
`

const PostLabel = styled('span')`
  background-color: white;
  border: 1px solid;
  border-color: ${({ valid, theme }) =>
    valid === null
      ? theme.colors.gray
      : valid
        ? theme.colors.success
        : theme.colors.error};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 4px 4px 0;
  padding: 0.5rem 1rem;
`

const TextArea = Input.withComponent('textarea')

const Span = styled('h3')`
  width: ${({ error }) => (error ? '11rem' : '0')};
  opacity: ${({ error }) => (error ? '1' : '0')};
  transition: width 250ms ease-in-out, opacity 250ms ease-in-out;
  padding: 0.25rem;
  overflow: hidden;
  height: 1.5rem;
  color: ${({ theme }) => theme.colors.error};
  font-weight: 300;
`

const CustomButton = styled(Button)`
  position: absolute;
  bottom: 0;
  right: 0;
`

const Asterisk = styled('span')`
  color: ${({ theme }) => theme.colors.error};
`

//--------- CONTEXT --------\\

const Context = React.createContext()

//--------- VALIDATION REGEX --------\\

const validation = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email address is not valid'
  },
  eth: {
    regex: /^(0x){1}[0-9a-fA-F]{40}$/i,
    message: 'address is not valid'
  }
}
