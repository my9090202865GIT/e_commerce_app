import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {


    return (
        <div>
            <footer className="bg-white dark:bg-gray-900">
                <div className='footer_bar'>
                    <div className="footer_item ">
                        <Link className='' to="#">About</Link>
                    </div>
                    <div className="footer_item">
                        <Link className='' to="#">Contact us</Link>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Footer