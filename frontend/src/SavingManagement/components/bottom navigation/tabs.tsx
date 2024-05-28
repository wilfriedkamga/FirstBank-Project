import { icon } from '@fortawesome/fontawesome-svg-core'
import { BanknotesIcon, HomeIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import React from 'react'

const tabs = [
    {
        name: 'Home', 
        href: '/portal', 
        icon: <HomeIcon className="h-8 w-8 text-2xl pt-1 mx-5 mb-1 block" />
    },
    {
        name: "Savings app",
        href: '/savings',
        icon: <BanknotesIcon className="h-8 w-8 text-2xl pt-1 mx-5 mb-1 block" />
    },
    {
        name: "Tontine app",
        href: '/tontine',
        icon: <UserGroupIcon className="h-8 w-8 text-2xl pt-1 mx-5 mb-1 block" />
    }
]

export default tabs
