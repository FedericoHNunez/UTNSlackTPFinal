import React from 'react'
import './HomeScreen.css'
import { HomeNavbar } from '../../Components/Home/HomeNavbar.jsx'
import { HomeHero } from '../../Components/Home/HomeHero.jsx'
import { Footer } from '../../Components/Footer/Footer.jsx'

export const HomeScreen = () => {
  return (
    <div className="home-container">
      <div className="home-bg-quarter-circle" aria-hidden="true"></div>
      <HomeNavbar />
      <HomeHero />
      <Footer />
    </div>
  )
}

export default HomeScreen
