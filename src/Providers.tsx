import React from 'react'

import { Web3ReactProvider } from '@web3-react/core'

import { getLibrary } from './services/web3Utils'
import { TokensProvider } from './contexts/TokensContext'
import { SwapProvider } from './contexts/SwapContext'

const Providers: React.FC = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <TokensProvider>
      <SwapProvider>
        {children}
      </SwapProvider>
    </TokensProvider>
  </Web3ReactProvider>
)
export default Providers
