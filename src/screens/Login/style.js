import { CssConstant } from "../../assets/constant/constant"
import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles( theme => ({
  ...CssConstant(theme),
  root: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#224957',
    position: 'relative',
    overflow: 'auto'
  },
  formWrapper: {
    width: 430,
    height: 'auto',
    margin: 'auto',
  },
  formWrapperContent: {
    paddingTop: '35%'
  },
  titleWrapper: {
    width: '100%',
    height: 'auto',
    paddingBottom: 30
  },
  title: {
    color: 'white',
    fontSize: 64,
    fontWeight: 400,
    textAlign: 'center',
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    paddingBottom: 30
  },
  textfieldWrapper: {
    width: '94%'
  },
  input: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 30
  },
  extraWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 30
  },
  rememberMe: {
    width: '50%'
  },
  rememberTitle: {
    color: 'white'
  },
  rememberCheckbox: {
    outline: 'none',
    border: 'none',
  },
  forgotTitle: {
    color: '#20DF7F',
    float: 'right',
    paddingTop: 8,
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  forgotPassword: {
    width: '50%'
  },
  submitButton: {
    width: '100%'
  },
  waveFooter: {
    height: 100,
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  registerTitle: {
    position: 'absolute',
    top: 15,
    right: 30
  },
  registerContent: {
    color: '#20DF7F',
    fontSize: 13,
    textDecoration: 'underline',
    textDecorationColor: '#20DF7F',
    cursor: 'pointer',
    '&:hover': {
      color: '#00ff7f'
    }
  }
}))