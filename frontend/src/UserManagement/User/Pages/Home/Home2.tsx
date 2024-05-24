import React, { useState } from 'react'
import Footer from '../../Components/PortalComponent/Footer'
import Cards from '../../Components/PortalComponent/Cards'
import Hero from '../../Components/PortalComponent/Hero'
//import Navbar from '../../Components/PortalComponent/Navbar'
import Hero2 from '../../Components/PortalComponent/Hero2'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from '../../Components/Elementary/Navbar/Navbar'
import useAuthStore from '../../../../Store/AuthStore'
import useAuthStore2 from '../../../../Store/AuthStore2'

export default function Home2() {
    const navigate=useNavigate()
    const { token, user } = useAuthStore();
    const value=useAuthStore2(state=>state.isAuthenticated)
    const [mobileSidebarVisibility, setMobilesidebarVisibility] = useState(false);
  return (
    <div className='bg-red-800'>
      <Navbar mobilesidebarVisivility={mobileSidebarVisibility} setMobileSidebarVisibility={setMobilesidebarVisibility}/>
      <Hero handleClick={()=>navigate("/tontine")} />
      <Cards />
      <Hero2 handleClick={()=>{navigate("/")}} />
      <Cards />
      {value?<Footer />:null}
    </div>
  )
}
