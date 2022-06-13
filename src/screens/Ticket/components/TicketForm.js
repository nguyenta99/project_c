import React, { useState } from 'react'
import {
  Stack, TableCell, Chip, Tab, Tabs, Box, TableHead, TextField, InputAdornment, IconButton, Button
} from '@mui/material'
import { styled } from '@mui/system';

const DivComponent = styled('div')({
  marginBottom: 12
})

const TicketForm = (props) => {
  const { submitData, handleChange, ...others } = props
  const handleChangeText = (event) => {
    handleChange(event.target.name, event.target.value)
  }

  const hasError = (field) => {
    return submitData.errors && submitData.errors[field]
  }

  return (
    <div>
      <Stack direction={'column'}>
        <DivComponent>
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Nội dung<span style={{ color: 'red' }}>*</span></Box>
          <TextField fullWidth
            onChange={handleChangeText}
            name='content'
            rows={3}
            maxRows={5}
            multiline
            value={submitData.values.content || ''}
          />
          {hasError('content') && <small style={{ color: 'red' }}>{submitData.errors.content[0]}</small>}
        </DivComponent>
      </Stack>
    </div>
  )
}

export default TicketForm