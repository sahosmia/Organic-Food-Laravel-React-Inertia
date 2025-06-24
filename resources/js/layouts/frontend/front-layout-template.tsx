import React from 'react'
import Footer from './Footer'
import NewsLetter from './NewsLetter'
import Header from './Header'

function FrontLayoutTemplate({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <NewsLetter />
            <Footer />
        </>
    )
}

export default FrontLayoutTemplate
