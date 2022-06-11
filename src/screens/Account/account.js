import React, { useState } from 'react'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { IconHome, IconUser, IconLock, IconSettings, IconPaperBag } from '@tabler/icons'
import { useTheme } from '@mui/system';
import MainCard from '../../components/Card/MainCard';
import { Box, Tab, Tabs, Link, Breadcrumbs, Grid, Typography, } from '@mui/material';
import { Profile, ChangePassword } from './components';

const PaperItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  marginTop: 15,
  height: 60,
  lineHeight: '60px',
  borderRadius: 12
}))

const AccountTab = styled(Tab)(({ theme }) => ({
  minHeight: 50,
  color: theme.palette.primary.dark,
  fontWeight: 500
}))

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Account = (props) => {
  const theme = useTheme()
  const [ currentTab, setCurrentTab] = useState(0)

  const handleChangeCurrentTab = (event, value) => {
    setCurrentTab(value)
  }

  return (
    <>
      <PaperItem>
        <Grid container spacing={2}>
          <Grid item xs={6} key={1}>
            <Typography variant='h3'
              sx={{
                height: 60,
                float: 'left',
                marginLeft: 3
              }}
            >Account</Typography>
          </Grid>
          <Grid item xs={6} key={2} >
            <div role={'presentation'}
              style={{
                minWidth: 130,
                marginLeft: 'auto',
                marginRight: 0,
                width: 'max-content'
              }}
            >
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                  href="/"
                >
                  <IconHome color={theme.palette.primary.dark} style={{ cursor: 'pointer', '&:hover': { backgroundColor: theme.palette.primary.dark } }} />
                </Link>
                <Typography
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="text.primary"
                >
                  Account
                </Typography>
              </Breadcrumbs>
            </div>
          </Grid>
        </Grid>
      </PaperItem>
      <MainCard
        sx={{
          borderRadius: 3,
          marginTop: 3,
          minHeight: '40vh'
        }}
      >
        <Box sx={{ borderBottom: '1px solid', borderColor: theme.palette.grey[300] }}>
          <Tabs
            value={currentTab}
            onChange={handleChangeCurrentTab}
            aria-label="icon position tabs"
            indicatorColor='primary'
            textColor='primary'
            variant="scrollable"
          >
            <AccountTab icon={<IconUser />} iconPosition="start" label="Profile"/>
            {/* <AccountTab icon={<IconPaperBag />} iconPosition="start" label="Personal detail"/> */}
            <AccountTab icon={<IconLock />} iconPosition="start" label="Change password"/>
            <AccountTab icon={<IconSettings />} iconPosition="start" label="Settings"/>
          </Tabs>
        </Box>
        <TabPanel value={currentTab} index={0}>
          <Profile/>
        </TabPanel>
        {/* <TabPanel value={currentTab} index={1}>
        </TabPanel> */}
        <TabPanel value={currentTab} index={1}>
          <ChangePassword/>
        </TabPanel>
        <TabPanel value={currentTab} index={2}>
        </TabPanel>
      </MainCard>
    </>
  )
}

export default Account