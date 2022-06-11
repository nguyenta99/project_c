import React from 'react'
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { green } from '../../assets/constant'
import CircularProgress from '@mui/material/CircularProgress';

const CustomButton = styled('button')`
  font-family: 'Lexend Deca', sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${green[100]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${green[200]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${green[200]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CustomDefaultButton = (props) => {
  return (
    <ButtonUnstyled
      {...props}
      component={CustomButton}
    >
      { props.loading ? <CircularProgress size={20} /> : props.children}
    </ButtonUnstyled>
  )
}

export default CustomDefaultButton