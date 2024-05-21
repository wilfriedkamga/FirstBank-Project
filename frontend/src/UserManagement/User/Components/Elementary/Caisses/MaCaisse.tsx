import React from 'react'
import MesCaisse from './MesCaisse'
import { Outlet } from 'react-router-dom'

const MaCaisse = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default MaCaisse