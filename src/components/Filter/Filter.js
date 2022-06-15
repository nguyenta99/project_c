import React, { useEffect, useState } from 'react'
import {
  Drawer, Button, Box, Divider, Typography, IconButton, Grid,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import AsyncSelect from "react-select/async";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    border: "1px solid #999999",
    backgroundColor: "transparent !important",
    margin: '0 14px',
    textAlign: "center",
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    display: "none",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "rgba(0, 0, 0, 0.38)",
    fontSize: 14,
    paddingLeft: 4,
  }),
  input: (provided, state) => ({
    ...provided,
    paddingLeft: 4,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    paddingLeft: 4,
    fontSize: 14,
    color: "black",
  }),
  menu: (provided, state) => ({
    ...provided,
    maxWidth: '90%',
    marginLeft: 15,
    marginTop: 2,
    zIndex: 100,
  }),
  menuList: (provided, state) => ({
    ...provided,
    maxHeight: 200,
    textAlign: 'left'
  }),
};

const Filter = (props) => {
  const [value, setValue] = useState({
    right: props.right
  })

  useEffect(() => {
    setValue({ ...value, right: props.right })
  }, [props])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setValue({ ...value, [anchor]: open });
  };

  const loadOptions = (inputValue, loadingData) => {
    var result = loadingData(inputValue);
    return result;
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant='h3' padding={2}>Lọc</Typography>
            </Grid>
            <Grid item xs={6}>
              <IconButton sx={{ float: 'right', padding: 2 }}
                onClick={onClose}
              ><CloseIcon /></IconButton>
            </Grid>
            <Grid item xs={12} style={{ height: 'calc(100vh - 130px)', overflow: 'auto' }}>
              {props.filters && props.filters.map((options, index) => (
                <div key={index}>
                  <Typography
                    style={{
                      textAlign: "left",
                      padding: "5px 15px",
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{options.label}</span>
                  </Typography>
                  {options.childs.map((option, i) => {
                    if (option.type == "select") {
                      return (
                        <AsyncSelect
                          key={i}
                          cacheOptions
                          loadOptions={(inputValue) =>
                            loadOptions(inputValue, option.loadOptions)
                          }
                          defaultOptions
                          isClearable
                          name={option.name}
                          onChange={(value) => {
                            var e = {
                              target: {
                                name: option.name,
                                value
                              },
                            };
                            props.onChange(e)
                          }}
                          getOptionLabel={(item) => item.name}
                          getOptionValue={(item) => item.id}
                          valueKey={option.valueKey || "id"}
                          value={props.formState[option.name] || null}
                          styles={customStyles}
                        />
                      );
                    }
                  })}
                </div>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

      </Grid>
      <Grid container spacing={2}
        sx={{ position: 'absolute', bottom: 0, height: 60, borderTop: '1px solid #ccc', width: '100%' }}
      >
        <Grid item xs={6}>
          <Button
            color="primary"
            onClick={() => {
              // if (props.onSearch) {
              //   props.onSearch()
              // }
              onClose()
            }}
            variant="contained"
            sx={{ float: 'left', marginLeft: 2 }}
          >
            Lọc
          </Button>
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
    </Box>
  )

  const onClose = () => {
    if (props.onClose) {
      props.onClose()
    }
    toggleDrawer('right', false)
  }

  return (
    <React.Fragment key={'right'}>
      <Drawer
        anchor={'right'}
        open={props.right}
        onClose={onClose}
      >
        {list('right')}
      </Drawer>
    </React.Fragment>
  )
}

export default Filter