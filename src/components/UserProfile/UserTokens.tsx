import React from 'react'
import { Container, Card, Table, Button } from 'react-bootstrap'
import useTokens from '../../hooks/useTokens'

export const UserTokens = () => {
  const { tokens, setTokens } = useTokens()

  const handleWithdraw = (index: any) => {
    setTokens (
      tokens?.map((token, i) => {
        return (
          (i === index) ? 
            {...token, 
              amount: token.amount - 1,
              balance: token.price * (token.amount - 1)} : 
            {...token}
        )
          
      }))
  }

  return (
    <Container className="pt-5">
      <h4 className="pb-2">My Invesments</h4>
      <Card className="rounded">
        <Card.Body>
          <Table className="table-borderless">
            <thead>
              <tr>
                <th>#</th>
                <th>Symbol</th>
                <th>Name</th>
                <th className='text-end'>Price</th>
                <th className='text-end'>Amount</th>
                <th className='text-end'>Balance</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody className="border-top">
              {tokens?.map(
                (token, index) =>
                  token.amount !== '0.0' && (
                    <tr key={index}>
                      <td>
                        <img
                          src={token.image}
                          alt=""
                          width="23"
                          className="me-2 rounded"
                        ></img>
                      </td>
                      <td>{token.symbol}</td>
                      <td>{token.name}</td>
                      <td className='text-end'>${token.price.toFixed(2)}</td>
                      <td className='text-end'>{Number(token.amount).toFixed(4)}</td>
                      <td className='text-end'>${token.balance.toFixed(2)}</td>
                      <td>
                        <Button
                          className="me-2 btn-sm"
                          onClick={() => handleWithdraw(index)}
                        >

                            Withdraw
                        </Button>
                      </td>
                    </tr>
                  ),
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}
