import React, { useEffect, useRef, useState } from 'react'
import TontineCard from './TontineCard';
import AddTontine from './AddTontine';
import TontinesServices from '../../../../../Services/TontinesServices';

type ChildComponentProps={
    table:any[]
}
type Tontine = {
    id: string;
    nom: string;
    description: string;
    type: string;
    frequence: string;
    jourReunion: string;
   
  };
  
  type BoardViewProps = {
    table: Tontine[];
  };
  
  


  const BoardView: React.FC = () => {
    const [toogle,setToogle]=useState(false)
    const butRef=useRef<HTMLDivElement | null>(null);
    const menuRef=useRef<HTMLDivElement | null>(null);
    const[tontinesList,setTontinesList]=useState<Tontine[]>([
      {
        id:"111111",
        nom:"les jeunes ",
        description:"Voici la description des re",
        type:"En ligne",
        frequence:"Hebdomadaire",
        jourReunion:"lundi"

      }])
    
   useEffect(()=>{
    Initializepage()
    
   },tontinesList)

   const Initializepage=()=>{
    TontinesServices.GetTontines()
    .then((response) => {
      console.log(JSON.stringify(response.data.data, null, 2) )
      setTontinesList(response.data.data)
      
    })
    .catch((error) => {
      console.log(error);
     
    });
  }
    

   

  return (
    <div className=''>
      <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10 '>
         { tontinesList.map((tontine: Tontine, index: number) => (
        <TontineCard tontine={tontine}/>
      ))}
       </div>
        <div ref={butRef} onClick={()=>{setToogle(!toogle);Initializepage()}}  className='text-xl cursor-pointer absolute bottom-0 right-8  w-[40px] h-[40px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold'>
            +
        </div>

        {toogle &&<div ref={menuRef} className='absolute w-[35vw] h-[60vh] bg-[#7f6d6d] top-40 right-64 rounded-lg   '>
                    <AddTontine  />
        </div>}

        
         
    </div>
  )
}

export default BoardView