import React, { useEffect, useState } from 'react'
import LayoutWrapper from '../../components/LayoutWrapper'
import MainCardWrapper from './MainCardWrapper'
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import SecureRenderer from './SecureRenderer'
import { useSelector, useDispatch } from 'react-redux';
import { UserResource } from '../../resources';
import { toast } from 'react-toastify';
import { ActionableExceptionHandler } from '../../utils';

export const SecurityGateway = (props) => {
  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const securitySteps = useSelector(state => state.securityGateway)
  const currentUser = useSelector(state => state.currentUser)
  const [data, setData] = useState(null)
  const [finishable, setFinishable] = useState(false)
  let [currentStepIndex, setCurrentStepIndex] = useState(null)

  let [step, setStep] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (securitySteps.hasOwnProperty('currentStep')) {
      setCurrentStepIndex(securitySteps.currentStep)
      setStep(securitySteps.steps[securitySteps.currentStep])
    }
  }, [securitySteps])

  const onSetData = (key, value) => {
    let currentData = data || {}
    currentData[key] = value
    setData(currentData)
  }

  const handleCommitAction = () => {
    if (data) {
      UserResource.loader.commitAction({
        id: currentUser.id,
        data: {
          action_code: 'commit_security_gateway',
          action_data: {
            security_step: step,
            security_code: securitySteps.code,
            data: data
          }
        },
        done: (response) => {
          if (securitySteps.currentStep == securitySteps.steps.length - 1) {
            setFinishable(true)
          } else {
            dispatch({
              type: 'UPDATE_SECURITY_CURRENT_STEP',
              currentStep: securitySteps.currentStep + 1,
            })
          }
        },
        error: (error) => {
          toast.error(ActionableExceptionHandler(error).message)
        }
      })
    } else {
      toast.error("Please input data")
    }
  }

  const handleIgnoreAction = () => {
    if (step.ignorable) {
      UserResource.loader.commitAction({
        id: currentUser.id,
        data: {
          action_code: 'ignore_security_gateway',
          action_data: {
            security_step: step,
            security_code: securitySteps.code
          }
        },
        done: (response) => {
          if (securitySteps.currentStep == securitySteps.steps.length - 1) {
            setFinishable(true)
          } else {
            dispatch({
              type: 'UPDATE_SECURITY_CURRENT_STEP',
              currentStep: securitySteps.currentStep + 1,
            })
          }
        },
        error: (error) => {
          toast.error(ActionableExceptionHandler(error).message)
        }
      })
    } else {
      toast.error("This step is not ignorable!")
    }
  }

  return (
    <>
      <LayoutWrapper>
        <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
          <Grid item xs={12}>
            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                {
                  step &&
                  <MainCardWrapper>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                      <Grid item xs={12}>
                        <Grid
                          container
                          direction={matchDownSM ? 'column-reverse' : 'row'}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Grid item sx={{ mb: 3 }}>
                            <Typography
                              color={theme.palette.success.dark}
                              gutterBottom
                              variant={matchDownSM ? 'h4' : 'h3'}
                            >
                              {step?.title}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                          <Grid item xs={12} sx={{ mt: 2 }}>
                            <Stack alignItems="center" justifyContent="center" spacing={1}>
                              <SecureRenderer
                                onSetData={onSetData}
                                currentStepIndex={currentStepIndex}
                                step={step}
                              />
                            </Stack>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item container direction="column" alignItems="start" xs={6}>
                            <Typography
                              variant="subtitle1"
                              sx={{
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                float: 'right',
                                color: theme.palette.secondary.main,
                                '&:hover': {
                                  color: theme.palette.secondary.dark
                                }
                              }}
                              onClick={handleIgnoreAction}
                            >
                              Ignore
                            </Typography>
                          </Grid>
                          <Grid item container direction="column" alignItems="end" xs={6}>
                            {
                              step && step.nextable &&
                              <Typography
                                variant="subtitle1"
                                sx={{
                                  textDecoration: 'underline',
                                  cursor: 'pointer',
                                  float: 'right',
                                  color: theme.palette.success.main,
                                  '&:hover': {
                                    color: theme.palette.success.dark
                                  }
                                }}
                                onClick={handleCommitAction}
                              >
                                Next step
                              </Typography>
                            }
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </MainCardWrapper>
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutWrapper>
    </>
  )
} 