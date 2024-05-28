import React from 'react'
import BottomNavigation from '../../components/bottom navigation/BottomNavigation'
import Header from '../../components/header/Header'
import AccountBalanceBox from '../../components/accountBalance/AccountBalanceBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faHandHoldingUsd, faHeadset, faPeopleGroup, faPiggyBank, faComment } from '@fortawesome/free-solid-svg-icons';
import RecentTontine from '../../components/recentTontine/RecentTontine';
import { Link } from 'react-router-dom';

const Portal = () => {
  return (
    <div className='w-full bg-white h-full p-2 flex flex-col'>
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <div className="flex flex-col pt-5 h-full w-full space-y-8 overflow-auto">
        <AccountBalanceBox />
        <div className="mb-5 ml-5 border-b border-gray-200">
          <h3 className='font-title font-semibold text-[#0C1013] text-md'>Savings App Services</h3>
        </div>
        <div className="flex flex-row w-full justify-start space-x-6 md:space-x-24">
          <Link to="/newPlan" className='w-18 justify-center'>
            <div className="rounded-lg h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon icon={faPiggyBank} size='lg' className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5" />
            </div>
            <span className='font-account text-center block'>Create a plan</span>
          </Link>
          <Link to="/savings/app/contribute/plan" className='w-18 justify-center'>
            <div className="rounded-lg h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon icon={faHandHoldingUsd} size='lg' className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5" />
            </div>
            <span className='font-account text-center block'>Contribute for a plan</span>
          </Link>
        </div>
        <div className="mb-5 ml-5 border-b border-gray-200">
          <h3 className='font-title font-semibold text-[#0C1013] text-md'>Tontine App Services</h3>
        </div>
        <div className="flex flex-row w-full justify-start space-x-6 md:space-x-24">
          <Link to="/tontine/app/tontine/new" className='w-18 justify-center'>
            <div className="rounded-lg h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon icon={faPeopleGroup} size='lg' className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5" />
            </div>
            <span className='font-account text-center block'>Create a Tontine</span>
          </Link>
          <Link to="/tontine/app/contribute/fund" className='w-18 ml-3 justify-center'>
            <div className="rounded-lg h-16 w-16 mb-1 mx-5 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon icon={faCoins} size='lg' className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5" />
            </div>
            <span className='font-account text-center block'>Contribute to a fund</span>
          </Link>
        </div>
        <div className='h-fit'>
          <div className="mb-5 ml-5 border-b border-gray-200">
            <h3 className='font-title font-semibold text-[#0C1013] text-md'>Recent Tontines</h3>
          </div>
          <RecentTontine />
        </div>
        <div className='mt-16'>
          <div className="mb-5 ml-5 border-b border-gray-200">
            <h3 className='font-title font-semibold text-[#0C1013] text-md'>Need help ?</h3>
          </div>
          <Link to="/contact-us" className='w-2/3 flex flex-col'>
            <div className="rounded-lg h-16 w-16 mb-1 ml-8 md:h-24 md:w-24 p-2.5 md:p-3.5">
              <FontAwesomeIcon icon={faHeadset} size='lg' className="text-[#0C1013] bg-gray-400 rounded-full md:p-5 p-2.5" />
            </div>
            <span className='font-account text-center ml-5 md:ml-7 block w-1/3 md:w-1/12'>Contact an agent</span>
          </Link>
        </div>
        <div className="fixed end-6 bottom-20 group z-30">
          <button type='button' className='flex items-center justify-center text-white bg-gray-400 hover:bg-[#d07975] rounded-full shadow-md w-14 h-14 focus:ring-4'>
            <FontAwesomeIcon icon={faComment} size='lg' className="text-[#0C1013] rounded-full md:p-5 p-2.5 w-5 h-5" /> 
            <span className='sr-only'>Chatbot</span>
          </button>
        </div>
      </div>
      <div className="w-full h-fit z-20">
        <BottomNavigation />
      </div>
    </div>
  )
}

export default Portal
