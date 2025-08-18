import React from 'react'
import SideNavbar from '../../Components/SideNavbar/sideNavbar'
import HomePage from '../../Components/HomePage/homePage'
import './home.css'

const Home = ({sideNavbar}) => {
    return (
        <div className='home'>
            <SideNavbar sideNavbar={sideNavbar} />
            <HomePage sideNavbar={sideNavbar} />
        </div>
    )
}

export default Home