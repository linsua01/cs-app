import { useWeb3React } from '@web3-react/core'
import { createContext, useEffect, useState } from 'react'
import { tokensInfo } from '../constants/tokens'
import { getTokenBalance } from '../services/tokenSetSDK'

interface TokenContextValues {
  name: string | null | undefined
  symbol: string
  image: string
  fee: string
  contractPolygon: string
  price: any
  amount: any
  balance: any
}

interface TokensContextValues {
  tokens?: TokenContextValues[]
  balance?: any
  setTokens?: any
}

export const TokensContext = createContext<TokensContextValues>({})

export const TokensProvider: React.FC<any> = ({ children }) => {
  const { account, library, chainId } = useWeb3React()
  const [tokens, setTokens] = useState(tokensInfo)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    setTokens(
      tokens?.map((token, i) => {
        return { ...token, balance: token.price * token.amount }
      }),
    )
  }, [account, library, chainId])


  useEffect(() => {
    let balance = 0
    tokens?.map((token, i) => {
      balance = balance + (token.price * token.amount) 
    })
    setBalance(balance)
  }, [tokens])


  return (
    <TokensContext.Provider
      value={{
        tokens: tokens,
        balance: balance,
        setTokens: setTokens,
      }}
    >
      {children}
    </TokensContext.Provider>
  )
}
