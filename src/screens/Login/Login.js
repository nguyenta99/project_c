import React, { useState } from 'react'
import { useStyles } from './style'
import { peckPortalClient } from '../../api'
import validate from 'validate.js'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loadProfile } from '../../actions/profileAction'
import { useNavigate } from 'react-router-dom'
import { AuthCardWrapper, AuthFooter, AuthLogin } from './components'
import Logo from '../../components/Logo/Logo'
import { styled } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import wallpaper from '../../assets/images/wallpaper.gif'

const schema = {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  }
}

const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  // backgroundImage: `url(${wallpaper})`,
  minHeight: '100vh'
}))

export const LoginScreen = (props) => {
  const theme = useTheme();
  const navigate = useNavigate()
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch()

  const handleChange = (event) => {
    let formData = form || {}
    formData[event.target.name] = event.target.value
    setForm({ ...formData })
  }

  const signIn = () => {
    if (form) {
      const error = validate(form, schema)

      if (!error) {
        setIsSubmitting(true)
        props.signin({
          formData: form,
          onSuccess: (response) => {
            let token = response.data.token
            peckPortalClient.receiveAuthToken(token)

            setIsSubmitting(false)
            toast.success("Login success")
            
            dispatch(loadProfile())
            window.location.href = '/'
          },
          onError: (error) => {
            setIsSubmitting(false)
            toast.error(error)
          }
        })
      } else {
        setErrors(error)
      }
    }
  }

  return (
    <AuthWrapper>
      <Grid container direction="column" justifyContent="flex-end">
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ mt: 10 }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 1 }}>
                    <h2
                      style={{
                        marginLeft: 10,
                        color: theme.palette.primary.main,
                        textDecoration: 'none'
                      }}
                    >Mua bán Tài Khoản Quảng Cáo</h2>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? 'column-reverse' : 'row'}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? 'h3' : 'h2'}
                          >
                            Đăng nhập
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        component={Link}
                        to="/register"
                        variant="subtitle1"
                        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => navigate('/register')}
                      >
                        Chưa có tài khoản? Đăng kí
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper>
  )
}