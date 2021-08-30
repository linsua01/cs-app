import { useContext } from 'react'

import { SwapContext } from '../contexts/SwapContext'

const useSwap = () => {
  return { ...useContext(SwapContext) }
}

export default useSwap
