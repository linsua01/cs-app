import { useWeb3React } from '@web3-react/core'
import { createContext, useEffect, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { tokensInfo } from '../constants/tokens'
import { getTokenBalance, getTokenPrice } from '../services/tokenSet'
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

  useEffect(() => {
    async function getBalance(contract: string, index: number) {
      const balance = await getTokenBalance(
        library,
        chainId || 0,
        contract,
        account || '',
      )
      const price = await getTokenPrice(
        library,
        chainId || 0,
        contract,
      )


      if (balance)

        setTokens((tokens) => (

          tokens.map((token, i) => {


            return {
              ...token,
              amount: i === index ? formatEther(BigNumber.from(balance).toString()) : token.amount,
              price: i === index ? Number(formatEther(BigNumber.from(price).toString())) : token.price,
              balance: i === index ? Number(formatEther(BigNumber.from(balance).toString())) * Number(formatEther(BigNumber.from(price).toString())) : token.balance
            }
          })))
    }

    tokens?.map((token, i) => {
      getBalance(token.contractPolygon, i)
    })

  }, [account, library, chainId])

  useEffect(() => {
    let balance = 0
    tokens?.map((token, i) => {
      balance = balance + (token.price * Number(token.amount))
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
