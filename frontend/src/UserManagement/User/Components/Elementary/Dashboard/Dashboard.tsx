import React from 'react'
import SpaceDashboardSharpIcon from '@mui/icons-material/SpaceDashboardSharp';



function Dashboard() {
  const stats = [
    
    {
      _id: "4",
      label: "Mes dettes",
      total: "3",
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#be185d]" || 0,
    },
    {
      _id: "4",
      label: "Mes dettes",
      total: "3",
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#be185d]" || 0,
    },
    {
      _id: "4",
      label: "Mes dettes",
      total: "3",
      icon: <SpaceDashboardSharpIcon />,
      bg: "bg-[#be185d]" || 0,
    }
    
  ];
  
  

  const Card = ({ label, count, bg, icon }:any) => {
    
   
    return (
      
      <div className='w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between'>
        <div className='h-full flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"5 dernier mois"}</span>
        </div>
        
        <div
          className={bg}
        >
          {icon}
        </div>
      </div>
    );
  };
 

  const Style="w-10 h-10 rounded-full flex items-center justify-center text-white"

  return (
    <div>
        <div className='h-full py-4'>
            <div className='grid p-4 grid-cols-2 md:grid-cols-4 gap-5'>
              {stats.map(({ icon, bg, label, total }, index) => (
                <Card key={index} icon={icon} bg="w-10 h-10 rounded-full flex items-center bg-red-700 justify-center text-white" label={label} count={total} />
              ))}
            </div>
       </div>
   
    </div>
  )
}

export default Dashboard