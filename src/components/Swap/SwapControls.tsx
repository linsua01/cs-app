import { parseUnits } from '@ethersproject/units'
import { useWeb3React } from '@web3-react/core'
import { Button, Form } from 'react-bootstrap'
import { tokensInfo } from '../../constants/tokens'
import { activeTokensFrom } from '../../constants/tokenSet'
import useSwap from '../../hooks/useSwap'
import { issueExactSetFromToken } from '../../services/tokenSet'

export const SelectTokensFrom = () => {
  const { activeTokenFrom, setActiveTokenFrom } = useSwap()

  return (
    <Form.Select
      key={activeTokenFrom.id}
      value={activeTokenFrom.id}
      onChange={(e) =>
        setActiveTokenFrom(activeTokensFrom[parseInt(e.currentTarget.value)])
      }
    >
      {activeTokensFrom.map((token) => {
        return (
          <option key={token.id} value={token.id}>
            {token.symbol}
          </option>
        )
      })}
    </Form.Select>
  )
}

export const SelectTokensTo = () => {
  const { activeTokenTo, setActiveTokenTo } = useSwap()

  return (
    <Form.Select
      key={activeTokenTo.id}
      value={activeTokenTo.id}
      onChange={(e) =>
        setActiveTokenTo(tokensInfo[parseInt(e.currentTarget.value)])
      }
    >
      {tokensInfo.map((token) => {
        return (
          <option key={token.id} value={token.id}>
            {token.symbol}
          </option>
        )
      })}
    </Form.Select>
  )
}

export const GroupSelectFrom = () => {
  const { activeTokenFrom, swapResult, setSwapResult } = useSwap()
  return (
    <Form.Group
      onFocus={() =>
        setSwapResult({
          ...swapResult,
          activeFocus: 'From',
        })
      }
      className="mb-3"
    >
      <Form.Label className="text-end pt-1">{swapResult.labelFrom}</Form.Label>
      <SelectTokensFrom />
      <Form.Label className="pt-2">{activeTokenFrom.name}</Form.Label>
    </Form.Group>
  )
}

export const GroupSelectTo = () => {
  const { activeTokenTo, swapResult, setSwapResult } = useSwap()
  return (
    <Form.Group
      onFocus={() =>
        setSwapResult({
          ...swapResult,
          activeFocus: 'To',
        })
      }
      className="mb-3"
    >
      <Form.Label className="text-end pt-1">{swapResult.labelTo}</Form.Label>
      <SelectTokensTo />
      <Form.Label className="pt-2">{activeTokenTo.name}</Form.Label>
    </Form.Group>
  )
}

export const MaxButton = () => {
  const {
    activeTokenFrom,
    activeTokenTo,
    swapResult,
    setSwapResult,
  } = useSwap()

  const updateAmount = () => {
    if (swapResult.action == 'Invest')
      setSwapResult({
        ...swapResult,
        amountFrom: Number(activeTokenFrom.balance).toFixed(4).toString(),
      })
    else
      setSwapResult({
        ...swapResult,
        amountTo: Number(activeTokenTo.balance).toFixed(4).toString(),
      })
  }

  return (
    <Button
      className="align-top"
      size="sm"
      variant="link"
      onClick={() => {
        updateAmount()
      }}
    >
      Max
    </Button>
  )
}

export const InputAmountFrom = () => {
  const { swapResult, setSwapResult } = useSwap()
  return (
    <Form.Control
      className="text-end"
      type="number"
      placeholder=""
      value={swapResult.amountFrom}
      onChange={(e) =>
        swapResult.activeFocus == 'From'
          ? setSwapResult({
              ...swapResult,
              amountFrom: e.currentTarget.value,
            })
          : 51
      }
    />
  )
}

export const InputAmountTo = () => {
  const { swapResult, setSwapResult } = useSwap()
  return (
    <Form.Control
      className="text-end"
      type="number"
      placeholder=""
      value={swapResult.amountTo}
      onChange={(e) =>
        swapResult.activeFocus == 'To'
          ? setSwapResult({
              ...swapResult,
              amountTo: e.currentTarget.value,
            })
          : 51
      }
    />
  )
}

export const GroupInputFrom = () => {
  const { activeTokenFrom, swapResult, setSwapResult } = useSwap()
  return (
    <Form.Group
      onFocus={() =>
        setSwapResult({
          ...swapResult,
          activeFocus: 'From',
        })
      }
      className="mb-3 text-end"
    >
      <Form.Label className="pt-1">
        Balance: {Number(activeTokenFrom.balance).toFixed(4)}
      </Form.Label>
      {swapResult.action == 'Invest' ? <MaxButton /> : <></>}

      <InputAmountFrom />
      <Form.Label className="pt-2">
        ~$
        {Number(activeTokenFrom.price)
          //* Number(activeTokenFrom.balance)
          .toFixed(2)}
      </Form.Label>
    </Form.Group>
  )
}

export const GroupInputTo = () => {
  const { activeTokenTo, swapResult, setSwapResult } = useSwap()
  return (
    <Form.Group
      onFocus={() =>
        setSwapResult({
          ...swapResult,
          activeFocus: 'To',
        })
      }
      className="mb-3 text-end"
    >
      <Form.Label className="pt-1">
        Balance: {Number(activeTokenTo.balance).toFixed(4)}
      </Form.Label>
      {swapResult.action == 'Withdraw' ? <MaxButton /> : <></>}
      <InputAmountTo />
      <Form.Label className="pt-2">
        ~$
        {Number(activeTokenTo.price) //* Number(activeTokenTo.balance)
          .toFixed(2)}
      </Form.Label>
    </Form.Group>
  )
}



export const GroupButtons = () => {
  const { swapResult, handleInvest } = useSwap()
  return (
    <Form.Group className="mb-3 text-end">
      <Form.Control
        className="btn btn-primary"
        type="button"
        value={swapResult.action}
        onClick={()=>handleInvest()}
      />
    </Form.Group>
  )
}
