import React from 'react'

import { Web3ReactProvider } from '@web3-react/core'

import { getLibrary } from './services/web3Utils'
import { TokensProvider } from './contexts/TokensContext'

const Providers: React.FC = ({ children }) => (
  <Web3ReactProvider getLibrary={getLibrary}>
    <TokensProvider>{children}</TokensProvider>
  </Web3ReactProvider>
)
export default Providers
