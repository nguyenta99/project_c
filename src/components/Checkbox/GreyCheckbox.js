import React from 'react'
import { Checkbox } from '@mui/material'
import { grey, blue } from '../../assets/constant'

const GreyCheckbox = (props) => {
  return (
    <Checkbox
      sx={{
        paddingLeft: 'unset',        
      }}
      {...props}
    />
  )
}

export default GreyCheckbox