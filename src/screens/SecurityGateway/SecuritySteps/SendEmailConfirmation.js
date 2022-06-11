import React, { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { UserResource } from '../../../resources'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { ActionableExceptionHandler } from '../../../utils'

const useStyles = makeStyles({
  email_button: {
    cursor: 'pointer',
    color: '#00c853',
    '&:hover': {
      color: '#673ab7',
    }
  },
  email_title: {
    fontSize: 14
  }
})

const SendEmailConfirmation = (props) => {
  const classes = useStyles()
  const [requested, setRequested] = useState(false)
  const currentUser = useSelector(state => state.currentUser)

  const handleSendEmail = () => {
    toast.info("We sent an activation email to you, please check your email.")
    UserResource.loader.commitAction({
      id: currentUser.id,
      data: {
        action_code: 'send_activation_email',
        action_data: {}
      },
      done: (response) => {
        toast.success("Success")
      },
      error: (error) => {
        toast.error(ActionableExceptionHandler(error).message)
      }
    })
  }

  return (
    <>
      <div
        className={classes.email_title}
      >
        We will send an activation email to your provided email.
      </div>
      <div
        className={classes.email_button}
        onClick={handleSendEmail}
      >
        Click here to receive email
      </div>
    </>
  )
}

export default SendEmailConfirmation