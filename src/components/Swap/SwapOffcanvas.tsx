import { useState } from 'react'
import { Button, Offcanvas } from 'react-bootstrap'
import { Swap } from './Swap'

export const SwapOffcanvas = (prop: { action: string }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)


  return (
    <>
      <Button variant="primary" onClick={handleShow} className="me-2 btn-sm">
        {prop.action}
      </Button>
      <Offcanvas
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
