import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography, IconButton } from '@mui/material';

const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
  padding: 2
};

const ActionGenerator = (props) => {

  return (
    <>
      {
        props.actions ?
          <>
            {
              props.actions?.map((action, key) => (
                <IconButton
                  onClick={action.onClick}
                  key={key}
                  style={{
                    cursor: 'pointer',
                    width: 'auto',
                    borderRadius: 10,
                  }}
                >
                  {action.title()}
                </IconButton>
              ))
            }
          </>
          :
          <></>
      }
    </>
  )
}

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      variantTitle,
      actionHeaders,
      secondary,
      shadow,
      sx = {},
      title,
      customHeader,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 75,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
          },
          ...sx
        }}
      >
        {
          (customHeader || title) &&
          <>
            {
              customHeader ?
                customHeader
                :
                <>
                  {!darkTitle && title && <CardHeader sx={headerSX} title={title} action={<ActionGenerator actions={actionHeaders} />} />}
                  {darkTitle && title && (
                    <CardHeader sx={headerSX} title={<Typography variant={variantTitle || 'h3'}>{title}</Typography>} action={<ActionGenerator actions={actionHeaders} />} />
                  )}
                </>
            }
          </>
        }

        {(title || customHeader) && <Divider />}

        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

export default MainCard;
