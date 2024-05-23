import React, { useEffect, useRef, useState } from 'react'
import TontineCard from './TontineCard';
import AddTontine from './AddTontine';
import TontinesServices from '../../../../../Services/TontinesServices';
import tontineStore from '../../../../../Store/Store';
import TontineCardM from './TontineCardM';


type Tontine = {
    id: string;
    nom: string;
    description: string;
    type: string;
    frequence: string;
    jourReunion: string;
    nbCaisse:number;
    nbMembre:number;
   
  };
  type TTontineModel = {
    id:string,
    nom: string;
    description: string;
    type: string;
    frequence: string;
    jourReunion: string;
    nbCaisse:number;
    nbMembre:number;
  };
  

  const BoardView: React.FC = () => {
    const [toogle,setToogle]=useState(false)
    const butRef=useRef<HTMLDivElement | null>(null);
    const menuRef=useRef<HTMLDivElement | null>(null);

    const useStoreTontine=tontineStore((state:any)=>state.tontine)
    const[tontinesList,setTontinesList]=useState<TTontineModel[]>([])
    const [tontine,setTontine]=useState<TTontineModel>()
    
   useEffect(()=>{
     Initializepage()
    
   },[])

   const Initializepage=()=>{
    TontinesServices.GetTontines()
    .then((response) => {
      
      setTontinesList(response.data.data)
      console.log(response.data.data)
      
    })
    .catch((error) => {
      console.log(error);
     
    });
  }
    
  const addTontine=(tontine:TTontineModel)=>{
    console.log(tontine)
    setTontinesList(tontinesList.concat(tontine))

  }
  

  return (
    <div className=''>
      <div className='w-full py-4 grid sm:bg-transparent grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10 '>
         { tontinesList.map((tontine: Tontine, index: number) => (
          <>
            <div className='hidden sm:block lg:block'>
              <TontineCard  tontine={tontine}/>
           </div>
           <div className='block sm:hidden lg:hidden p-1'>
              <TontineCardM  tontine={tontine}/>
           </div>
          </>     
      ))}
      {tontinesList==null || tontinesList.length==0?<div className='text-lg'> Vous n'êtes dans aucune tontine !</div>:null}
       </div>
        <div ref={butRef} onClick={()=>{setToogle(!toogle);}}  className='text-xl cursor-pointer absolute  sm:bottom-8 sm:right-8 right-8 bottom-[75px]  w-[70px] h-[70px] sm:h-[60px] sm:w-[60px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold'>
            +
        </div>

        {toogle &&<div ref={menuRef} className='absolute h-[65vh] border-[1px] border-green sm:h-[55vh] sm:top-40 sm:w-[30vw] shadow-lg  bg-[#a09b9b] top-[13vh]  sm:right-[25vw] right-[1vw] rounded-lg   '>
                    <AddTontine addTontine={addTontine}  />
        </div>}

        
         
    </div>
  )
}

export default BoardView