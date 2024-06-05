import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import logo from "../../../UserManagement/User/Assets/Images/FBLogo.png"
import Variable from '../../../Variable'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [photo,setPhoto]=useState("")
    
    useEffect(()=>{
        const user=Variable.getLocalStorageItem("user")
        setPhoto(user.user.photo)
    })
    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

  return (
    <div className='flex justify-between'>
        <div className="h-10 right-5 relative bottom-6 ">
            <img src={logo} alt="logo" width={200} height={30} />
        </div>
        <div className="h-10 flex space-x-1">
            <div className="h-full">
                <a className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full" href='/search'>
                    <MagnifyingGlassIcon className="h-6 w-6" />
                </a>
            </div>
            <div className="h-full">
                <a className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full" href='/notifications'>
                    <BellIcon className="h-6 w-6" />
                </a>
            </div>
            <div className="h-full">
                {/* <a className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full" href='/settings'>
                    <img src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='profile' width={30} height={30} />
                </a> */}
                <button className="flex text-sm h-10 w-10 bg-gray-900 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 overflow-hidden" id='dropdownUserAvatarButton' type='button' onClick={handleToggle}>
                    <img src={photo} className="object-cover h-full w-full rounded-full object-center p-[1px]"/>
                </button>
                {isOpen && (
                    <div className="z-20 absolute bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 right-2 mt-2" id='dropdownAvatar'>
                        <ul className="py-2 text-sm text-gray-700" aria-labelledby='dropdownUserAvatarButton'>
                            <li>
                                <a href="/profile" className="block px-4 py-2 font-title hover:bg-gray-100">Profile</a>
                            </li>
                            <li>
                                <a href="/settings" className="block px-4 py-2 font-title hover:bg-gray-100">Settings</a>
                            </li>
                        </ul>
                        <div className="py-2">
                            <a href="/logout" className="block px-4 py-2 font-title font-semibold text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Header
