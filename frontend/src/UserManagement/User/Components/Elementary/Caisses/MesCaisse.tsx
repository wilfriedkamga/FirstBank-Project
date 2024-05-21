import React from 'react'
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import { useNavigate, useLocation } from "react-router-dom";



    const stats = [
      {
        id: "1hjkl",
        label: "Caisse 1",
        total: 4,
        icon: <SpaceDashboardSharpIcon />,
        bg: "bg-[#1d4ed8]",
      },
      {
        id: "2ioiuokk",
        label: "Caisse 2",
        total:  4,
        icon: <SpaceDashboardSharpIcon />,
        bg: "bg-[#0f766e]",
      },
      {
        id: "3jkkiui",
        label: "Caisse 3 ",
        total:12,
        icon: <SpaceDashboardSharpIcon />,
        bg: "bg-[#f59e0b]",
      },
      {
        id: "4njhuujk",
        label: "Caisse 4",
        total: 5,
        icon: <SpaceDashboardSharpIcon />,
        bg: "bg-[#be185d]" || 0,
      },
      
      {
        id: "4",
        label: "Caisse 5",
        total: "3",
        icon: <SpaceDashboardSharpIcon />,
        bg: "bg-[#be185d]" || 0,
      },
    ];
    
const MesCaisse = () => {
    const navigate=useNavigate()
    const location = useLocation();
    
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
    const viewCard = (path: string) => {
        navigate(path);
      };

      const currentPath = location.pathname + "/";
  return (
    <div>
          
              <div   className='grid p-4 grid-cols-1 md:grid-cols-4 gap-5'>
                {stats.map(({ icon, bg, label, total,id }, index) => (
                    <div className='cursor-pointer' onClick={()=>viewCard(currentPath+id)}>
                      <Card key={index} icon={icon} bg="w-10 h-10 rounded-full flex items-center bg-red-700 justify-center text-white" label={label} count={total} />
                    </div>
                  
                ))}
            
         </div>
    </div>
  )
}

export default MesCaisse