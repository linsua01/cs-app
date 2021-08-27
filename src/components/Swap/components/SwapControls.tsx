import { Form } from 'react-bootstrap'
import { tokensInfo } from '../../../constants/tokens'
import { activeTokensFrom } from '../../../constants/tokenSet'

export const SelectTokensFrom = () => {
  return (
    <Form.Select
        
    >
      {activeTokensFrom.map((token) => {
        return <option value={token.id}>{token.symbol}</option>
      })}
    </Form.Select>
  )
}

export const SelectTokensTo = () => {
    return (
      <Form.Select>
        {tokensInfo.map((token) => {
          return <option value={token.id}>{token.symbol}</option>
        })}
      </Form.Select>
    )
  }
