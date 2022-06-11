import { makeStyles } from '@mui/styles'
import wave from '../../assets/images/wave.png'

export const useStyles = makeStyles({
  waveWrapper: {
    position: 'fixed',
    height: 100,
    bottom: 0,
    left: 0,
    width: '100%'
  },
  wave: {
    width: '100%',
    height: 100,
    backgroundImage: `url(${wave})`,
    backgroundSize: '1000px 100px',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  wave1: {
    animation: '$animate1 30s linear infinite',
    zIndex: 1000,
    opacity: 0.1,
    animationDelay: '0s',
    bottom: 0
  },
  "@keyframes animate1": {
    "0%": {
      backgroundPositionX: 0
    },
    "100%": {
      backgroundPositionX: 1000
    }
  },
  wave2: {
    animation: '$animate2 15s linear infinite',
    zIndex: 999,
    opacity: 0.15,
    animationDelay: '-5s',
    bottom: 0
  },
  "@keyframes animate2": {
    "0%": {
      backgroundPositionX: 0
    },
    "100%": {
      backgroundPositionX: 1000
    }
  },
  wave3: {
    animation: '$animate3 30s linear infinite',
    zIndex: 998,
    opacity: 0.2,
    animationDelay: '-2s',
    bottom: 0
  },
  "@keyframes animate3": {
    "0%": {
      backgroundPositionX: 0
    },
    "100%": {
      backgroundPositionX: 1000
    }
  },
})