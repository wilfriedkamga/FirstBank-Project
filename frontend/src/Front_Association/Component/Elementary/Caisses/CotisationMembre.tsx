import React from 'react'

const CotisationMembre = () => {
  return (
    <div className=' relative flex rounded-md shadow-md  bg-white w-[80vw] sm:w-[20vw] border-gray-200 border mt-4 h-20 '>
              <div className=' absolute right-2 '>
                  <div className='w-7 p-2 m-1  mt-1 h-6 bg-red-600 inline-block shadow-sm rounded-sm'></div>
                  <div className='w-7 p-2  m-1 h-6 bg-green-600 inline-block shadow-sm rounded-sm'></div>
                  <div className='w-7 p-2  m-1 h-6 bg-yellow-600 inline-block shadow-sm rounded-sm'></div>
              </div>
              <div className=' absolute t-2 p-2 font-bold '>
                  <p>Nom du membre</p>
              </div>
              <div className=' absolute bottom-0 p-2  '>
                  <p>+237 650641633</p>
              </div>
        </div>
  )
}

export default CotisationMembre