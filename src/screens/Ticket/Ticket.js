import React, { useEffect, useState } from 'react'
import {
  Grid, Stack, Typography, Tab, Tabs, Box, TableContainer, Table, TableBody, TableRow,
  TableCell, TableHead, Paper, Switch
} from '@mui/material'
import ToolBarAction from '../../components/ToolBarAction'
import PaperItem from '../../components/Paper/PaperItem'
import { useTheme } from '@mui/material'
import { MainCard } from '../../components/Card'
import { FormModal } from '../../components/Modal'
import { TicketForm } from './components'
import { toast } from 'react-toastify'
import TicketResource from '../../resources/TicketResource'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const Ticket = (props) => {
  const theme = useTheme()
  const [tickets, setTickets] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getTickets()
  }, [])

  const newTicket = (product) => {
    FormModal.show({
      title: product ? 'Sửa ticket' : 'Ticket mới',
      submitData: product || {},
      renderComponent: ({ submitData, handleChange }) => <TicketForm submitData={submitData} handleChange={handleChange} />,
      action: {
        title: 'Tạo',
        onSubmit: (submitData, handleChange, ctx) => {
          const formData = submitData.values

          return new Promise((resolve, reject) => {
            TicketResource.loader.createItem({
              data: formData,
              done: (response) => {
                toast.success("Create ticket success")
                getTickets()
                resolve(true)
              },
              error: (error) => {
                toast.success("Create ticket error")
                resolve(false)
              }
            })
          })
        }
      }
    })
  }

  const getTickets = () => {
    TicketResource.loader.fetchItems({
      paging: { page: 1, perPage: 25 },
      done: (response) => {
        setTickets(response)
      },
      error: (error) => {
        toast.error("Get product error")
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
        sx={{ paddingBottom: 2 }}
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
                Quản lí ticket
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
                    text: 'Ticket mới',
                    color: 'primary',
                    visible: true,
                    action: () => {
                      newTicket()
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
            marginRight: 2,
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant='h5' fontWeight={'bold'}>Code</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant='h5' fontWeight={'bold'}>Nội dung</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant='h5' fontWeight={'bold'}>Trạng thái</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant='h5' fontWeight={'bold'}>Ngày tạo</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((row) => (
                  <TableRow key={row.id} sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/my_ticket/${row.id}`)}
                    hover
                  >
                    <TableCell align="center">{row.code}</TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <div dangerouslySetInnerHTML={{ __html: row.content }} />
                    </TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{moment(row.created_at).format('lll')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </MainCard>
      </PaperItem>
    </>
  )
}

export default Ticket