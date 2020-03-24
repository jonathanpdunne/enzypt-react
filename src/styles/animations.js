import { keyframes } from 'react-emotion'

export const fromTop = keyframes`
  from, 0% {
    transform: translateY(-1000px);
  }
  50% {
    transform: translateY(0);
  }
  60% {
    transform: translateY(-10px);
  }
  to, 100% {
    transform: translateY(0);
  }
`

export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const trippy = keyframes`
  0% {
    color: #05ffa1;
  }
  25% {
    color: #ff71ce;
  }
  50% {
    color: #b967ff;
  }
  75% {
    color: #01cdfe;
  }
  100% {
    color: #fffb96;
  }
`
