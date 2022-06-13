import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider } from '@mui/material'
import validate from 'validate.js'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress';
import { DefaultApiErrorHandler } from '../../utils';

const instance = {}

export default class FormModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      config: {},
      submitData: {
        isValid: true,
        values: {},
        errors: {},
        isSubmiting: false,
      },
      submitting: false
    }
  }

  componentDidMount() {
    instance.current = this
  }

  show(config) {
    const submitData = Object.assign({}, this.state.submitData)
    if (config.submitData) {
      submitData['values'] = config.submitData,
        submitData['errors'] = {}
      submitData['isSubmiting'] = false
      submitData['isValid'] = true
    }
    this.setState({ open: true, config, submitData })
  }

  handleChange = (name, value) => {
    const submitData = Object.assign({}, this.state.submitData);
    submitData['values'][name] = value
    this.setState({ submitData })
  }

  handleClose = () => {
    this.setState({ open: false, config: {}, submitting: false })
  }

  handleSubmit = () => {
    const config = this.state.config
    const submitData = this.state.submitData

    submitData.errors = {}
    this.setState({ submitData })

    if (config.schema) {
      const errors = validate(this.state.submitData.values, config.schema)
      if (errors) {
        submitData.errors = errors
        this.setState({ submitData })
      }
    }

    if (this.state.submitData.errors && Object.keys(this.state.submitData.errors).length > 0) {
      Object.keys(this.state.submitData.errors).forEach(item => {
        toast.error(this.state.submitData.errors[item][0])
      })
    } else {
      this.setState({ submitting: true })
      if(config.action.onSubmit){
        config.action.onSubmit(submitData, this.handleChange, this).then(response => {
          this.handleClose()
        }).catch(error => {
          this.setState({ submitting: false })
        }) 
      }
    }
  }

  render() {
    const { open, config, submitData, submitting } = this.state

    return (
      <div>
        <Dialog
          open={open}
          // TransitionComponent={Transition(config.direction)}
          keepMounted
          onClose={this.handleClose}
          aria-describedby="alert-dialog"
          aria-labelledby="alert-dialog-title"
          sx={{
            zIndex: open ? 2000 : -1,
          }}
          maxWidth={config.maxWidth || 'md'}
          fullWidth
        >
          {
            config.title &&
            <DialogTitle id='alert-dialog-title'
              sx={{
                fontWeight: 'bold',
                fontSize: 16
              }}
            >
              {config.title}
            </DialogTitle>
          }
          <Divider />
          <DialogContent
            sx={config.contentSx}
          >
            {
              config.renderComponent &&
              config.renderComponent({
                submitData: submitData,
                handleChange: this.handleChange
              })
            }
          </DialogContent>
          <Divider />
          <DialogActions>
            {
              config.action &&
              <Button onClick={this.handleSubmit} variant='contained'>
                {
                  submitting ?
                    <CircularProgress size={22} color='success' />
                    :
                    <>{config.action?.title || 'OK'}</>
                }
              </Button>
            }
            <Button onClick={this.handleClose} sx={{ marginRight: 2 }}
              variant='outlined'
            >Huỷ</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

FormModal.show = (config) => {
  if (instance.current) {
    instance.current.show(config)
  }
}