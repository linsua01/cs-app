import { useWeb3React } from '@web3-react/core'
import { createContext, useEffect, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { tokensInfo } from '../constants/tokens'
import { getTokenBalance } from '../services/tokenSet'
import { formatEther } from '@ethersproject/units'

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
  const [amount, setAmount] = useState('x')

  useEffect(() => {

    async function getBalance(contract: string) {
      const balance = await getTokenBalance(library, chainId || 0, contract, account || '')
      console.log(formatEther(BigNumber.from(balance).toString()))
    }

    setTokens(
      tokens?.map((token, i) => {
        getBalance(token.contractPolygon)
        // return { ...token, balance: token.price * token.amount }
        return { ...token, balance: 0 }
      }),
    )
  }, [account, library, chainId])


  useEffect(() => {
    let balance = 0
    tokens?.map((token, i) => {
      // balance = balance + (token.price * token.amount) 
      balance = balance + (0) 
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
