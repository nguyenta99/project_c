import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { MainCard } from '../../components/Card';
import React from 'react';

const MainCardWrapper = ({ children, ...other }) => (
  <MainCard
    sx={{
      maxWidth: { xs: 800, lg: 475 },
      minWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

MainCardWrapper.propTypes = {
  children: PropTypes.node
};

export default MainCardWrapper;
