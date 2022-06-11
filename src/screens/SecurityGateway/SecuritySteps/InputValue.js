import React, { useState } from 'react'
import { OutlinedInput, InputLabel, FormControl } from '@mui/material'
import validate from 'validate.js'

const schema = {

}

export const InputValue = (props) => {
  const { label } = props
  const [value, setValue] = useState(null)
  const handleChange = () => {

  }

  const handleBlur = () => {

  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment">{label}</InputLabel>
        <OutlinedInput
          id="outlined-adornment"
          type="email"
          value={value || ''}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          label={label}
          inputProps={{}}
        />
      </FormControl>
    </>
  )
}