import React, { useCallback, useState } from 'react'
import { useWeb3React, Web3ReactProvider } from '@web3-react/core'
import { injected, walletconnect, walletlink } from '../../services/connectors'

import WalletContext from './WalletContext'

const WalletProvider: React.FC = ({ children }) => {
  const [connector, setConnector] = useState<string>('')
  const [status, setStatus] = useState('disconnected')
  const [isShowingWalletModal, setIsShowingWalletModal] = useState<boolean>(
    false
  )
  const [isMetamaskConnected, setIsMetamaskConnected] = useState<boolean>(false)
  const { account, activate, active, deactivate } = useWeb3React()

  const reset = useCallback(() => {
    if (active) deactivate()

    setConnector('')
    setStatus('disconnected')
    localStorage.removeItem('walletconnect')
  }, [active, deactivate])

  const connect = useCallback(
    async (walletType: string) => {
      try {
        reset()
        setConnector(walletType)
        setStatus('connecting')

        if (walletType === 'injected') {
          await activate(injected, undefined, true)
          setStatus('connected')
          setIsMetamaskConnected(true)
        } else if (walletType === 'walletconnect') {
          await activate(walletconnect, undefined, true)
          setStatus('connected')
        } else if (walletType === 'walletlink') {
          await activate(walletlink, undefined, true)
          setStatus('connected')
        }
      } catch (err) {
        console.log(err)
      }
    },
    [activate, reset]
  )

  const { library: ethereum } = useWeb3React()

  const onOpenWalletModal = useCallback(() => {
    setIsShowingWalletModal(true)
  }, [setIsShowingWalletModal])

  const onCloseWalletModal = useCallback(() => {
    setIsShowingWalletModal(false)
  }, [setIsShowingWalletModal])

  return (
    <WalletContext.Provider
      value={{
        account,
        connector,
        ethereum,
        status,
        isShowingWalletModal,
        isMetamaskConnected,
        connect,
        reset,
        onOpenWalletModal,
        onCloseWalletModal,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

interface UseWalletProviderWrapperPropTypes {
  children: any
}

function UseWalletProviderWrapper(props: UseWalletProviderWrapperPropTypes) {
  return (
    <Web3ReactProvider getLibrary={(ethereum) => ethereum}>
      <WalletProvider {...props} />
    </Web3ReactProvider>
  )
}

export default UseWalletProviderWrapper
