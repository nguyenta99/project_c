import React from 'react'
import PaperItem from '../../components/Paper/PaperItem'
import { Grid, Typography, Breadcrumbs, Link } from '@mui/material'
import { useTheme } from '@mui/material'
import { IconHome } from '@tabler/icons'
import { MainCard } from '../../components/Card'

const Order = (props) => {
  const theme = useTheme()
  
  return (
    <>
      <PaperItem
        {...theme.typography.body2}
        color={theme.palette.text.secondary}
        marginTop={2}
        height={60}
        lineHeight={'60px'}
        borderRadius={3}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} key={1}>
            <Typography variant='h3'
              sx={{
                height: 60,
                float: 'left',
                marginLeft: 3
              }}
            >Orders</Typography>
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
                  Orders
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

      </MainCard>
    </>
  )
}

export default Order