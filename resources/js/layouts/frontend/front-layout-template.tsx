import React from 'react'
import Header from './Header'
import Footer from './Footer'
import NewsLetter from './NewsLetter'

function FrontLayoutTemplate({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}          <NewsLetter />
            <Footer />
        </>
    )
}

export default FrontLayoutTemplate
