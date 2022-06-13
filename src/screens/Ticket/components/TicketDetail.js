import React, { useEffect, useState } from 'react'
import PaperItem from '../../../components/Paper/PaperItem'
import { useTheme, Grid, Button, TextField, Box, Typography, Stack } from '@mui/material'
import TicketResource from '../../../resources/TicketResource'
import { IconBackspace } from '@tabler/icons'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import moment from 'moment'
import { ActionableExceptionHandler } from '../../../utils'

const TicketDetail = (props) => {
  const theme = useTheme()
  const [ticket, setTicket] = useState(null)
  const navigate = useNavigate()
  const params = useParams()
  const [comment, setComment] = useState(null)

  const getTicket = () => {
    if (params.id) {
      TicketResource.loader.fetchItem({
        id: params.id,
        params: {
          include: 'comments'
        },
        done: (response) => {
          setTicket(response)
        },
        error: (error) => {
          toast.error("Ticket không tồn tại")
        }
      })
    }
  }

  useEffect(() => {
    getTicket()
  }, [])

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const createComment = () => {
    if (ticket) {
      const action_data = {
        content: comment
      }

      TicketResource.loader.commitAction({
        id: ticket.id,
        data: {
          action_code: 'comment',
          action_data: action_data
        },
        done: (response) => {
          getTicket()
          toast.success("Comment thành công")
        },
        error: (error) => {
          toast.error(ActionableExceptionHandler(error).message)
        }
      })
    }
  }

  return (
    <>
      <PaperItem
        {...theme.typography.body2}
        color={theme.palette.text.secondary}
        borderRadius={3}
        sx={{ paddingBottom: 2, marginTop: 2 }}
      >
        <Grid container
          sx={{ paddingLeft: 2, paddingRight: 2 }}
          spacing={2}
        >
          <Grid item xs={12}>
            <Button
              variant='contained'
              size='small'
              onClick={() => navigate(-1)}
              sx={{ marginRight: 2 }}
            ><IconBackspace style={{ marginRight: 4 }} />{ticket?.code}</Button>
            {
              ticket &&
              moment(ticket.created_at).format('lll')
            }
          </Grid>
          {
            ticket && ticket.content &&
            <Grid item xs={12}>
              <Box
                sx={{ padding: 2, border: '2px dashed orange', backgroundColor: '#FCF4E9', borderRadius: 2 }}
              >
                <Typography>Nội dung: {ticket.content}</Typography>
              </Box>
            </Grid>
          }
          <Grid item xs={12}>
            <Stack>
              <TextField fullWidth
                onChange={handleChange}
                name='comment'
                rows={3}
                maxRows={5}
                placeholder='Để lại bình luận của bạn tại đây. Tối đa 200 kí tự.'
                multiline
                value={comment || ''}
                onKeyPress={(ev) => {
                  if (ev.key === 'Enter') {
                    ev.preventDefault();
                    createComment()
                  }
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </PaperItem>
    </>
  )
}

export default TicketDetail