import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React from 'react'

const HeaderSearchPage = () => {
  return (
    <div className='p-2 flex justify-between w-full'>
        <div className="h-0 w-0 md:h-10 md:w-fit">
            <img src="./assets/images/logo.svg" alt="logo" width={200} height={300} />
        </div>
        <form className="max-w-md w-full mx-auto rounded-full md:border md:border-gray-300">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-full" placeholder="Type anything..." required />
            </div>
        </form>
        <div className="h-0 w-fit md:mr-8 md:h-10 flex space-x-1">
            <div className="md:h-full md:w-fit h-0 w-0">
                <a className="flex items-center justify-center h-0 w-0 md:h-10 md:w-10 rounded-full" href='/notifications'>
                    <BellIcon className="h-6 w-6" />
                </a>
            </div>
            <div className="md:h-full h-0 w-0">
                <a className="flex items-center justify-center h-0 w-0 md:h-10 md:w-10 rounded-full" href='/settings'>
                    <img src='./assets/images/base_profile.svg' alt='profile' width={30} height={30} />
                </a>
            </div>
        </div>
    </div>
  )
}

export default HeaderSearchPage
