import React, { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import { getNetworkToken } from './web3Utils'
import { Contract, ContractInterface } from '@ethersproject/contracts'
import tokenSetABI from '../services/ABI/tokenSet.json'

export function useContract(
  address?: string,
  ABI?: ContractInterface,
  withSigner = false,
): Contract | undefined {
  const { library, account } = useWeb3React()
  return useMemo(
    () =>
      !!address && !!ABI && !!library
        ? new Contract(
            address,
            ABI,
            withSigner
              ? library.getSigner(account).connectUnchecked()
              : library,
          )
        : undefined,
    [address, ABI, withSigner, library, account],
  )
}

export function getContract(
  library: any,
  address?: string,
): Contract | undefined {
  const contract =
    !!address && !!tokenSetABI && !!library
      ? new Contract(address, tokenSetABI, library)
      : undefined
  return contract
}

// export async function getTokenBalance(
//   library: any,
//   chainId: number,
//   contractAddress: string,
//   account: string
//   ): Promise<T> {
//     const contract = getContract(library, contractAddress)
//     const balance = await contract?.balanceOf(account)
//     return balance 
//   }

// export function getTokenBalance(
//   library: any,
//   chainId: number,
//   contractAddress: string,
//   account: string
// ): (address: string) => Promise<string> {
//   return async (address: string): Promise<string> => {
//     const contract = getContract(library, contractAddress)
//     return contract?.balanceOf(address).then((balance: { toString: () => string }) => balance.toString())

//   }    
// }

// export function getTokenSymbol(
//   library: any,
//   chainId: number,
//   contractAddress: string,
//   account: string
// ): (address: string) => Promise<string> {
//   return async (address: string): Promise<string> => {
//     const contract = getContract(library, contractAddress)
//     return contract?.symbol().then((symbol: { toString: () => string }) => symbol.toString())

//   }    
// }

export const getTokenBalance = async (
  library: any,
  chainId: number,
  contractAddress: string,
  account: string): Promise<string> => {
    const contract = getContract(library, contractAddress)
    const balance = await contract?.balanceOf(account)
  
  return balance
}

export const getTokenBalance1 = (
  library: any,
  chainId: number,
  contractAddress: string,
  account: string) => {
  const resultPromise = new Promise((resolve, reject) => {
    const contract = getContract(library, contractAddress)
      resolve(contract?.balanceOf(account))
  })
  return  resultPromise
}

  // export async function getTokenBalance1(
  //   library: any,
  //   chainId: number,
  //   contractAddress: string,
  //   account: string
  //   ): Promise<T> {
  //     const contract = getContract(library, contractAddress)
  //     const balance = await contract?.balanceOf(account)
  //     return balance 
  //   }



// export function getBalance(
//   library: any,
//   chainId: number,
//   contractAddress: string,
//   account: string,
// ) {
//   const contract = getContract(library, contractAddress)
//   return async (address: string): Promise<T> =>
//     await contract?.balanceOf(address)
// }


//   const iCryptoDream = library.
//   contract(
//     CryptoDream,
//     '0xff3ee79CB4A7Fe0F78a3634cCfDbFc3CdCD65a64'
//   )

//   const name = await iCryptoDream.methods.name().call()
//   const symbol = await iCryptoDream.methods.symbol().call()
//   const decimals = await iCryptoDream.methods.decimals().call()
//   const totalSupply = await iCryptoDream.methods.totalSupply().call()
//   const balanceInDream = await iCryptoDream.methods
//     .balanceOf(accounts[0])
//     .call()
