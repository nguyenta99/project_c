import React from 'react'
import { TextField, Stack, Box, InputAdornment } from '@mui/material'
import { styled } from '@mui/system';

const DivComponent = styled('div')({
  marginBottom: 12
})

const NewCampaignForm = (props) => {
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
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Title Campaign<span style={{ color: 'red' }}>*</span></Box>
          <TextField fullWidth
            onChange={handleChangeText}
            name='title'
            value={submitData.values.title || ''}
          />
          {hasError('title') && <small style={{ color: 'red' }}>{submitData.errors.title[0]}</small>}
        </DivComponent>
        <DivComponent>
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Price<span style={{color: 'red'}}>*</span></Box>
          <TextField fullWidth
            onChange={handleChangeText}
            type='number'
            name='price'
            value={submitData.values.price || ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
          />
          {hasError('price') && <small style={{ color: 'red' }}>{submitData.errors.price[0]}</small>}
        </DivComponent>
      </Stack>
    </div>
  )
}

export default NewCampaignForm