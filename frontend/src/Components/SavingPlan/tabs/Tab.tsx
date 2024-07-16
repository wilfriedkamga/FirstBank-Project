import React, { useState } from 'react'

interface Tabs {
    id: string;
    label: string
    content: React.ReactNode 
}

interface TabsProps {
    tabs: Tabs[],
    /* handlePlan: (plan : Plan) => void */
}

const Tab: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id)

    const handleTabChange = (tabId : string) => {
        setActiveTab(tabId)
    }
  return (
    <div className='flex flex-wrap w-full'>
      <div className=" w-full border-b border-gray-300 px-2.5 pt-2.5">
        <ul className="flex w-full md:w-1/3 overflow-x-auto">
            {tabs.map((tab) => (
                <li key={tab.id} className="w-full">
                    <button className={`${
                        activeTab === tab.id? 'border-b-2 border-red-700' : ''
                    } hover:bg-red-300 rounded-t-md transition duration-300 text-nowrap font-title text-sm md:text-base ease-in-out h-16 py-1 px-4`}
                    onClick={() => handleTabChange(tab.id)}
                    >
                        {tab.label}
                    </button>
                </li>
            ))}
        </ul>
      </div>
      <div className="w-full mt-5">
        {tabs.map((tab)=>(
            <div key={tab.id} className={`${
                activeTab === tab.id? 'block' : 'hidden'
            } p-4`}>
                {tab.content}
            </div>
        ))}
      </div>
    </div>
  )
}

export default Tab
