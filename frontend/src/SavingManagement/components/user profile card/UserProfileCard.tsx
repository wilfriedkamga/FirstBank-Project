import React from 'react'

const UserProfileCard = () => {
  return (
    <div className='w-full'>
       <div className="rounded-t-lg h-56 overflow-hidden bg-[#BB0A01]">
       </div>
       <div className="ml-5 md:ml-16 w-36 h-36 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-36" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front' />
       </div>
    </div>
  )
}

export default UserProfileCard
