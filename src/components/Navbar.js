import React, { useEffect, useState } from 'react'
import './Navbar.css'

const Navbar = () => {
    const [show, handleShow] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 100 ? handleShow(true) : handleShow(false)
        })
        return () => {
            window.removeEventListener('scroll')
        }
    }, [])

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <img
                className="nav__logo"
                src="https://i.ya-webdesign.com/images/netflix-logo-png-transparent-background-7.png"
                alt="NetFlix Logo"
            />
        </div>
    )
}

export default Navbar
