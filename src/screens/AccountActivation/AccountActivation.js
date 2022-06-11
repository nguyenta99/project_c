import React, { useState, useEffect } from 'react'
import LayoutWrapper from '../../components/LayoutWrapper'
import queryString from 'query-string';
import { peckPortalClient } from '../../Api';
import { Grid } from '@mui/material';
import MainCardWrapper from '../SecurityGateway/MainCardWrapper';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { DefaultApiErrorHandler } from '../../utils';
import { toast } from 'react-toastify';

const AccountActivation = (props) => {
  const [valid, setValid] = useState(null)
  const themes = useTheme()

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    peckPortalClient.verifyActivationToken({
      formData: parsed,
      onSuccess: (response) => {
        setValid(true)
        setTimeout(() => {
          window.location.href = '/'
        }, 3000)
      },
      onError: (error) => {
        toast.error(DefaultApiErrorHandler(error).message)
        setValid(false)
      }
    })
  }, [])

  const resendActivationEmail = () => {
    
  }

  return (
    <LayoutWrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '70vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '60vh' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <MainCardWrapper>
                {
                  valid == null &&
                  <>
                    <LinearProgress />
                  </>
                }
                {
                  valid == true &&
                  <>
                    Verify account success. Redirect after 3 seconds...
                  </>
                }
                {
                  valid == false &&
                  <>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                      <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Verify account error — <strong>check it out!</strong>
                      </Alert>
                      <Button
                        onClick={resendActivationEmail}
                        sx={{
                          backgroundColor: themes.palette.primary.main,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: themes.palette.primary.light,
                          }
                        }}
                      >Resend email activation</Button>
                    </Stack>
                  </>
                }
              </MainCardWrapper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </LayoutWrapper>
  )
}

export default AccountActivation