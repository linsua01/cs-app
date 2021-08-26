import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract, ContractInterface } from '@ethersproject/contracts'

import { exchangeIssuanceV2, USDC } from '../constants/tokenSet'

import tokenSetABI from '../services/ABI/tokenSet.json'
import exchangeIssuanceV2ABI from '../services/ABI/exchangeIssuanceV2.json'

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
  ABI: any,
  address?: string,
): Contract | undefined {
  const contract =
    !!address && !!ABI && !!library
      ? new Contract(address, ABI, library)
      : undefined
  return contract
}

export const getTokenBalance = async (
  library: any,
  chainId: number,
  contractAddress: string,
  account: string,
): Promise<string> => {
  const contract = getContract(library, tokenSetABI, contractAddress)
  const balance = await contract?.balanceOf(account)
  return balance
}

export const getTokenPrice = async (
  library: any,
  chainId: number,
  contractAddress: string,
): Promise<string> => {
  const contract = getContract(library, exchangeIssuanceV2ABI, exchangeIssuanceV2.contractPolygon)
  const price = await contract?.getAmountOutOnRedeemSet(contractAddress, USDC.contractPolygon, '1000000000000000000' )
  return price
}



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
