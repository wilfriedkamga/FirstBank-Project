import React from 'react'
import { FaBars, FaBell, FaSearch, FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='bg-gray-800 px-4 py-3 flex justify-between'>
        <div className='flex items-center text-xl'>
            <FaBars className='text-white me-4 cursor-pointer'/>
            <span className='text-white font-semibold'>
                E-Commerce
            </span>
        </div>

        <div className='flex items-center gap-x-5 ml-64'>
          <div className='relative md:w-65'>
            <span className='relative md:absolute inset-y-0 left-0 flex items-center pl-2'>
                 <button className='p-1 focus:outline-none text-white md:text-black'>
                     <FaSearch/>
                </button>
            </span>
            <input type="text" className='w-full px-4 py-1 pl-12 rounded shadow outline-none   md:black '/>
           </div> 

           <div className='text-white'>
            <FaBell  className="w-6 h-6"/>
           </div>

           <div className='relative'>
                <button className='text-white'>
                    <FaUserCircle className='w-6 h-6 mt-1'/>
                    <div className='z-10 hidden absolute rounded-lg shadow w-32 '>
                        <ul>
                            <li><a href="">Profile</a></li>
                            <li><a href="">Setting</a></li>
                            <li><a href=""> Log out</a></li>
                        </ul>
                    </div>
                </button>
           </div>
        </div>
        
    </nav>
  )
}

export default Navbar