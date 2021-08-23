import React from 'react'
import Providers from './Providers'

import { NavBar } from './components/NavBar'
import { Hero } from './components/Hero'
import { Tokens } from './components/Tokens'
import { Footer } from './components/Footer'

const App: React.FC = () => {
  return (
    <>
      <Providers>
        <NavBar />
        <Hero />
        <Tokens />
        <Footer />
      </Providers>
    </>
  )
}

export default App
