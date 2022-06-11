import React, { useRef, useState, useEffect } from 'react'
import { IconCoin, IconPlus, IconRefresh } from '@tabler/icons'
import {
  Box, ButtonBase, Avatar, Popper, Paper, ClickAwayListener,
  Grid, Stack, useMediaQuery, Typography, Divider, List, ListItemButton,
  ListItemIcon, ListItemText, Button
} from '@mui/material'
import { useTheme } from '@mui/material'
import Transitions from '../../../../components/extended/Transitions'
import { MainCard } from '../../../../components/Card'
import { FormModal } from '../../../../components/Modal'
import { FileUploader } from '../../../../components/FileUploader'
import { useSelector, useDispatch } from 'react-redux'
import { loadProfile } from '../../../../actions/profileAction'
import { useNavigate } from 'react-router-dom'

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});

formatter.format(2500);

const AccountBalance = (props) => {
  const theme = useTheme()
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false);
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const prevOpen = useRef(open);
  const currentUser = useSelector(selector => selector.currentUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const onAddMoney = () => {
    navigate('/load_money')
  }

  const handleClickReload = (event) => {
    event.stopPropagation()
    dispatch(loadProfile())
  }

  return (
    <>
      <FormModal />
      <Box
        sx={{
          ml: 2,
          mr: 1,
          [theme.breakpoints.down('md')]: {
            mr: 2
          }
        }}
      >
        <ButtonBase sx={{
          borderRadius: '12px',
          backgroundColor: theme.palette.success.light,
          padding: 0.8,
          paddingLeft: 1,
          paddingRight: 1,
          borderRadius: 8
        }}
          onClick={handleToggle}
        >
          <span style={{ marginRight: 10 }}>{formatter.format(currentUser.balance || 0)}</span>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              }
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          >
            <IconRefresh stroke={1.5} size="1.3rem" 
              onClick={(event) => handleClickReload(event)}
            />
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 5 : 0, 20]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }} spacing={3}>
                        <Grid item>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="subtitle1">Số dư</Typography>
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Typography component={'span'} variant="subtitle2" color="primary">
                            <span style={{ marginRight: 10 }}>{formatter.format(currentUser.balance || 0)}</span>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Divider />
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={2}>
                        <Button variant='contained' fullWidth
                          sx={{ margin: 2 }}
                          onClick={onAddMoney}
                        >Nạp tiền</Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  )
}

export default AccountBalance