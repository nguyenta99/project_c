import React, { useEffect, useState } from 'react'
import { DatePicker, InputValue } from './SecuritySteps'
import InputProvider from '../../components/Input/InputProvider'
import SendEmailConfirmation from './SecuritySteps/SendEmailConfirmation'

const SecureRenderer = (props) => {
  const { step, currentStepIndex, onSetData } = props
  const [value, setValue] = useState(null)

  const handleChangeInput = (event) => {
    setValue(event.target.value)
    onSetData(event.target.name, event.target.value)
  } 

  return (
    <>
      {
        ['birthday'].includes(step.code) && 
        <DatePicker
          code={step.code}
          title={step.title}
          onSetData={onSetData}
        />
      }
      {
        ['phone'].includes(step.code) && 
        <InputProvider
          type='phone'
          label={'Phone provider'}
          name={step.code}
          fullWidth={true}
          placeholder={step.title}
          value={value || ''}
          onChange={handleChangeInput}
        />
      }
      {
        ['send_email'].includes(step.code) && 
        <SendEmailConfirmation
          type='phone'
          label={'Phone provider'}
          name={step.code}
          fullWidth={true}
          placeholder={step.title}
          value={value}
          onChange={handleChangeInput}
        />
      }
    </>
  )
}

export default SecureRenderer