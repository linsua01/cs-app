import React, { useState } from 'react'
import {
  Button,
  Card,
  Col,
  FloatingLabel,
  Form,
  Nav,
  Row,
} from 'react-bootstrap'
import useSwap from '../../hooks/useSwap'

import { SelectTokensFrom, SelectTokensTo } from './components/SwapControls'

export const Swap = () => {
  const [swapActionState, setSwapActionState] = useState('Invest')
  const { activeTokenFrom, activeTokenTo } = useSwap()

  return (
    <div>
      <Nav
        className="mb-2 border-bottom-0"
        variant="tabs"
        activeKey={swapActionState}
        onSelect={(selectedKey) => setSwapActionState(selectedKey || '')}
      >
        <Nav.Item>
          <Nav.Link eventKey="Invest">Invest</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Withdraw">Withdraw</Nav.Link>
        </Nav.Item>
      </Nav>

      <Form>
        <Row className="g-2 p-3 border rounded">
          <Col className="col-3">
            <Form.Group className="mb-3">
              <Form.Label className="text-end">From</Form.Label>
              <SelectTokensFrom />
              <Form.Label className="pt-2">{activeTokenFrom.name}</Form.Label>
            </Form.Group>
          </Col>
          <Col className="col-9">
            <Form.Group className="mb-3 text-end">
              <Form.Label>Balance: ${Number(activeTokenFrom.balance).toFixed(4)} Max</Form.Label>
              <Form.Control className="text-end" type="number" placeholder="" />
              <Form.Label className="pt-2">~$30.00</Form.Label>
            </Form.Group>
          </Col>
          <Col className="col-3">
            <Form.Group className="mb-3">
              <Form.Label className="text-end">To</Form.Label>
              <SelectTokensTo />
              <Form.Label className="pt-2">{activeTokenTo.name}</Form.Label>
            </Form.Group>
          </Col>
          <Col className="col-9">
            <Form.Group className="mb-3 text-end">
              <Form.Label>Balance: 12,355 Max</Form.Label>
              <Form.Control className="text-end" type="number" placeholder="" />
              <Form.Label className="pt-2">~$10.00</Form.Label>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3 text-end">
              <Form.Control
                className="btn btn-primary"
                type="button"
                value={swapActionState}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
