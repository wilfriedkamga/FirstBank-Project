import React from 'react'
import Header from '../../components/header/Header'
import BottomNavigation from '../../components/bottom navigation/BottomNavigation'

const Notifications = () => {
  return (
    <div className='w-full bg-white h-full p-2.5 flex flex-col'>
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <div className="flex flex-col pt-5 md:px-5 h-full w-full space-y-8 overflow-auto">
        <div className="mx-5 border-b border-gray-200 flex flex-row items-center justify-between">
            <h3 className='font-medium text-gray-500 font-account text-2xl'>Notifications</h3>
            <button className="inline-flex text-xs sm:text-sm bg-white px-2 sm:px-3 py-2 text-blue-500 items-center rounded font-medium
                shadow border focus:outline-none transform active:scale-50 transition-transform duration-700 hover:bg-blue-500
                hover:text-white hover:-translate-y-1 hover:scale-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 sm:mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
                Close
            </button>
        </div>
        <p className="mt-8 font-medium text-gray-500 text-sm">Today</p>
        <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
          <div className=" inline-flex items-center justify-between w-full">
            <div className="inline-flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/893/893257.png" alt="Messages Icon" className="w-6 h-6 mr-3" />
              <h3 className="font-bold text-base text-gray-800">System</h3>
            </div>
            <p className="text-xs text-gray-500">
              2 min ago
            </p>
          </div>
          <p className="mt-1 text-sm">
            The plan "Buy the Computer" already reach 70% of completion
          </p>
        </div>
        <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
          <div className=" inline-flex items-center justify-between w-full">
            <div className="inline-flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/893/893257.png" alt="Messages Icon" className="w-6 h-6 mr-3" />
              <h3 className="font-bold text-base text-gray-800">Femmes Solidaires</h3>
            </div>
            <p className="text-xs text-gray-500">
              1 hour ago
            </p>
          </div>
          <p className="mt-1 text-sm">
            Ça fait des jours on n'a plus signe de toi, qu'est-ce qu'il y a?
          </p>
        </div>
        <button
          className="inline-flex text-sm bg-white justify-center px-4 py-2 mt-12 w-full text-red-500 items-center rounded font-medium
          shadow border focus:outline-none transform active:scale-50 transition-transform duration-700 hover:bg-red-500
            hover:text-white hover:-translate-y-1 hover:scale-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 sm:mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          Clear all notifications
        </button>
      </div>
      <div className="w-full h-fit z-20">
        <BottomNavigation />
      </div>
    </div>
  )
}

export default Notifications
