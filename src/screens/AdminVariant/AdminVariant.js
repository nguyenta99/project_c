import React, { useEffect, useState } from 'react'
import {
  Grid, Stack, Typography, TableContainer, Table, TableBody, TableRow,
  TableCell, TableHead, Paper, Tooltip, TablePagination, Chip
} from '@mui/material'
import ToolBarAction from '../../components/ToolBarAction'
import PaperItem from '../../components/Paper/PaperItem'
import { useTheme } from '@mui/material'
import { styled } from '@mui/material'
import { MainCard } from '../../components/Card'
import { FormModal } from '../../components/Modal'
import { toast } from 'react-toastify'
import { tableCellClasses } from '@mui/material/TableCell';
import VariantResource from '../../resources/VariantResource'
import { VariantImport } from './components'
import { peckPortalClient } from '../../api'
import moment from 'moment'
import _ from 'lodash'
import { tooltipClasses } from '@mui/material/Tooltip';
import Filter from '../../components/Filter'
import { filters } from './filters'

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

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

const schema = {
  kind: {
    presence: { allowEmpty: false, message: '^Required' },
  },
  file: {
    presence: { allowEmpty: false, message: '^Required' },
  }
}

const AdminVariant = (props) => {
  const theme = useTheme()
  const [variants, setVariants] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [recordCount, setRecordCount] = useState(0)
  const [right, setRight] = useState(false)
  const [formFilters, setFormFilters] = useState({})

  const handleChangePage = (event, page) => {
    setCurrentPage(page)
  }

  const handleChangeRowsPerPage = (event) => {
    setPerPage(event.target.value)
  }

  useEffect(() => {
    getVariants()
  }, [currentPage, perPage, formFilters])

  const importVariants = () => {
    FormModal.show({
      title: "Product import",
      submitData: {},
      schema: schema,
      contentSx: { minHeight: 300 },
      renderComponent: ({ submitData, handleChange }) => <VariantImport submitData={submitData} handleChange={handleChange} />,
      action: {
        title: 'Import',
        onSubmit: (submitData, handleChange, ctx) => {
          return new Promise((resolve, reject) => {
            const formData = submitData.values
            const data = new FormData()
            data.append('file', formData.file)
            data.append('kind', formData.kind.id)
            peckPortalClient.post('/api/v1/variants/import_variants', data, {
              timeout: 10 * 60 * 1000 // 10 minutes
            }).then(response => {
              resolve(response)
              toast.success(`${response.data.imported} variants imported`)
              console.log(response)
            }).catch(error => {
              reject(error)
              toast.error("Import variant error")
            })
          })
        }
      }
    })
  }

  const getVariants = () => {
    const filters = {}
    Object.keys(formFilters).forEach(key => {
      if (formFilters[key]) {
        if (typeof formFilters[key] == 'object') {
          filters[key] = formFilters[key].id
        }
      }
    })
    VariantResource.loader.fetchItems({
      paging: { page: (currentPage || 1), perPage: perPage },
      params: {
        include: 'product'
      },
      filters: filters,
      done: (response, meta) => {
        setVariants(response)
        setRecordCount(meta['Record Count'])

      },
      error: (error) => {
        toast.error("Get variant error")
      }
    })
  }

  const renderStatus = (status) => {
    if (status == 'buyed') {
      return <Chip color='success' label={status} />
    } else if (status == 'active') {
      return <Chip color='info' label={status} />
    }
  }

  const handleChangeFilter = (event) => {
    const { name, value } = event.target;
    setFormFilters({ ...formFilters, [name]: value })
  }

  const handleDeleteFilter = (item) => {
    delete formFilters[item]
    setFormFilters({ ...formFilters })
  }

  return (
    <>
      <FormModal />
      <Filter
        right={right}
        onClose={(side, open) => setRight(false)}
        formState={formFilters}
        onChange={handleChangeFilter}
        onSearch={getVariants}
        // resetFilter={this.resetFilter}
        filters={filters}
      />
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
                Variants
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
                    text: 'Filters',
                    color: 'primary',
                    visible: true,
                    action: () => {
                      setRight(true)
                    },
                  },
                  {
                    text: 'Import',
                    color: 'primary',
                    visible: true,
                    action: () => {
                      importVariants()
                    },
                  }
                ]}
              />
            </div>
          </Grid>
          <Grid item xs={12} sx={{marginLeft: 2}}>
            <Stack direction={'row'} spacing={1}>
              {
                Object.keys(formFilters).map((item, index) => {
                  return <Chip size='small' label={item} onDelete={() => handleDeleteFilter(item)} key={index} />
                })
              }
            </Stack>
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
                  <StyledTableCell align="center" sx={{ width: '10%' }}>Account UID</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '6%' }}>Status</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '30%' }}>Info</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '20%' }}>Product</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '17%' }}>Created at</StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: '17%' }}>Updated at</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variants.map((row) => (
                  <StyledTableRow key={row.id} sx={{ cursor: 'pointer' }}
                  // onClick={() => newProduct(row)}
                  >
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.account_uid}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {renderStatus(row.status)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <HtmlTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">{row.info}</Typography>
                          </React.Fragment>
                        }
                      >
                        <div>{_(row.info).truncate(10)}</div>
                      </HtmlTooltip>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.product.title}</StyledTableCell>
                    <StyledTableCell align="center">{moment(row.created_at).format('ll')}</StyledTableCell>
                    <StyledTableCell align="center">{moment(row.updated_at).format('ll')}</StyledTableCell>
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

export default AdminVariant