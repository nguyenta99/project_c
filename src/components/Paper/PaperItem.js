import React from 'react'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'
import { useTheme } from '@mui/material/styles'
import { Paper } from '@mui/material'

const PaperItem = forwardRef(
  (
    {
      color,
      marginTop,
      height,
      boxShadow,
      shadow,
      lineHeight,
      borderRadius,
      sx={},
      children,
      ...others
    },
    ref
  ) => {
    const theme = useTheme()

    return (
      <Paper
        ref={ref}
        {...others}
        sx={{
          color: color,
          marginTop: marginTop,
          height: height,
          lineHeight: lineHeight,
          borderRadius: borderRadius,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {children}
      </Paper>
    )
  }
)

PaperItem.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  color: PropTypes.string,
  marginTop: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  height: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  boxShadow: PropTypes.bool,
  shadow: PropTypes.string,
  lineHeight: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  borderRadius: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
}

export default PaperItem