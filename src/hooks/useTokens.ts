import { useContext } from 'react'

import { TokensContext } from '../contexts/TokensContext'

const useTokens = () => {
  return { ...useContext(TokensContext) }
}

export default useTokens
