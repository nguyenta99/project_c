import React from 'react'
import { TextField, Box, Stack, Grid } from '@mui/material'
import clsx from 'clsx';

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});

const ProductBuying = (props) => {
  const { submitData, handleChange } = props

  const hasError = (field) => {
    return submitData.errors && submitData.errors[field]
  }

  return (
    <>
      <Stack spacing={8}>
        <div>
          <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Nhập số lượng<span style={{ color: 'red' }}>*</span></Box>
          <TextField fullWidth
            onChange={(event) => handleChange('amount', event.target.value)}
            name='index'
            type={'number'}
            placeholder="Nhập số lượng"
            value={submitData.values.amount || ''}
          />
          {hasError('amount') && <small style={{ color: 'red' }}>{submitData.errors.amount[0]}</small>}
        </div>
        <Stack spacing={1}>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4}>
                <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Đơn giá:</Box>
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                {
                  submitData.values.product && <>{formatter.format(submitData.values.product.price || 0)}</>
                }
              </Grid>
            </Grid>
          </div>
          <div>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4}>
                <Box fontWeight={'bold'} fontSize={13} marginBottom={1} >Thành tiền:</Box>
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                {
                  submitData.values.product && submitData.values.amount && <>{formatter.format((submitData.values.product.price || 0) * submitData.values.amount)}</>
                }
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Stack>
    </>
  )
}

export default ProductBuying