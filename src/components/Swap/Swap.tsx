import { useState } from 'react'
import { Col, Form, Nav, Row } from 'react-bootstrap'
import useSwap from '../../hooks/useSwap'

import {
  GroupButtons,
  GroupInputFrom,
  GroupInputTo,
  GroupSelectFrom,
  GroupSelectTo,
} from './SwapControls'

export const Swap = () => {
  const { swapResult, setSwapResult } = useSwap()

  return (
    <div>
      <Nav
        className="mb-2 border-bottom-0"
        variant="tabs"
        activeKey={swapResult.action}
        onSelect={(selectedKey) =>
          setSwapResult({ ...swapResult, action: selectedKey })
        }
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
          {swapResult.action == 'Invest' ? (
            <>
              <Col className="col-5">
                <GroupSelectFrom />
              </Col>
              <Col className="col-7">
                <GroupInputFrom />
              </Col>
              <Col className="col-5">
                <GroupSelectTo />
              </Col>
              <Col className="col-7">
                <GroupInputTo />
              </Col>
            </>
          ) : (
            <>
              <Col className="col-5">
                <GroupSelectTo />
              </Col>
              <Col className="col-7">
                <GroupInputTo />
              </Col>
              <Col className="col-5">
                <GroupSelectFrom />
              </Col>
              <Col className="col-7">
                <GroupInputFrom />
              </Col>
            </>
          )}

          <Col>
            <GroupButtons />
          </Col>
        </Row>
      </Form>
    </div>
  )
}
