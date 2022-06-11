import React from 'react'
import { TextField } from '@mui/material'

const InputProvider = (props) => {
  return (
    <>
      {
        props.type == 'phone' &&
        <TextField
          id='phone-provider'
          {...props}
        />
      }
    </>
  )
}

export default InputProvider