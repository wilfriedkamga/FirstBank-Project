import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

interface Tab {
    id: string;
    label: string;
    href: string;
}

const tabs: Tab[] = [
    {
        id: 'wallet',
        label: 'Wallet',
        href: '/savings/wallet-management'
    },
    {
        id: 'plans',
        label: 'Plans',
        href: '/savings/all-plans'
    }
]

const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState(tabs[0])
  return (
    <div className="w-full">
      <div className="relative right-0 flex flex-row">
        <div className="z-30 text-center w-1/6 md:w-1/12 p-1">
          <Link to={'/savings'} className='z-30 flex items-center justify-center px-2 py-1 mb-0 shadow-md border border-gray-100 transition-all ease-in-out border-0 rounded-lg cursor-pointer bg-[#BB0A01]'>
            <Squares2X2Icon className='h-6 w-6 text-white' />
          </Link>
        </div>
        <ul
          className="relative w-1/3 flex flex-row p-1 list-none rounded-xl"
          data-tabs="tabs"
          role="list"
        >
          {/* <li className='z-30 flex-auto text-center'>
            <Link to={'/savings'} className='z-30 flex items-center justify-center px-2 py-1 mb-0 shadow-md border border-gray-100 transition-all ease-in-out border-0 rounded-lg cursor-pointer bg-[#BB0A01] w-1/3'>
              <Squares2X2Icon className='h-6 w-6 text-white' />
            </Link>
          </li> */}
          {tabs.map((tab) => (
            <li key={tab.id} className="z-30 flex-auto text-center mx-2">
              <Link
                className={`z-30 flex items-center justify-center w-full py-1 px-2.5 mb-0 shadow-md border border-gray-100 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-[#BB0A01] ${selectedTab.id === tab.id
                    ? 'text-white bg-[#BB0A01]'
                    : ''}`}
                data-tab-target={tab.id}
                role="tab"
                aria-selected={selectedTab.id === tab.id ? 'true' : 'false'}
                aria-controls={tab.id}
                onClick={() => setSelectedTab(tab)} to={tab.href}>
                <span className="ml-1 text-center">{tab.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Tabs
