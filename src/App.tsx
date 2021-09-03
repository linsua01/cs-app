import React from 'react'
import Providers from './Providers'

import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'
import { Tokens } from './components/Tokens'
import { Footer } from './components/Footer'
import { Swap } from './components/Swap/Swap'
import { Container } from 'react-bootstrap'


const App: React.FC = () => {
  return (
    <>
      <Providers>
        <NavBar />
        {/* <Container className="py-5">
          <Swap />
        </Container> */}
        <Hero />
        <Tokens />
        <Footer />
      </Providers>
       
    </>
  )
}

export default App
