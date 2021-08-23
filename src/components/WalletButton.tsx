import React, { useState, useEffect } from 'react'

import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import {
  injected,
  // network,
  walletconnect,
  walletlink,
} from '../services/connectors'

import {
  Modal,
  Button,
  Dropdown,
  Image,
  Card,
} from 'react-bootstrap'

import { formatAccount, getNetworkName, Balance } from '../services/web3Utils'
import { useEagerConnect, useInactiveListener } from '../hooks/web3Hooks'

// enum ConnectorNames {
//   Injected = 'Injected',
//   // Network = 'Network',
//   WalletConnect = 'WalletConnect',
//   WalletLink = 'WalletLink',
// }

// const connectorsByName: { [connectorName in ConnectorNames]: any } = {
//   [ConnectorNames.Injected]: injected,
//   // [ConnectorNames.Network]: network,
//   [ConnectorNames.WalletConnect]: walletconnect,
//   [ConnectorNames.WalletLink]: walletlink,
// }

const WalletButton = () => {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  const context = useWeb3React<Web3Provider>()
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
  } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState<any>()

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  const walletButtonText = !!account ? formatAccount(account) : 'Connect Wallet'

  return (
    <>
      {!!(library && account) ? (
        <Dropdown align="end">
          <Dropdown.Toggle
            className="border rounded-pill"
            variant="light"
            id="dropdown-basic"
          >
            <Image
              className="me-2"
              style={{ width: '20px' }}
              src="placeholder.png"
              max-width="50px"
              roundedCircle
            />
            {walletButtonText}
          </Dropdown.Toggle>

          <Dropdown.Menu className="border-0">
            <Card style={{ width: '18rem' }}>
              <Card.Header>
                <span className="float-start">
                  <strong>Account</strong>
                </span>

                <Button
                  className="btn-sm float-end"
                  variant="secondary"
                  onClick={() => {
                    deactivate()
                  }}
                >
                  Disconnect
                </Button>
              </Card.Header>
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                  <Image
                    className="me-2"
                    style={{ width: '40px' }}
                    src="placeholder.png"
                    max-width="50px"
                    roundedCircle
                  />
                  {walletButtonText}
                  <div className="pt-3">Balance</div>
                  <div >
                    <strong>
                    <Balance />
                    </strong>
                    
                  </div>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <span className="me-2 align-middle badge border border-light rounded-circle bg-success p-2">
                  <span className="visually-hidden">unread messages</span>
                </span>
                <span className=" align-middle">
                  {getNetworkName(chainId || 0)}
                </span>
              </Card.Footer>
            </Card>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Button variant="primary" onClick={handleShow}>
          {walletButtonText}
        </Button>
      )}

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select a wallet provider</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Button
            className="me-2"
            variant="light"
            onClick={() => {
              activate(injected)
              setShowModal(false)
            }}
          >
            <Image
                    className="me-2"
                    style={{ width: '25px' }}
                    src="metamask-fox.svg"
                    max-width="50px"
            
                  />
            Metamask
          </Button>
          <Button
          className="me-2"
            variant="light"
            onClick={() => {
              activate(walletconnect)
              setShowModal(false)
            }}
          >
            <Image
                    className="me-2"
                    style={{ width: '25px' }}
                    src="wallet-connect.svg"
                    max-width="50px"
            
                  />
            WalletConnect
          </Button>
          <Button
          className="me-2"
            variant="light"
            onClick={() => {
              activate(walletlink)
              setShowModal(false)
            }}
          >
            <Image
                    className="me-2"
                    style={{ width: '25px' }}
                    src="coinbase-wallet.svg"
                    max-width="50px"
            
                  />
            WalletLink
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default WalletButton

// <div>
//         {Object.keys(connectorsByName).map((name) => {
//           const currentConnector = null //connectorsByName[name]
//           const activating = currentConnector === activatingConnector
//           const connected = currentConnector === connector
//           const disabled =
//             !triedEager || !!activatingConnector || connected || !!error

//           return (
//             <button
//               style={{
//                 height: '3rem',
//                 borderRadius: '1rem',
//                 borderColor: activating
//                   ? 'orange'
//                   : connected
//                   ? 'green'
//                   : 'unset',
//                 cursor: disabled ? 'unset' : 'pointer',
//                 position: 'relative',
//               }}
//               disabled={disabled}
//               key={name}
//               onClick={() => {
//                 setActivatingConnector(currentConnector)
//                 activate(injected)
//               }}
//             >
//               <div
//                 style={{
//                   position: 'absolute',
//                   top: '0',
//                   left: '0',
//                   height: '100%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   color: 'black',
//                   margin: '0 0 0 1rem',
//                 }}
//               >
//                 {activating && (
//                   <Spinner
//                     color={'black'}
//                     style={{ height: '25%', marginLeft: '-1rem' }}
//                   />
//                 )}
//                 {connected && (
//                   <span role="img" aria-label="check">
//                     ✅
//                   </span>
//                 )}
//               </div>
//               {name}
//             </button>
//           )
//         })}
//       </div>

//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         {(active || error) && (
//           <button
//             style={{
//               height: '3rem',
//               marginTop: '2rem',
//               borderRadius: '1rem',
//               borderColor: 'red',
//               cursor: 'pointer',
//             }}
//             onClick={() => {
//               deactivate()
//             }}
//           >
//             Deactivate
//           </button>
//         )}

//         {!!error && (
//           <h4 style={{ marginTop: '1rem', marginBottom: '0' }}>
//             {getErrorMessage(error)}
//           </h4>
//         )}
//       </div>

//           {/* //Sign Message BUTON */}

//       <hr style={{ margin: '2rem' }} />

//       <div
//         style={{
//           display: 'grid',
//           gridGap: '1rem',
//           gridTemplateColumns: 'fit-content',
//           maxWidth: '20rem',
//           margin: 'auto',
//         }}
//       >
//         {!!(library && account) && (
//           <button
//             style={{
//               height: '3rem',
//               borderRadius: '1rem',
//               cursor: 'pointer',
//             }}
//             onClick={() => {
//               library
//                 .getSigner(account)
//                 .signMessage('👋')
//                 .then((signature: any) => {
//                   window.alert(`Success!\n\n${signature}`)
//                 })
//                 .catch((error: any) => {
//                   window.alert(
//                     'Failure!' +
//                       (error && error.message ? `\n\n${error.message}` : ''),
//                   )
//                 })
//             }}
//           >
//             Sign Message
//           </button>
//         )}

//       </div>
