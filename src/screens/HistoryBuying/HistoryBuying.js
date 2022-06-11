import React, { useEffect, useState } from 'react'
import {
  Grid, Stack, Typography, TableContainer, Table, TableBody, TableRow,
  TableCell, TableHead, Paper, Tooltip, TablePagination
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
import { peckPortalClient } from '../../api'
import moment from 'moment'
import _ from 'lodash'
import { tooltipClasses } from '@mui/material/Tooltip';
import { ProductFilter, Search } from './components'
import { IconDatabaseOff } from '@tabler/icons'
import { IconCopy } from '@tabler/icons'

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

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});

const schema = {
  kind: {
    presence: { allowEmpty: false, message: '^Required' },
  },
  file: {
    presence: { allowEmpty: false, message: '^Required' },
  }
}

const HistoryBuying = (props) => {
  const theme = useTheme()
  const [variants, setVariants] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [perPage, setPerPage] = useState(25)
  const [recordCount, setRecordCount] = useState(0)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    getVariants()
  }, [])

  const handleChangePage = (event, page) => {
    setCurrentPage(page)
  }

  const handleChangeRowsPerPage = (event) => {
    setPerPage(event.target.value)
  }

  useEffect(() => {
    getVariants()
  }, [currentPage, perPage, filters])

  const getVariants = () => {
    VariantResource.loader.fetchItems({
      paging: { page: (currentPage || 1), perPage: perPage },
      filters: filters,
      params: {
        include: 'product'
      },
      done: (response, meta) => {
        setVariants(response)
        setRecordCount(meta['Record Count'])

      },
      error: (error) => {
        toast.error("Get variant error")
      }
    })
  }

  const onDeleteFilter = (name) => {
    delete filters[name]
    setFilters({ ...filters })
  }

  const updateFilters = ({ name, value }) => {
    filters[name] = value
    setFilters({ ...filters })
  }

  const exportVariants = () => {
    VariantResource.loader.fetchItems({
      paging: { page: (currentPage || 1), perPage: perPage },
      filters: filters,
      params: {
        include: 'product',
        export: true
      },
      download: {
        name: `Tai_khoan_da_mua.csv`
      },
      done: (response, meta) => {
        toast.success("Export thành công")
      },
      error: (error) => {
        toast.error("Export thất bại")
      }
    })
  }

  const onCopy = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied")
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
          <Grid item xs={9}>
            <Typography variant='h4'
              sx={{
                float: 'left',
                marginLeft: 3,
                marginTop: 2
              }}
            >
              Tài khoản đã mua
            </Typography>
          </Grid>
          <Grid item xs={3}>
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
                    text: 'Tải về',
                    color: 'primary',
                    visible: true,
                    action: () => {
                      exportVariants()
                    },
                  }
                ]}
              />
            </div>
          </Grid>
        </Grid>
        <Grid container sx={{ marginLeft: 1 }} spacing={1}>
          <Grid item>
            <Search
              value={filters.search}
              updateFilters={updateFilters}
              onDeleteFilter={onDeleteFilter}
            />
          </Grid>
          <Grid item>
            <ProductFilter
              value={filters.search}
              updateFilters={updateFilters}
              onDeleteFilter={onDeleteFilter}
            />
          </Grid>
        </Grid>
        <MainCard
          sx={{
            borderRadius: 3,
            minHeight: '40vh',
          }}
          border={false}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: '15%' }}>
                    <Typography variant='h5' fontWeight={'bold'}>Account UID</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ width: '35%' }}>
                    <Typography variant='h5' fontWeight={'bold'}>Thông tin tài khoản</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ width: '20%' }}>
                    <Typography variant='h5' fontWeight={'bold'}>Sản phẩm</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ width: '10%' }}>
                    <Typography variant='h5' fontWeight={'bold'}>Giá</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ width: '20%' }}>
                    <Typography variant='h5' fontWeight={'bold'}>Ngày mua</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  variants.length > 0 &&
                  variants.map((row) => (
                    <TableRow key={row.id} sx={{ cursor: 'pointer' }}
                    // onClick={() => newProduct(row)}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {row.account_uid}
                      </TableCell>
                      <TableCell align="center">
                        <HtmlTooltip
                          title={
                            <React.Fragment>
                              <Typography color="inherit">{row.info}</Typography>
                            </React.Fragment>
                          }
                        >
                          <div><IconCopy onClick={() => onCopy(row.info)} />{_(row.info).truncate(60)}</div>
                        </HtmlTooltip>
                      </TableCell>
                      <TableCell align="center">{row.product.title}</TableCell>
                      <TableCell align="center">{formatter.format(row.product.price)}</TableCell>
                      <TableCell align='center'>{row.buyed_at && moment(row.buyed_at).format('lll')}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
            {
              variants.length > 0 &&
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                component="div"
                count={recordCount}
                rowsPerPage={perPage}
                page={currentPage}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            }
          </TableContainer>
          {
            variants.length == 0 &&
            <div style={{ width: '100%', marginTop: 20 }}>
              <Stack direction={'column'}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <IconDatabaseOff size={40} />
                <Typography>No data</Typography>
              </Stack>
            </div>
          }
        </MainCard>
      </PaperItem>
    </>
  )
}

export default HistoryBuying