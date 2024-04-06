import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {


    return (
        <div className='header_bar'>
            <div className="header_item ">

                <Link className='' to="/">Home</Link>
            </div>
            <div className="header_item ">
                <Link className='' to={{ pathname: `/cart` }}>cart</Link>
            </div>
        </div>
    )
}

export default Navbar
