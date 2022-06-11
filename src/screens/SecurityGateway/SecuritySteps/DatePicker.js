import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';

export const DatePicker = (props) => {
  const { code, title, onSetData } = props
  const [value, setValue] = useState("1999-06-06")

  useEffect(() => {
    onSetData('birthday', "1999-06-06")
  }, [])

  const handleChange = (event) => {
    setValue(event.target.value)
    onSetData('birthday', event.target.value)
  }

  return (
    <>
      <TextField
        id="date"
        label="Birthday"
        type="date"
        defaultValue="1999-06-06"
        fullWidth
        InputLabelProps={{
          shrink: true,
        }}
        value={value}
        onChange={handleChange}
      />
    </>
  )
}