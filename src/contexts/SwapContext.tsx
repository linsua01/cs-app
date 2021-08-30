import { useWeb3React } from '@web3-react/core'
import { createContext, useEffect, useState } from 'react'
import { tokensInfo } from '../constants/tokens'
import { activeTokensFrom } from '../constants/tokenSet'
import {
  getEstimatedIssueSetAmount,
  getTokenBalance,
  getTokenPrice,
} from '../services/tokenSet'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import { coingeckoGetTokenPrice } from '../services/coingeckoApi'

interface SwapContextValues {
  activeTokenFrom: any
  setActiveTokenFrom: any
  activeTokenTo: any
  setActiveTokenTo: any
  amountFrom: any
  setAmountFrom: any
  amountTo: any
  setAmountTo: any
}

export const SwapContext = createContext<SwapContextValues>({
  activeTokenFrom: null,
  setActiveTokenFrom: null,
  activeTokenTo: null,
  setActiveTokenTo: null,
  amountFrom: null,
  setAmountFrom: null,
  amountTo: null,
  setAmountTo: null,
})

export const SwapProvider: React.FC<any> = ({ children }) => {
  const { account, library, chainId } = useWeb3React()
  const [activeTokenFrom, setActiveTokenFrom] = useState(activeTokensFrom[0])
  const [activeTokenTo, setActiveTokenTo] = useState(tokensInfo[0])
  const [amountFrom, setAmountFrom] = useState('0')
  const [amountTo, setAmountTo] = useState('0')

  useEffect(() => {
    async function getBalance(token: any) {
      const balance = await getTokenBalance(
        library,
        chainId || 0,
        token.contractPolygon,
        account || '',
      )

      const price = await coingeckoGetTokenPrice(token.contract)

      if (balance)
        setActiveTokenFrom({
          ...activeTokenFrom,
          balance: formatEther(BigNumber.from(balance).toString()),
          price: price.toString(),
        })
    }
    getBalance(activeTokenFrom)
    setAmountFrom('0')
  }, [activeTokenFrom.id])

  useEffect(() => {
    async function getBalance(contract: string) {
      const balance = await getTokenBalance(
        library,
        chainId || 0,
        contract,
        account || '',
      )

      const price = await getTokenPrice(library, chainId || 0, contract)

      if (balance)
        setActiveTokenTo({
          ...activeTokenTo,
          balance: Number(formatEther(BigNumber.from(balance).toString())),
          price: Number(formatEther(BigNumber.from(price).toString())),
        })
    }
    getBalance(activeTokenTo.contractPolygon)
  }, [activeTokenTo.id])

  useEffect(() => {
    async function updateSwapInfo() {
      const amountTo = await getEstimatedIssueSetAmount(
        library,
        chainId || 0,
        activeTokenTo.contractPolygon,
        activeTokenFrom.contractPolygon,
        amountFrom,
      )
      console.log(amountTo)
      //setAmountTo(amountTo)
    }

    updateSwapInfo()
  }, [amountFrom])

  return (
    <SwapContext.Provider
      value={{
        activeTokenFrom: activeTokenFrom,
        setActiveTokenFrom: setActiveTokenFrom,
        activeTokenTo: activeTokenTo,
        setActiveTokenTo: setActiveTokenTo,
        amountFrom: amountFrom,
        setAmountFrom: setAmountFrom,
        amountTo: amountTo,
        setAmountTo: setAmountTo,
      }}
    >
      {children}
    </SwapContext.Provider>
  )
}
