import React from 'react'
import HeaderSearchPage from '../../components/header/HeaderSearchPage'
import BottomNavigation from '../../components/bottom navigation/BottomNavigation'

const Search = () => {
  return (
    <div className='w-full bg-white h-full p-2.5 flex flex-col'>
        <div className="border-b border-gray-200">
            <HeaderSearchPage />
        </div>
        <div className="flex flex-col pt-5 md:px-5 h-full w-full space-y-8 overflow-auto"></div>
        <div className="w-full h-fit z-20">
            <BottomNavigation />
        </div>
    </div>
  )
}

export default Search
