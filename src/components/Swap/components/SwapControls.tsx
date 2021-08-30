import { Form } from 'react-bootstrap'
import { tokensInfo } from '../../../constants/tokens'
import { activeTokensFrom } from '../../../constants/tokenSet'
import useSwap from '../../../hooks/useSwap'

export const SelectTokensFrom = () => {
  const { activeTokenFrom, setActiveTokenFrom } = useSwap()
  return (
    <Form.Select
      key={activeTokenFrom.id}
      value={activeTokenFrom.id}
      onChange={(e) => setActiveTokenFrom(activeTokensFrom[parseInt(e.currentTarget.value)])}
    >
      {activeTokensFrom.map((token) => {
        return <option value={token.id}>{token.symbol}</option>
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
      onChange={(e) => setActiveTokenTo(tokensInfo[parseInt(e.currentTarget.value)])}
    >
      {tokensInfo.map((token) => {
        return <option value={token.id}>{token.symbol}</option>
      })}
    </Form.Select>
  )
}
