import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Contract, ContractInterface } from '@ethersproject/contracts'

import { exchangeIssuanceV2, USDC } from '../constants/tokenSet'


import erc20ABI from '../services/ABI/erc20.json'
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

export function getSignerContract(
  library: any,
  ABI: any,
  address: string,
  account: string
): Contract | undefined {
  const contract =
    !!address && !!ABI && !!library
      ? new Contract(address, ABI, library.getSigner(account).connectUnchecked())
      : undefined
  return contract
}

export const getTokenBalance = async (
  library: any,
  chainId: number,
  contractAddress: string,
  account: string,
): Promise<string> => {
  const contract = getContract(library, erc20ABI, contractAddress)
  const balance = await contract?.balanceOf(account)
  return balance
}

export const getTokenDecimals = async (
  library: any,
  chainId: number,
  contractAddress: string,
): Promise<string> => {
  const contract = getContract(library, erc20ABI, contractAddress)
  const decimals = await contract?.decimals()
  return decimals
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

export const getEstimatedIssueSetAmount = async (
  library: any,
  chainId: number,
  contractAddressTo: string,
  contractAddressFrom: string,
  amountFrom: string
): Promise<string> => {
  const contract = getContract(library, exchangeIssuanceV2ABI, exchangeIssuanceV2.contractPolygon)
  const amountTo = await contract?.getEstimatedIssueSetAmount(contractAddressTo, contractAddressFrom, amountFrom )
  return amountTo
}

export const getAmountInToIssueExactSet = async (
  library: any,
  chainId: number,
  contractAddressTo: string,
  contractAddressFrom: string,
  amountFrom: string
): Promise<string> => {
  const contract = getContract(library, exchangeIssuanceV2ABI, exchangeIssuanceV2.contractPolygon)
  const amountTo = await contract?.getAmountInToIssueExactSet(contractAddressTo, contractAddressFrom, amountFrom )
  return amountTo
}

export const getAmountOutOnRedeemSet = async (
  library: any,
  chainId: number,
  contractAddressTo: string,
  contractAddressFrom: string,
  amountFrom: string
): Promise<string> => {
  const contract = getContract(library, exchangeIssuanceV2ABI, exchangeIssuanceV2.contractPolygon)
  const amountTo = await contract?.getAmountOutOnRedeemSet(contractAddressTo, contractAddressFrom, amountFrom )
  return amountTo
}

// export const issueExactSetFromToken = async (
//   library: any,
//   chainId: number,
//   contractAddressTo: string,
//   contractAddressFrom: string,
//   amountFrom: string
// ): Promise<string> => {
//   const contract = getContract(library, exchangeIssuanceV2ABI, exchangeIssuanceV2.contractPolygon)
//   const amountTo = await contract?.issueExactSetFromToken(contractAddressTo, contractAddressFrom, amountFrom )
//   return amountTo
// }

export const issueExactSetFromToken = async (
  library: any,
  chainId: number,
  account: string,
  contractAddressTo: string,
  contractAddressFrom: string,
  amountTo: string,
  amountFrom: string,
): Promise<string> => {
  const contract = getSignerContract(library, exchangeIssuanceV2ABI, exchangeIssuanceV2.contractPolygon, account)
  const result = await contract?.issueExactSetFromToken(contractAddressTo, contractAddressFrom, amountTo, amountFrom )
  return result
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
