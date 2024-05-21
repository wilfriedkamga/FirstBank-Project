import React, { useRef, useState } from 'react'
import TontineCard from './TontineCard';
import AddTontine from './AddTontine';

type ChildComponentProps={
    table:any[]
}
type Tontine = {
    id: string;
    nom: string;
    Description: string;
    nbMembres: number;
    type: string;
    nbNotifications: number;
    nbCaisses: number;
    Admins: { nom: string; telephone: string }[];
  };
  
  type BoardViewProps = {
    table: Tontine[];
  };
  
  
  const tontinesList=[
    {
        "id":"123455678",
        "nom":"Les jeunes de bandjoun",
        "Description":"C'est une tontine qui regroupe l'ensemble des jeunes de bandjoun",
        "nbMembres":12,
        "type":"En ligne",
        "nbNotifications":3,
        "nbCaisses":2,
        "Admins":[
            {
                "nom":"kamga junior",
                "telephone":" +237 650657843"

            },
            {
                "nom":"kamga junior",
                "telephone":" +237 650657843"

            },
            {
                "nom":"kamga junior",
                "telephone":" +237 650657843"

            }
        ]
    },
  ]


  const BoardView: React.FC = () => {
    const [toogle,setToogle]=useState(false)
    const butRef=useRef<HTMLDivElement | null>(null);
    const menuRef=useRef<HTMLDivElement | null>(null);
    const[tontine,setTontine]=useState<Tontine>()

   

  return (
    <div className=''>
      {tontinesList.map((tontine: Tontine, index: number) => (
        <div className='w-full overflow-auto py-4 grid grid-cols-1 p-4 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
        <TontineCard tontine={tontine}/>
       </div>
      ))}
        <div ref={butRef} onClick={()=>setToogle(!toogle)}  className='text-xl cursor-pointer absolute bottom-0 right-8  w-[40px] h-[40px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold'>
            +
        </div>

        {toogle &&<div ref={menuRef} className='absolute w-[35vw] h-[60vh] bg-gray-100 top-40 right-64 rounded-lg   '>
                    <AddTontine />
        </div>}

        
         
    </div>
  )
}

export default BoardView