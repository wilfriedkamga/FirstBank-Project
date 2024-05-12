import React from 'react'
import { FaCog, FaHome, FaPoll, FaRegEnvelope, FaRegFileAlt } from 'react-icons/fa'

function SideBar() {
  return (
    <div className='w-45 bg-gray-800 fixed h-full px-4 py-4'>
         <div className='my-2 mb-4'>
             <h1 className='text-2x text-white font-bold'>Admin Dashboard</h1>
         </div>
         <hr />

         <ul className=' mt-3 text-white font-bold'>
              <li className='py-2 mb-4 rounded hover:shadow hover:bg-blue-500 y-2'>
                  <a href="">
                      <FaHome className='inline-block 2-6 h-6 mr-2 -mt-2'></FaHome>
                       Home
                   </a>
              </li>
              <li className='py-2 mb-4 rounded hover:shadow hover:bg-blue-500 y-2'>
                  <a href="">
                      <FaRegFileAlt  className='inline-block 2-6 h-6 mr-2 -mt-2'></FaRegFileAlt>
                       Home
                   </a>
              </li>
              <li className=' py-2 mb-4 rounded hover:shadow hover:bg-blue-500 y-2'>
                  <a href="">
                      <FaPoll className=' inline-block 2-6 h-6 mr-2 -mt-2'></FaPoll>
                       Home
                   </a>
              </li>
              <li className='py-2 mb-4 rounded hover:shadow hover:bg-blue-500 y-2'>
                  <a href="">
                      <FaRegEnvelope className=' inline-block 2-6 h-6 mr-2 -mt-2'></FaRegEnvelope>
                       Home
                   </a>
              </li>
              <li className=' mb-4 rounded hover:shadow hover:bg-blue-500 py-2'>
                  <a href="">
                      <FaCog className='inline-block 2-6 h-6 mr-2 -mt-2'></FaCog>
                       Home
                   </a>
              </li>
          </ul>
        
        </div>
  )
}

export default SideBar