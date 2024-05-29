import React from 'react'
import Header from '../../components/header/Header'
import BottomNavigation from '../../components/bottom navigation/BottomNavigation'
import { ArrowLeftStartOnRectangleIcon, BellAlertIcon, IdentificationIcon, InboxArrowDownIcon, InformationCircleIcon, LockClosedIcon, PencilSquareIcon, ShareIcon } from '@heroicons/react/24/outline'
import Variable from '../../../Variable'

const ProfileSettings = () => {
  const handleLogout = () => {
    alert("vous allez vous déconnecté")
    Variable.removeFromLocalStorage("user");
};

  return (
    <div className='w-full bg-white h-full p-2.5 flex flex-col'>
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <div className="flex flex-col pt-5 md:px-5 h-full w-full space-y-8 overflow-auto">
        <div className="ml-5 border-b border-gray-200">
          <h3 className='font-medium text-gray-500 font-account text-2xl'>Account</h3>
        </div>
        <a href="/profile/view" className="flex flex-row items-center bg-white md:ml-36 border rounded-lg shadow w-full md:w-5/6 hover:bg-gray-100">
          <div className='rounded-full p-5'>
            <img className="rounded-full h-24 w-24" src="https://picsum.photos/200/300" alt="profile" width={150} height={150} />
          </div>
          <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">James Worthy</h5>
              <p className="mb-3 font-normal text-gray-700">Simple User</p>
          </div>
        </a>
        <div className="ml-5 border-b border-gray-200">
          <h3 className='font-medium text-gray-500 font-account text-2xl'>Settings</h3>
        </div>
        <div className="flex flex-col bg-white w-full p-2 space-y-2">
          <a href="/profile/add-email" className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100">
            <div className='p-5 group-hover:text-[#BB0A01]'>
              <PencilSquareIcon className='h-8 w-8' />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">Edit profile</p>
          </a>
          <a href="/profile/modify-password" className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100">
            <div className='p-5 group-hover:text-[#BB0A01]'>
              <LockClosedIcon className='h-8 w-8' />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">Modify your password</p>
          </a>
          <a href="/profile/new/email" className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100">
            <div className='p-5 group-hover:text-[#BB0A01]'>
              <IdentificationIcon className='h-8 w-8' />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">Add e-mail</p>
          </a>
          <a href="/profile/new/phone" className="flex flex-row group items-center justify-start bg-white rounded-lg w-full hover:bg-gray-100">
            <div className='p-5 group-hover:text-[#BB0A01]'>
              <InboxArrowDownIcon className='h-8 w-8' />
            </div>
            <p className="font-normal p-5 group-hover:text-[#BB0A01] text-gray-700 font-title">Add a phone number</p>
          </a>
          <a href="/notifications" className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100">
            <div className='p-5 group-hover:text-[#BB0A01]'>
              <BellAlertIcon className='h-8 w-8'/>
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">Notifications</p>
          </a>
          <a href="/about-us" className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100">
            <div className='p-5 group-hover:text-[#BB0A01]'>
              <InformationCircleIcon className='h-8 w-8' />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">About us</p>
          </a>
          <a href="/share" className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100">
            <div className='p-5 group-hover:text-[#BB0A01]'>
              <ShareIcon className='h-8 w-8' />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">Share</p>
          </a>
          <a href="/" onClick={handleLogout} className="flex flex-row group items-center bg-white rounded-lg w-full hover:bg-gray-100">
            <div className='p-5 group-hover:text-[#BB0A01]'>
              <ArrowLeftStartOnRectangleIcon className='h-8 w-8' />
            </div>
            <p className="font-normal p-5 text-gray-700 group-hover:text-[#BB0A01] font-title">Logout</p>
          </a>
        </div>
      </div>
      <div className="w-full h-fit z-20">
        <BottomNavigation />
      </div>
    </div>
  )
}

export default ProfileSettings
