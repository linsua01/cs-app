import { Navbar, Container, Nav, Button } from 'react-bootstrap'

import WalletButton from './WalletButton'
import { GetSelectedNetworkStatus } from '../services/web3Utils' 

export const NavBar = () => {

  const networkStatus = GetSelectedNetworkStatus()

  return (
    <Container fluid className="py-2">
      <Navbar collapseOnSelect expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">
            {' '}
            <img src="csLogo.svg" alt="" width="200"></img>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">

              <Button variant="light">
                
                
                {networkStatus}
              
              
              </Button>
              
              {/* <NavDropdown
                title={networkStatus}
                id="collasible-nav-dropdown"
                className="me-2"
              >
                <NavDropdown.Item className="disabled">
                  Select Network
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">
                  <img
                    src={cryptoIcons.eth}
                    alt=""
                    width="23"
                    className="me-2 rounded"
                  ></img>
                  Ethereum
                </NavDropdown.Item>
                <NavDropdown.Item href="#">
                  <img
                    src={cryptoIcons.matic}
                    alt=""
                    width="23"
                    className="me-2 rounded"
                  ></img>
                  Polygon
                </NavDropdown.Item>
              </NavDropdown> */}

            </Nav>
            <Nav>
              <WalletButton />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  )
}
