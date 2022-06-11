import React, { useContext } from 'react'
import PaperItem from '../../components/Paper/PaperItem'
import { Typography, useTheme, Stack, Grid } from '@mui/material'
import { MainCard } from '../../components/Card'
import vcb from '../../assets/images/vcb.jpeg'
import AppContext from '../../AppContext'

const LoadMoney = (props) => {
  const theme = useTheme()
  const context = useContext(AppContext)
  console.log(context)

  return (
    <>
      <PaperItem
        {...theme.typography.body2}
        color={theme.palette.text.secondary}
        borderRadius={3}
        sx={{paddingBottom: 2}}
      >
        <Grid container
          sx={{ marginBottom: 2 }}
        >
          <Grid item xs={8}>
            <Stack>
              <Typography variant='h4'
                sx={{
                  float: 'left',
                  marginLeft: 3,
                  marginTop: 2
                }}
              >
                Nạp tiền tự động
              </Typography>
            </Stack>
          </Grid>
        </Grid>
        <MainCard
          sx={{
            borderRadius: 3,
            marginLeft: 2,
            marginRight: 2,
            borderStyle: 'dashed',
            border: 2,
            backgroundColor: theme.palette.success.light,
            marginBottom: 2
          }}
        >
          <Stack spacing={1}>
            <Typography color={theme.palette.error.main} fontWeight='bold' fontSize={16}>Vui lòng nhập đúng nội dung bắt buộc chuyển khoản bên dưới!</Typography>
            <Typography color={theme.palette.error.main} fontWeight='bold' fontSize={16}>Chuyển sai nội dung sẽ bị trừ 20% tiền nạp và không được nhận khuyến mãi (nếu có)!</Typography>
            <Typography color={theme.palette.error.main} fontWeight='bold' fontSize={16}>Dùng ngân hàng khác chuyển sang Vietcombank vẫn được (chuyển nhanh 24/7)!</Typography>
            <Typography color={theme.palette.error.main} fontWeight='bold' fontSize={16}>Sau khi chuyển tiền, tài khoản sẽ được tính nạp tiền sau ít phút!</Typography>
            <Typography color={theme.palette.error.main} fontWeight='bold' fontSize={16}>Nạp đủ số tiền sử dụng, số dư sẽ không được hoàn dưới mọi hình thức!</Typography>
            {/* <Typography color={theme.palette.error.main} fontWeight='bold' fontSize={16}>Hạn chế nạp tiền!</Typography> */}
          </Stack>
        </MainCard>
        <MainCard
          sx={{
            borderRadius: 3,
            marginLeft: 2,
            marginRight: 2,
          }}
        >
          <Grid container >
            <Grid item xs={4}>
              <MainCard
                sx={{
                  borderRadius: 3,
                  marginLeft: 1,
                  marginRight: 2,
                  borderStyle: 'dashed',
                  border: 1,
                  backgroundColor: theme.palette.success.light,
                }}
              >
                <img src={vcb} width='100%' />
              </MainCard>
            </Grid>
            <Grid item xs={8}>
              <Stack spacing={2}>
                <Typography variant='h3'>CHỦ TÀI KHOẢN: LE THANH TRUNG</Typography>
                <Typography variant='h3'>SỐ TÀI KHOẢN: 0851000033582</Typography>
                <Typography variant='h3'>NỘI DUNG CHUYỂN KHOẢN: {context.currentUser.code}</Typography>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </PaperItem>
    </>
  )
}

export default LoadMoney