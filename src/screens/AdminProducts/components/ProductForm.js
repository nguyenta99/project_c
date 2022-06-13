import React, { useState } from 'react'
import {
  Stack, TableCell, Chip, Tab, Tabs, Box, TableHead, TextField, InputAdornment, IconButton, Button
} from '@mui/material'
import { styled } from '@mui/system';
import AsyncSelect from 'react-select/async';
import { customStyles, makeId } from '../../../utils';
import ClearIcon from '@mui/icons-material/Clear';

const DivComponent = styled('div')({
  marginBottom: 12
})

const kinds = [
  { key: 1, text: 'BM', value: 'bm' },
  { key: 2, text: 'Via XMDT + 902', value: 'via_xmdn' },
  { key: 3, text: 'Via Thường Live ADS!', value: 'via_normal' },
  { key: 4, text: 'Via Limit $50 + $250', value: 'via_limit_50' },
  { key: 5, text: 'Clone các loại', value: 'clone' }
]

const ProductForm = (props) => {
  const { submitData, handleChange, ...others } = props
  const [commitions, setCommitions] = useState(submitData.values.commitions || [null])
  const handleChangeText = (event) => {
    handleChange(event.target.name, event.target.value)
  }

  const hasError = (field) => {
    return submitData.errors && submitData.errors[field]
  }

  const loadOptions = (inputValue, loadingData) => {
    return loadingData(inputValue)
  };

  const handleChangeCommition = (event, index) => {
    const value = event.target.value
    commitions[index] = value
    const newCommit = [...commitions]
    setCommitions(newCommit)
    handleChange('commitions', newCommit)
  }

  const onRemoveCommition = (index) => {
    commitions.splice(index, 1)
    const newCommit = [...commitions]
    setCommitions(newCommit)
    handleChange('commitions', newCommit)
  }
  
  const addCommition = () => {
    commitions.push(null)
    setCommitions([...commitions])
    handleChange('commitions', [...commitions])
  }

  return (
    <div>
      <Stack direction={'column'}>
        <DivComponent>
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Title<span style={{ color: 'red' }}>*</span></Box>
          <TextField fullWidth
            onChange={handleChangeText}
            name='title'
            value={submitData.values.title || ''}
          />
          {hasError('title') && <small style={{ color: 'red' }}>{submitData.errors.title[0]}</small>}
        </DivComponent>
        <DivComponent>
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Kind <span style={{ color: 'red' }}>*</span></Box>
          <AsyncSelect
            className={"MuiFormControl-marginDense"}
            isSearchable
            loadOptions={(inputValue) => loadOptions(inputValue, function loadingData(inputValue) {
              return new Promise(resolve => {
                resolve(kinds)
              })
            })
            }
            defaultOptions
            getOptionLabel={({ text }) => text}
            getOptionValue={({ value }) => value}
            onChange={(value) => {
              handleChange('kind', value)
            }}
            value={submitData.values.kind || null}
            styles={customStyles()}
          />
          {hasError('kind') && <small style={{ color: 'red' }}>{submitData.errors.kind[0]}</small>}
        </DivComponent>
        <DivComponent>
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Price<span style={{ color: 'red' }}>*</span></Box>
          <TextField fullWidth
            onChange={handleChangeText}
            name='price'
            value={submitData.values.price || ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">VND</InputAdornment>
              )
            }}
          />
          {hasError('price') && <small style={{ color: 'red' }}>{submitData.errors.price[0]}</small>}
        </DivComponent>
        <DivComponent>
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Compare Price<span style={{ color: 'red' }}>*</span></Box>
          <TextField fullWidth
            onChange={handleChangeText}
            name='compare_price'
            value={submitData.values.compare_price || ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">VND</InputAdornment>
              )
            }}
          />
          {hasError('compare_price') && <small style={{ color: 'red' }}>{submitData.errors.compare_price[0]}</small>}
        </DivComponent>
        <DivComponent>
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Commitions<span style={{ color: 'red' }}>*</span></Box>
          <Button variant='contained' onClick={() => addCommition()} sx={{marginBottom: 1}} size='small'>Add +</Button>
          <Stack direction={'column'} spacing={1}>
            {
              commitions.map((commition, index) => {
                return (
                  <TextField fullWidth
                    key={index}
                    onChange={(event) => handleChangeCommition(event, index)}
                    name='commitions'
                    type={'text'}
                    value={commition || ''}
                    placeholder='Cam kết không lỗi....'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton onClick={() => onRemoveCommition(index)}><ClearIcon/></IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )
              })
            }
          </Stack>
        </DivComponent>
        <DivComponent>
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Index<span style={{ color: 'red' }}>*</span></Box>
          <TextField fullWidth
            onChange={handleChangeText}
            name='index'
            type={'number'}
            value={submitData.values.index || ''}
          />
          {hasError('index') && <small style={{ color: 'red' }}>{submitData.errors.index[0]}</small>}
        </DivComponent>
      </Stack>
    </div>
  )
}

export default ProductForm