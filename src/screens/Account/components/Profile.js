import React, { useContext } from 'react'
import { MainCard } from '../../../components/Card'
import { Grid } from '@mui/material'
import { Typography, Avatar, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material'
import AppContext from '../../../AppContext'
import UserAvatar from '../../../assets/images/users/jinx.jpeg'
import { IconEdit, IconMail, IconPhone, IconLocation } from '@tabler/icons'
import styled from '@mui/material/styles'

const BasicInforHeader = (props) => {
  const currentUser = props?.user || {}

  return (
    <div
      style={{
        padding: 12
      }}
    >
      <Grid container>
        <Grid item xs={2}>
          <Avatar alt={currentUser.name || currentUser.email} src={UserAvatar} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='subtitle1'>{currentUser.name || 'name'}</Typography>
          <Typography variant='subtitle2' >{currentUser.email}</Typography>
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </div>
  )
}

const Profile = (props) => {
  const context = useContext(AppContext)

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={4}
        key={1}
      >
        <MainCard
          customHeader={<BasicInforHeader user={context.currentUser} />}
        >
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            <ListItemButton divider
              sx={{padding: '14px 16px'}}
            >
              <ListItemIcon>
                <IconMail />
              </ListItemIcon>
              <ListItemText id="text-1" primary="Email" />
              {context.currentUser.email}
            </ListItemButton>
            <ListItemButton divider
              sx={{padding: '14px 16px'}}
            >
              <ListItemIcon>
                <IconPhone />
              </ListItemIcon>
              <ListItemText id="text-1" primary="Phone" />
              {context.currentUser.phone}
            </ListItemButton>
            <ListItemButton
              sx={{padding: '14px 16px'}}
            >
              <ListItemIcon>
                <IconLocation />
              </ListItemIcon>
              <ListItemText id="text-1" primary="Address" />
              {context.currentUser.address}
            </ListItemButton>
          </List>
        </MainCard>
      </Grid>
      <Grid
        item
        xs={8}
        key={2}
      >
        <MainCard
          title='About me'
          darkTitle={true}
          variantTitle={'h4'}
          actionHeaders={[
            {
              title: () => <IconEdit />,
              onClick: () => {
                console.log("on action")
              }
            }
          ]}
        />
      </Grid>
    </Grid>
  )
}

export default Profile