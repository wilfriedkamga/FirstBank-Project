import React from 'react'
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import { useNavigate, useLocation } from "react-router-dom";

function UneCaisse() {

    const stats = [
        {
          id: "1hjkl",
          label: "parametres",
          total: 4,
          icon: <SpaceDashboardSharpIcon />,
          bg: "bg-[#1d4ed8]",
        },
        {
          id: "2ioiuokk",
          label: "cotisations",
          total:  4,
          icon: <SpaceDashboardSharpIcon />,
          bg: "bg-[#0f766e]",
        },
        {
          id: "dettes",
          label: "dettes",
          total:12,
          icon: <SpaceDashboardSharpIcon />,
          bg: "bg-[#f59e0b]",
        },
        {
          id: "4njhuujk",
          label: "sanctions",
          total: 5,
          icon: <SpaceDashboardSharpIcon />,
          bg: "bg-[#be185d]" || 0,
        },
        
        {
          id: "4",
          label: "cagnotte",
          total: "3",
          icon: <SpaceDashboardSharpIcon />,
          bg: "bg-[#be185d]" || 0,
        },
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
     
    const navigate=useNavigate()
    const location=useLocation()
    const Style="w-10 h-10 rounded-full flex items-center justify-center text-white"
    const viewCard = (path: string) => {
        navigate(path);
      };

      const currentPath = location.pathname + "/";

  return (
<>
    
    <div className="bg-red-600 rounded-xl border w-4/5 h-20 flex justify-center items-center sm:w-1/5 text-white font-extrabold text-xl">
       500 000 FCFA
    </div>

    <div >
    <div>
          
          <div   className='grid p-4 grid-cols-1 md:grid-cols-4 gap-5'>
            {stats.map(({ icon, bg, label, total,id }, index) => (
                <div className='cursor-pointer' onClick={()=>viewCard(currentPath+label)}>
                  <Card key={index} icon={icon} bg="w-10 h-10 rounded-full flex items-center bg-red-700 justify-center text-white" label={label} count={total} />
                </div>
              
            ))}
        
     </div>
</div>

    </div>
</>
  )
}

export default UneCaisse