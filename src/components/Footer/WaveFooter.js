import React from 'react'
import { useStyles } from './style'
import clsx from 'clsx'

const WaveFooter = (props) => {
  const classes = useStyles()

  return (
    <section className={classes.waveWrapper}>
      <div className={clsx(classes.wave, classes.wave1)}>

      </div>
      <div className={clsx(classes.wave, classes.wave2)}>

      </div>
      <div className={clsx(classes.wave, classes.wave3)}>

      </div>
    </section>
  )
}

export default WaveFooter