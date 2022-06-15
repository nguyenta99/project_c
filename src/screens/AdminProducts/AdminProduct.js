import React, { useEffect, useState } from 'react'
import {
  Grid, Stack, Typography, Tab, Tabs, Box, TableContainer, Table, TableBody, TableRow,
  TableCell, TableHead, Paper, Switch, TablePagination
} from '@mui/material'
import ToolBarAction from '../../components/ToolBarAction'
import PaperItem from '../../components/Paper/PaperItem'
import { useTheme } from '@mui/material'
import { styled } from '@mui/material'
import { MainCard } from '../../components/Card'
import { IconBrandProducthunt } from '@tabler/icons'
import { FormModal } from '../../components/Modal'
import { ProductForm } from './components'
import ProductResource from '../../resources/Product'
import { toast } from 'react-toastify'
import { tableCellClasses } from '@mui/material/TableCell';
import { ActionableExceptionHandler } from '../../utils'

const ProductTab = styled(Tab)(({ theme }) => ({
  minHeight: 50,
  color: theme.palette.primary.dark,
  fontWeight: 500
}))

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

const AdminProduct = (props) => {
  const theme = useTheme()
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [recordCount, setRecordCount] = useState(0)

  useEffect(() => {
    getProducts()
  }, [currentPage, perPage])

  const handleChangePage = (event, page) => {
    setCurrentPage(page)
  }

  const handleChangeRowsPerPage = (event) => {
    setPerPage(event.target.value)
  }

  const newProduct = (product) => {
    FormModal.show({
      title: product ? 'Edit' : 'Add product',
      submitData: product || {},
      renderComponent: ({ submitData, handleChange }) => <ProductForm submitData={submitData} handleChange={handleChange} />,
      action: {
        title: 'Create',
        onSubmit: (submitData, handleChange, ctx) => {
          const formData = submitData.values
          formData.kind = formData.kind.value
          return new Promise((resolve, reject) => {
            ProductResource.loader.createItem({
              data: formData,
              done: (response) => {
                toast.success("Create product success")
                getProducts()
                resolve(true)
              },
              error: (error) => {
                toast.success("Create product error")
                resolve(false)
              }
            })
          })
        }
      }
    })
  }

  const getProducts = () => {
    ProductResource.loader.fetchItems({
      paging: { page: (currentPage || 1), perPage: perPage },
      done: (response, meta) => {
        setProducts(response)
        setRecordCount(meta['Record Count'])
      },
      error: (error) => {
        toast.error("Get product error")
      }
    })
  }

  const handleUpdateActive = (row, event) => {
    const action_data = {
      active: event.target.checked
    }

    ProductResource.loader.commitAction({
      id: row.id,
      data: {
        action_code: 'update_active',
        action_data: action_data
      },
      done: (response) => {
        getProducts()
        toast.success("Update product success")
      },
      error: (error) => {
        toast.error(ActionableExceptionHandler(error).message)
      }
    })
  }

  return (
    <>
      <FormModal />
      <PaperItem
        {...theme.typography.body2}
        color={theme.palette.text.secondary}
        borderRadius={3}
      >
        <Grid container
          sx={{
            marginBottom: 2
          }}
        >
          <Grid item xs={3}>
            <Stack>
              <Typography variant='h4'
                sx={{
                  float: 'left',
                  marginLeft: 3,
                  marginTop: 2
                }}
              >
                Products
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={9}>
            <div
              style={{
                marginTop: 10,
                marginRight: 20,
                marginBottom: 10
              }}
            >
              <ToolBarAction
                rightActions={[
                  {
                    text: 'Add product',
                    color: 'primary',
                    visible: true,
                    action: () => {
                      newProduct()
                    },
                    sx: { marginRight: 1 }
                  }
                ]}
              />
            </div>
          </Grid>
        </Grid>
        <MainCard
          sx={{
            borderRadius: 3,
            minHeight: '40vh',
            marginLeft: 2,
            marginRight: 2
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Kind</StyledTableCell>
                  <StyledTableCell align="center">Title</StyledTableCell>
                  <StyledTableCell align="center">Price</StyledTableCell>
                  <StyledTableCell align="center">Compare Price</StyledTableCell>
                  <StyledTableCell align="center">Commitions</StyledTableCell>
                  <StyledTableCell align="center">Index</StyledTableCell>
                  <StyledTableCell align="center">Active</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <StyledTableRow key={row.id} sx={{ cursor: 'pointer' }}
                    onClick={() => newProduct(row)}
                  >
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.kind}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.title}</StyledTableCell>
                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                    <StyledTableCell align="center">{row.compare_price}</StyledTableCell>
                    <StyledTableCell align="center">{(row.commitions || []).join(",")}</StyledTableCell>
                    <StyledTableCell align="center">{row.index}</StyledTableCell>
                    <StyledTableCell align="center"><Switch checked={row.active} onClick={(event) => {
                      event.stopPropagation()
                      handleUpdateActive(row, event)
                    }} /></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 50, 100]}
            component="div"
            count={recordCount}
            rowsPerPage={perPage}
            page={currentPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </MainCard>
      </PaperItem>
    </>
  )
}

export default AdminProduct