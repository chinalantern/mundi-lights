import React from 'react'
import Head from 'next/head' // In NEXTjs metadata about website before the body is injected this way
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className="layout">
      <Head>
        <title>Mundi Lights Store</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="main-container">{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default Layout
