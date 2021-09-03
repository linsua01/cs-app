import { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { tokensInfo } from '../../constants/tokens'
import useSwap from '../../hooks/useSwap'
import { Swap } from './Swap'

export const SwapOffcanvas = (prop: { action: string, tokenId: number }) => {
  const [show, setShow] = useState(false)
  const { swapResult, setSwapResult, setActiveTokenTo } = useSwap()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleEnter = () => {
    setSwapResult({...swapResult, action: prop.action})
    setActiveTokenTo(tokensInfo[prop.tokenId])
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2 btn-sm">
        {prop.action}
      </Button>
      <Offcanvas
        onEnter={()=>handleEnter()}
        show={show}
        onHide={handleClose}
        placement="end"
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Swap />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
