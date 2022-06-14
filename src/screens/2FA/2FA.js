import React, { useState } from 'react'
import { TextField, Stack, Button } from '@mui/material'
import config from 'config'
import { peckPortalClient } from '../../api'
import { toast } from 'react-toastify'

const HaiFA = (props) => {
  const [text, setText] = useState(null)
  const [response, setResponse] = useState(null)
  const [token, setToken] = useState(null)

  const get2FA = () => {
    peckPortalClient.post(`${config.peckPortalApi}/api/v1/2fa`, 
      { text: text}
    ).then(response => {
      const token = response.data.token
      setResponse(text + "|" + token)
      setToken(token)
    })
  }



  return (
    <>
      <Stack spacing={2}>
        <TextField
          id={1}
          name={'text'}
          value={text || ''}
          onChange={(event) => setText(event.target.value)}
          multiline
          rows={3}
          maxRows={5}
          placeholder={'BK5V TVQ7 D2BG...'}
        />
        <div><Button variant='contained'
          onClick={get2FA}
        >Lấy mã 2FA</Button></div>
        <TextField
          id={2}
          name={'response'}
          value={response || ''}
          multiline
          rows={3}
          maxRows={5}
          placeholder={'ABC| 2FA Code'}
        />
        <div><Button variant='contained'
          onClick={() => {
            navigator.clipboard.writeText(token)
            toast.success("Copied")
          }}
        >Copy</Button></div>
      </Stack>
    </>
  )
}

export default HaiFA