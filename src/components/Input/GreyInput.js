import React from 'react'
import { grey, blue } from '../../assets/constant'
import { useInput } from '@mui/base';
import { styled } from '@mui/system';
import { CssConstant } from '../../assets/constant';
import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material';

const useStyles = makeStyles(theme => ({
  ...CssConstant(theme)
}))

const StyledInputElement = styled('input')(
  ({ theme }) => ({
    fontSize: '0.875rem',
    fontFamily: "'Lexend Deca', sans-serif",
    fontWeight: 400,
    lineHeight: 2,
    color: 'white',
    background: grey[50],
    border: `1px ${grey[300]}`,
    borderRadius: 8,
    padding: "12px 12px",
    '&:hover': {
      background: grey[50],
      borderColor: grey[400],
    },
    '&:focus': {
      outline: 'none'
    },
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: 'white'
    }
  }),
);

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  const { getRootProps, getInputProps } = useInput(props, ref);
  const classes = useStyles()

  return (
    <div {...getRootProps()}>
      <StyledInputElement {...props} {...getInputProps()} />
      {props.error &&
        <span className={classes.errorText}>
          {
            props.erroricon
          }
          {props.error}
        </span>
      }
    </div>
  );
});

const GreyInput = (props) => {
  return (
    <CustomInput {...props} />
  )
}

export default GreyInput