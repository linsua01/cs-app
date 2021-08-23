import { Container } from 'react-bootstrap'

import { Telegram, Github, Twitter } from 'react-bootstrap-icons'

export const Footer = () => {
  return (
    <Container fluid className="px-4 fixed-bottom">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-1 my-4 border-top">
          
        <div className="col-md-4 d-flex align-items-center pt-2">
          <span className="text-muted">&copy; 2021 Common Sense, Inc</span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex pt-2">
          <li className="ms-3">
            <a className="text-muted" href="/">
              <Telegram />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="/">
              <Github />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-muted" href="/">
              <Twitter />
            </a>
          </li>
        </ul>
        
      </footer>
      
    </Container>
  )
}
