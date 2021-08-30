import { useWeb3React } from '@web3-react/core'
import { createContext, useEffect, useState } from 'react'
import { tokensInfo } from '../constants/tokens'
import { activeTokensFrom } from '../constants/tokenSet'
import { getTokenBalance } from '../services/tokenSet'
import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'

interface SwapContextValues {
    activeTokenFrom: any,
    setActiveTokenFrom: any
    activeTokenTo: any,
    setActiveTokenTo: any
}

export const SwapContext = createContext<SwapContextValues>({
    activeTokenFrom: null,
    setActiveTokenFrom: null,
    activeTokenTo: null,
    setActiveTokenTo: null
})

export const SwapProvider: React.FC<any> = ({ children }) => {
    const { account, library, chainId } = useWeb3React()
    const [activeTokenFrom, setActiveTokenFrom] = useState(activeTokensFrom[0])
    const [activeTokenTo, setActiveTokenTo] = useState(tokensInfo[0])

    useEffect(() => {

        async function getBalance(contract: string) {
          
            const balance = await getTokenBalance(
            library,
            chainId || 0,
            contract,
            account || '',
          )
        
          if (balance)
            setActiveTokenFrom({...activeTokenFrom, balance: formatEther(BigNumber.from(balance).toString()) })
        }

        getBalance(activeTokenFrom.contractPolygon)

      }, [activeTokenFrom.id])


    return (
        <SwapContext.Provider
            value={{
                activeTokenFrom: activeTokenFrom,
                setActiveTokenFrom: setActiveTokenFrom,
                activeTokenTo: activeTokenTo,
                setActiveTokenTo: setActiveTokenTo
            }}
        >
            {children}
        </SwapContext.Provider>
    )
}