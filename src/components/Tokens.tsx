
import { Container, Table, Button, Card } from 'react-bootstrap'
import useTokens from '../hooks/useTokens'

export const Tokens = () => {
  const {tokens, setTokens} = useTokens()
  
  const handleInvest = (index: any) => {
    setTokens (
      tokens?.map((token, i) => {
        return (
          (i === index) ? 
            {...token, 
              amount: token.amount + 1,
              balance: token.price * (token.amount + 1)} : 
            {...token}
        )
          
      }))
    }

  return (
    <div>
      <Container className="py-5">
        <h4 className='pb-2'>Invesments Tokens</h4>
        <Card className="rounded">
          <Card.Body>
            <Table className="table-borderless">
              <thead className="border-button">
                <tr>
                  <th>#</th>
                  <th>Symbol</th>
                  <th>Name</th>
                  <th>Fees</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className="border-top">
              
                 {tokens?.map((token, index) => (
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
                    <td>{token.fee}</td>
                    <td>
                      <Button 
                        className="me-2 btn-sm"
                        onClick={()=>handleInvest(index)}
                      >
                        Invest
                      </Button>
                      <Button className="me-2 btn-sm">View</Button>
                    </td>
                  </tr>
                ))} 
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}
