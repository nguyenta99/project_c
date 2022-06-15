import React from 'react'
import { Button, Grid } from '@mui/material'
import { CssConstant } from '../../assets/constant'
import clsx from 'clsx'
import { IconCheck } from '@tabler/icons'
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material'

const ToolBarAction = (props) => {
  const { leftActions, rightActions, selectedAction, leftResetAction } = props
  const theme = useTheme()
  const useStyles = makeStyles({ ...CssConstant(theme) })

  const classes = useStyles()

  return (
    <Grid container className='mt-1'>
      <Grid container item xs={12} sm={8} alignItems="center">
        {leftActions && leftActions.filter(e => e.visible && e.type == 'custom').map((ac, index) => (
          ac.renderView()
        ))}
        {leftActions && leftActions.filter(e => e.visible && e.type == 'button').map((ac, index) => (
          <div
            key={index}
            onClick={ac.action}
            className={clsx('d-flex align-items-center', classes.buttonDate, selectedAction == ac.id ? 'selected' : '')}
          >
            {selectedAction == ac.id && <IconCheck size={16} stroke={3} color='#fff' className='mr-1' />}{ac.text}
          </div>
        ))}
        {leftResetAction && leftResetAction.visible &&
          <a
            href='#'
            className='ml-2'
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              leftResetAction.action()
            }}
          >{leftResetAction.title}</a>
        }
      </Grid>
      <Grid container item xs={12} sm={4} justifyContent="flex-end" spacing={1}>
        {rightActions && rightActions.filter(e => e.visible).map((ac, index) => (
          <Grid item key={index}>
            <Button
              className={clsx(classes.button_normal, ac.color || 'primary', 'hb-button')}
              sx={ac.sx}
              color={ac.color || 'primary'}
              onClick={ac.action}
              size={ac.size || 'small'}
              variant={ac.variant || 'contained'}
              startIcon={ac.icon}
              endIcon={ac.endIcon}
            >
              {ac.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default ToolBarAction
