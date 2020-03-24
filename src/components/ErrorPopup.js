import React from 'react'
import { Div } from '../base-components'
import { Button } from '../elements'

const ErrorPopup = props => {
  const { message } = props
  return (
    <Div
      border="error"
      radius="true"
      color="white"
      padding="3rem"
      height="100%"
    >
      <p>{message}</p>
      <Button
        buttonColor="error"
        color="white"
        onClick={() => window.location.reload(true)}
        margin="1rem 0 0 0"
      >
        TRY AGAIN
      </Button>
    </Div>
  )
}

export default ErrorPopup
