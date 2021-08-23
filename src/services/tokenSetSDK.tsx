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

export function getTokenBalance(library: any,
  chainId: number,
  contractAddress: string,
  account: string): (address: string) => Promise<string> {
    const contract = getContract(library, contractAddress)
  return async (address: string): Promise<string> =>
    contract?.balanceOf(address)
      .then((balance: { toString: () => string }) => balance.toString())
}

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
