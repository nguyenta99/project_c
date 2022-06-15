import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProductResource from '../../resources/Product'
import PaperItem from '../../components/Paper/PaperItem'
import {
  Stack, useTheme, Grid, Typography, Paper, Table, TableContainer, TableBody, TableRow,
  TableCell, Chip, Tab, Tabs, Box, TableHead, Button
} from '@mui/material'
import { MainCard } from '../../components/Card'
import "react-image-gallery/styles/css/image-gallery.css";
import moment from 'moment'
import { styled } from '@mui/material/styles';
import FormModal from '../../components/Modal/FormModal'
import { ActionableExceptionHandler } from '../../utils'
import { RibbonContainer, RightCornerRibbon, LeftCornerRibbon } from "react-ribbons";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ProductInfo, ProductBuying } from './components'
import { peckPortalClient } from '../../Api'
import config from 'config'
import { IconDatabaseOff } from '@tabler/icons'
import 'moment/locale/vi'

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',
});

const schema = {
  amount: {
    presence: { allowEmpty: false, message: '^Required' },
  }
}

const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: 10
  },
  [theme.breakpoints.down("xl")]: {
    fontSize: 12
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 10
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: 8
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: 10
  }
}))

moment.locale('vn')

const ProductDetail = (props) => {
  const theme = useTheme()
  const params = useParams()
  const [products, setProducts] = useState([])
  const [productIds, setProductIds] = useState([])
  const [productCounts, setProductCounts] = useState({})
  const [history, setHistory] = useState([])

  useEffect(() => {
    const kind = params.id
    getProduct(kind)
    getBuyHistory()
  }, [params])

  useEffect(() => {
    if (productIds.length > 0) {
      getVariantCount()
    }
  }, [productIds])

  const getVariantCount = () => {
    peckPortalClient.get(`${config.peckPortalApi}/api/v1/variants`, {
      params: { count_products: productIds }
    }).then(response => {
      setProductCounts(response.data)
    })
  }

  const getBuyHistory = () => {
    peckPortalClient.get(`${config.peckPortalApi}/api/v1/get_trading_history`).then(response => {
      setHistory(response.data.data)
    })
  }

  const getProduct = (kind) => {
    ProductResource.loader.fetchItems({
      paging: { page: 0, perPage: 100 },
      filters: {
        kind: kind
      },
      done: (response, meta) => {
        setProducts([...response])
        setProductIds(response.map(product => product.id))
      },
      error: (error) => {
        toast.error("Fetch product error")
      }
    })
  }

  const handleBuy = (product) => {
    FormModal.show({
      title: "Mua hàng",
      maxWidth: 'xs',
      submitData: {
        product: product
      },
      schema: schema,
      contentSx: { minHeight: 300 },
      renderComponent: ({ submitData, handleChange }) => <ProductBuying submitData={submitData} handleChange={handleChange} />,
      action: {
        title: 'Mua',
        onSubmit: (submitData, handleChange, ctx) => {
          return new Promise((resolve, reject) => {
            ProductResource.loader.commitAction({
              id: submitData.values.product.id,
              data: {
                action_code: 'buy',
                action_data: {
                  amount: submitData.values.amount
                }
              },
              done: (response) => {
                resolve(response)
                toast.success("Mua hàng thành công")
                const kind = params.id
                getProduct(kind)
                getBuyHistory()
              },
              error: (error) => {
                reject(error)
                toast.error(ActionableExceptionHandler(error).message)
              }
            })
          })
        }
      }
    })
  }

  const infoProduct = (product) => {
    FormModal.show({
      title: "Thông tin sản phẩm",
      submitData: {},
      maxWidth: 'xs',
      submitData: product,
      contentSx: { minHeight: 300 },
      renderComponent: ({ submitData, handleChange }) => <ProductInfo submitData={submitData} handleChange={handleChange} />,
    })
  }

  return (
    <>
      <FormModal />
      <Grid container spacing={5}>
        {
          products.map((product, index) => (
            <Grid item xs={12} sm={4} md={3} key={index}
              sx={{
                cursor: 'pointer',
                transition: 'transform .2s',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              <RibbonContainer className="custom-class">
                <LeftCornerRibbon backgroundColor="#0088ff" color="#f0f0f0" fontFamily="Arial">
                  New
                </LeftCornerRibbon>
                <PaperItem
                  {...theme.typography.body2}
                  borderRadius={3}
                  height={150}
                >
                  <Stack direction={'column'}>
                    <div
                      style={{ height: 100 }}
                    >
                      <Grid container>
                        <Grid item xs={3} sm={3} md={3}>
                          <div
                            style={{
                              borderRadius: '50%',
                              width: 50,
                              height: 50,
                              border: `2px solid ${productCounts[product.id] ? theme.palette.primary.main : theme.palette.warning.dark}`,
                              marginTop: 15,
                              marginLeft: 15,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Typography
                              sx={{ fontWeight: 'bold', color: productCounts[product.id] ? theme.palette.primary.main: theme.palette.warning.dark, fontSize: 14 }}
                            >
                              {productCounts[product.id] || 0}
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={9} sm={9} md={9}>
                          <Stack direction={'column'}>
                            <Typography variant='h5'
                              sx={{ mt: 1, mb: 1, fontWeight: 'bold', textAlign: 'center', color: theme.palette.primary.main }}
                            >
                              {product.title}
                            </Typography>
                            <div style={{ marginBottom: 8 }}>
                              {
                                product.compare_price ?
                                  <Stack direction={'row'} spacing={1} paddingLeft={3} >
                                    <Typography variant='h5' sx={{ fontWeight: 'bold', color: theme.palette.primary.main, textDecoration: 'line-through' }}>
                                      {
                                        `${formatter.format(product.compare_price)}`
                                      }
                                    </Typography>
                                    <Typography variant='h5' color={'red'}>
                                      {'»'}
                                    </Typography>
                                    <Typography variant='h5' color={'red'} sx={{ fontWeight: 'bold' }}>
                                      {
                                        `${formatter.format(product.price)}`
                                      }
                                    </Typography>
                                  </Stack>
                                  :
                                  <Typography
                                    variant='h5'
                                  >
                                    {product.price}
                                  </Typography>
                              }
                            </div>
                          </Stack>
                        </Grid>
                      </Grid>
                    </div>
                    <div style={{ height: 50 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <StyledButton variant='outlined'
                            size='small'
                            sx={{ float: 'right', borderRadius: 4, }}
                            color='info'
                            startIcon={<InfoOutlinedIcon />}
                            onClick={() => infoProduct(product)}
                          >Thông tin</StyledButton>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                          <StyledButton variant='outlined'
                            size='small'
                            sx={{ borderRadius: 4 }}
                            startIcon={<ShoppingCartOutlinedIcon />}
                            onClick={() => handleBuy(product)}
                          >Mua ngay</StyledButton>
                        </Grid>
                      </Grid>
                    </div>
                  </Stack>
                </PaperItem>
              </RibbonContainer>
            </Grid>
          ))
        }
      </Grid>
      <Box sx={{ marginTop: 4 }}>
        <MainCard
          sx={{
            borderRadius: 2,
            marginTop: 2,
            minHeight: '10vh',
          }}
          contentSX={{
            paddingTop: 2
          }}
        >
          <Typography variant='h4' fontWeight={'bold'} marginBottom={2}>
            Lịch sử giao dịch
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableCell width={'15%'}><Typography variant='h5' fontWeight={'bold'}>Số ĐT</Typography></TableCell>
                <TableCell width={'40%'}><Typography variant='h5' fontWeight={'bold'}>Nội dung</Typography></TableCell>
                <TableCell width={'20%'}><Typography variant='h5' fontWeight={'bold'}>Số tiền</Typography></TableCell>
                <TableCell width={'25%'}><Typography variant='h5' fontWeight={'bold'}>Giao dịch lúc</Typography></TableCell>
              </TableHead>
              <TableBody>
                {
                  history.map((item, index) => {
                    return <TableRow key={index}>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell>{formatter.format(item.price)}</TableCell>
                      <TableCell>{moment(item.time).locale('vi').fromNow()}</TableCell>
                    </TableRow>
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
          {
            history.length == 0 &&
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
      </Box>
    </>
  )
}

export default ProductDetail