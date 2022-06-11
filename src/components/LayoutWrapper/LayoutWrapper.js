import { styled } from '@mui/material/styles';

export const LayoutWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  minHeight: '100vh'
}));
