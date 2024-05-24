import React, { useState } from 'react'
import SpaceDashboardSharpIcon from "@mui/icons-material/SpaceDashboardSharp";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import { useNavigate, useLocation } from "react-router-dom";
import AddTontine from '../MesTontines/AddTontine';
import AddCaisse from './AddCaisse';



    const stats = [
      {
        id: "1hjkl",
        label: "Caisse 1",
        total: 4,
        type:"statique",
        montant:"50 000 FCFA",
        icon: <KeyboardArrowRightIcon/>,
        bg: "bg-[#1d4ed8]",
      },
      {
        id: "2ioiuokk",
        label: "Caisse 2",
        total:  4,
        type:"statique",
        montant:"600 000 FCFA",
        icon: <KeyboardArrowRightIcon/>,
        bg: "bg-[#0f766e]",
      },
      {
        id: "3jkkiui",
        label: "Caisse 3 ",
        total:12,
        type:"statique",
        montant:"400 000 FCFA",
        icon: <KeyboardArrowRightIcon/>,
        bg: "bg-[#f59e0b]",
      },
      {
        id: "4njhuujk",
        label: "Caisse 4",
        total: 5,
        type:"statique",
        montant:"1000 000 FCFA",
        icon: <KeyboardArrowRightIcon/>,
        bg: "bg-[#be185d]" || 0,
      },
      
      {
        id: "4",
        label: "Caisse 5",
        total: "3",
        type:"dynamique",
        montant:"1000 000 FCFA",
        icon: <KeyboardArrowRightIcon/>,
        bg: "bg-[#be185d]" || 0,
      },
    ];
    
const MesCaisse = () => {
    const navigate=useNavigate()
    const location = useLocation();
    const [toogle,setToogle]=useState(false)
    
    const Card = ({ label, count, bg,type, icon,montant }:any) => {
      
     
        return (
          
          <div className='sm:w-[250px] w-full h-[150px] bg-white p-5 shadow-md rounded-md flex  items-center'>
            <div className='h-full flex  flex-1 flex-col'>
              <p className='font-bold text-xl text-gray-600'>
                <p className=''>{label}</p>
                <p className='text-lg font-normal '>{type}</p>
                </p>
              
              <span className='text-sm mt-2 text-gray-400'>{count} membres</span>
              <span className='text-lg mt-2 font-semibold text-gray-800'>{montant}</span>
              
            </div>
            
            <div
              className={bg+"text-xl text-white font-bold"}
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

      const addCaisse=()=>{
    
  }
      const currentPath = location.pathname + "/";
  return (
    <div>
          
              <div   className='grid p-4 grid-cols-1 md:grid-cols-4 gap-5'>
                {stats.map(({ icon,type, bg, label,montant, total,id }, index) => (
                    <div className='cursor-pointer' onClick={()=>viewCard(currentPath+id)}>
                      <Card key={index} montant={montant} type={type} icon={icon} bg="w-10 h-10 rounded-full flex items-center bg-red-700 justify-center text-white" label={label} count={total} />
                    </div>
                  
                ))}
            
         </div>
         <div onClick={()=>{setToogle(!toogle);}}   className='text-[20px] cursor-pointer absolute  sm:bottom-8 sm:right-8 right-8 bottom-[75px]  w-[70px] h-[70px] sm:h-[60px] sm:w-[60px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold'>
            +
        </div>

        {toogle &&<div  className='absolute h-[65vh] border-[1px] border-green sm:h-[55vh] sm:top-40 sm:w-[30vw] shadow-lg  bg-[#a09b9b] top-[13vh]  sm:right-[25vw] right-[1vw] rounded-lg   '>
                    <AddCaisse />
        </div>}
    </div>
  )
}

export default MesCaisse