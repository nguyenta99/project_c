import React, { useState } from 'react'
import { useStyles } from './style'
import validate from 'validate.js'
import { loadProfile } from '../../actions/profileAction'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { peckPortalClient } from '../../Api'
import { styled } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AuthCardWrapper, AuthFooter, AuthRegister } from './components'
import Logo from '../../components/Logo/Logo'
import { useNavigate } from 'react-router-dom'
import wallpaper from '../../assets/images/wallpaper.gif'

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
  },
  password_confirmation: {
    presence: true,
    equality: "password"
  }
}

const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  // backgroundImage: `url(${background})`,
  minHeight: '100vh'
}))

export const RegisterScreen = (props) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const classes = useStyles()
  const [formData, setFormData] = useState(null)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dispatch = useDispatch()

  const handleChange = (event) => {
    let form = formData || {}
    form[event.target.name] = event.target.value
    setFormData({ ...form })
  }

  const signUp = () => {
    if (formData) {
      const error = validate(formData, schema)

      if (!error) {
        setIsSubmitting(true)
        props.signup({
          formData: formData,
          onSuccess: (response) => {
            const data = response.data

            const account = data.account
            const token = data.token

            // save token 
            peckPortalClient.receiveAuthToken(token)

            setIsSubmitting(false)
            toast.success("Success")
            dispatch(loadProfile())
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
          <Grid container justifyContent="center" alignItems="center" sx={{mt: 10}}>
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
                            Đăng kí tài khoản
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthRegister />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        component={Link}
                        to="/login"
                        variant="subtitle1"
                        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => navigate('/login')}
                      >
                        Đã có tài khoản? Đăng nhập
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