import React from 'react'
import { Web3Provider } from '@ethersproject/providers'

import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected} from '@web3-react/injected-connector'
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'

import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { formatEther  } from '@ethersproject/units'


export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

export function getErrorMessage(error: Error) {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}

export function getNetworkName(id: number) {
  switch (id) {
    case 1: {
      return 'Ethereum'
    }
    case 137: {
      return 'Polygon'
    }
    default: {
      return 'Not Connected'
    }
  }
}

export function getNetworkToken(id: number) {
  switch (id) {
    case 1: {
      return 'ETH'
    }
    case 137: {
      return 'MATIC'
    }
    default: {
      return 'Not Connected'
    }
  }
}

export function GetSelectedNetworkStatus() {
  const { chainId, error } = useWeb3React()
  return (
    <>
      {chainId
        ? getNetworkName(chainId)
        : error
        ? getErrorMessage(error)
        : 'Not Connected'}
    </>
  )
}

export function ChainId() {
  const { chainId } = useWeb3React()

  return (
    <>
      <span>Chain Id</span>
      <span role="img" aria-label="chain">
        ⛓
      </span>
      <span>{chainId ?? ''}</span>
    </>
  )
}


export function BlockNumber() {
  const { chainId, library } = useWeb3React()

  const [blockNumber, setBlockNumber] = React.useState<number>()
  React.useEffect((): any => {
    if (!!library) {
      let stale = false

      library
        .getBlockNumber()
        .then((blockNumber: number) => {
          if (!stale) {
            setBlockNumber(blockNumber)
          }
        })
        .catch(() => {
          if (!stale) {
            setBlockNumber(0)
          }
        })

      const updateBlockNumber = (blockNumber: number) => {
        setBlockNumber(blockNumber)
      }
      library.on('block', updateBlockNumber)

      return () => {
        stale = true
        library.removeListener('block', updateBlockNumber)
        setBlockNumber(undefined)
      }
    }
  }, [library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      <span>Block Number</span>
      <span role="img" aria-label="numbers">
        🔢
      </span>
      <span>{blockNumber === null ? 'Error' : blockNumber ?? ''}</span>
    </>
  )
}

export function formatAccount(account: any) {
  return account === null
    ? '-'
    : account
    ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
    : ''
}

export function Account() {
  const { account } = useWeb3React()

  return (
    <>
      <span>Account</span>
      <span role="img" aria-label="robot">
        🤖
      </span>
      <span>{formatAccount(account)}</span>
    </>
  )
}

export function Balance() {
  const { account, library, chainId } = useWeb3React()
  const [balance, setBalance] = React.useState<string>()

  React.useEffect((): any => {
    if (!!account && !!library) {
      let stale = false

      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance)
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance('')
          }
        })

      return () => {
        stale = true
        setBalance('')
      }
    }
  }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <>
      {balance === null ? 'Error' : balance ? `${formatEther(balance).substring(0, formatEther(balance).indexOf('.') + 5)  + ' ' + getNetworkToken(chainId || 0)} ` : ''}
    </>
  )
}
