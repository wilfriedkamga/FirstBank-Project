import React, { useEffect, useRef, useState } from 'react'
import TontineCard from './TontineCard';
import AddTontine from './AddTontine';
import TontinesServices from '../../../../../Services/TontinesServices';
import tontineStore from '../../../../../Store/Store';
import TontineCardM from './TontineCardM';
import Variable from '../../../../../Variable';


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
    const [addTontineVisibility,setAddTontineVisibility]=useState<boolean>(false)
    
    
   useEffect(()=>{
    const user = Variable.getLocalStorageItem("user")
     Initializepage(user.user.phone)
    
   },[])

   const Initializepage=(phone:string)=>{
    TontinesServices.GetTontines(phone)
    .then((response) => {
      setTontinesList(response.data.data)
      console.log(response.data.data)
      
    })
    .catch((error) => {
      console.log(error);
    });

  }
    
  const addTontine=(tontine:TTontineModel)=>{
    
    setTontinesList(tontinesList.concat(tontine))

  }
  

  return (
    <div className=''>
      <div className='w-full grid sm:bg-transparent grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 2xl:gap-10 '>
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
        <div ref={butRef} onClick={()=>{setAddTontineVisibility(!addTontineVisibility);}}  className='text-xl cursor-pointer absolute  sm:bottom-8 sm:right-8 right-8 bottom-[75px]  w-[70px] h-[70px] sm:h-[60px] sm:w-[60px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold'>
            +
        </div>

        {addTontineVisibility &&<div ref={menuRef} className='absolute shadow-sm shadow-white h-[65vh]  border-[1px] border-green-800 sm:h-[55vh] sm:top-40 sm:w-[30vw] shadow-lg  bg-[#a09b9b] top-[13vh]  sm:right-[25vw] right-[1vw] rounded-lg   '>
                    <AddTontine setVisibility={setAddTontineVisibility} addTontine={addTontine}  />
        </div>}

        
         
    </div>
  )
}

export default BoardView