import { useWeb3React } from '@web3-react/core'
import { createContext, useEffect, useState } from 'react'
import { tokensInfo } from '../constants/tokens'
import { activeTokensFrom } from '../constants/tokenSet'
import {
  getAmountInToIssueExactSet,
  getEstimatedIssueSetAmount,
  getTokenBalance,
  getTokenPrice,
  issueExactSetFromToken
} from '../services/tokenSet'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther, formatUnits, parseUnits } from '@ethersproject/units'
import { coingeckoGetTokenPrice } from '../services/coingeckoApi'

interface SwapResultValues {
  amountFrom: string
  amountTo: string
  activeFocus: string
  action: string
  labelFrom: string
  labelTo: string
}

const swapResultInitial = {
  amountFrom: '0',
  amountTo: '0',
  activeFocus: 'From',
  action: 'Invest',
  labelFrom: 'From',
  labelTo: 'To'
}

interface SwapContextValues {
  activeTokenFrom: any
  setActiveTokenFrom: any
  activeTokenTo: any
  setActiveTokenTo: any
  swapResult: SwapResultValues
  setSwapResult: any
  handleInvest: any
}

export const SwapContext = createContext<SwapContextValues>({
  activeTokenFrom: null,
  setActiveTokenFrom: null,
  activeTokenTo: null,
  setActiveTokenTo: null,
  swapResult: swapResultInitial,
  setSwapResult: null,
  handleInvest: null
  
})

export const SwapProvider: React.FC<any> = ({ children }) => {
  const { account, library, chainId } = useWeb3React()
  const [activeTokenFrom, setActiveTokenFrom] = useState(activeTokensFrom[0])
  const [activeTokenTo, setActiveTokenTo] = useState(tokensInfo[0])
  const [swapResult, setSwapResult] = useState<SwapResultValues>(swapResultInitial)
 
  const handleInvest = async () => {
    // console.log(activeTokenTo.contractPolygon,
    //      activeTokenFrom.contractPolygon,
    //      parseUnits(swapResult.amountTo,'18').toString(),
    //      parseUnits('1','16').toString())
    await issueExactSetFromToken(
      library,
      chainId || 0,
      account || '',
      activeTokenTo.contractPolygon,
      activeTokenFrom.contractPolygon,
      parseUnits(swapResult.amountTo,'18').toString(),
      parseUnits('1','16').toString()
    )
  }

  // COMBO FROM CHANGE
  useEffect(() => {
    async function updateTokenFrom(token: any) {
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
    updateTokenFrom(activeTokenFrom)
  }, [activeTokenFrom.id])


  // COMBO FROM CHANGE
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
    async function updateSwapResult() {
      const result = await getEstimatedIssueSetAmount(
        library,
        chainId || 0,
        activeTokenTo.contractPolygon,
        activeTokenFrom.contractPolygon,
        parseUnits(swapResult.amountFrom, activeTokenFrom.decimals).toString(),
      )
      const amountTo = Number(formatUnits(result,'18')).toFixed(4).toString()
      
      setSwapResult({...swapResult, amountTo})
      console.log('Change From! ', amountTo)
    }

    if (Number(swapResult.amountFrom) > 0 && swapResult.activeFocus == 'From')
      updateSwapResult()

  }, [swapResult.amountFrom, activeTokenFrom.id])

  useEffect(() => {
    async function updateSwapResult() {
      const result = await getAmountInToIssueExactSet(
        library,
        chainId || 0,
        activeTokenTo.contractPolygon,
        activeTokenFrom.contractPolygon,
        parseUnits(swapResult.amountTo, '18').toString(),
      )
      const amountFrom = Number(formatUnits(result,activeTokenFrom.decimals)).toFixed(4).toString()
      
      setSwapResult({...swapResult, amountFrom})
      console.log('Change To! ', amountFrom)
    }

    if (Number(swapResult.amountTo) > 0 && swapResult.activeFocus == 'To')
      updateSwapResult()

  }, [swapResult.amountTo, activeTokenTo.id])

  useEffect(() => {
    swapResult.action == 'Invest' ?
      setSwapResult({...swapResult, labelFrom: 'From', labelTo: 'To'}) :
      setSwapResult({...swapResult, labelFrom: 'To', labelTo: 'From'})
  }, [swapResult.action])

  return (
    <SwapContext.Provider
      value={{
        activeTokenFrom: activeTokenFrom,
        setActiveTokenFrom: setActiveTokenFrom,
        activeTokenTo: activeTokenTo,
        setActiveTokenTo: setActiveTokenTo,
        swapResult: swapResult,
        setSwapResult: setSwapResult,
        handleInvest: handleInvest
      }}
    >
      {children}
    </SwapContext.Provider>
  )
}
