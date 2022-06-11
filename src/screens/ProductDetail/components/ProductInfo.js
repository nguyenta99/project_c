import { List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material'
import React from 'react'
import CheckIcon from '@mui/icons-material/Check';

const ProductInfo = (props) => {
  const { submitData, handleChange} = props

  return (
    <>
      <List dense>
        {
          submitData.values.commitions?.map((commition, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <CheckIcon color='primary'/>
              </ListItemIcon>
              <ListItemText primary={commition} />
            </ListItem>
          ))
        }
      </List>
    </>
  )
}

export default ProductInfo