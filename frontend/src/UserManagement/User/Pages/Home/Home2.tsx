import React from 'react'
import Footer from '../../Components/PortalComponent/Footer'
import Cards from '../../Components/PortalComponent/Cards'
import Hero from '../../Components/PortalComponent/Hero'
import Navbar from '../../Components/PortalComponent/Navbar'
import Hero2 from '../../Components/PortalComponent/Hero2'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Home2() {
    const navigate=useNavigate()
  return (
    <div className='bg-red-800'>
      <Navbar />
      <Hero handleClick={()=>navigate("/tontine")} />
      <Cards />
      <Hero2 handleClick={()=>{navigate("/")}} />
      <Cards />
      <Footer />
    </div>
  )
}
