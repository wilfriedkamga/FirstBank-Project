import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import TontineCard from './TontineCard';
import AddTontine from './AddTontine';
import TontinesServices from '../../../../../Services/TontinesServices';
import TontineCardM from './TontineCardM';
import Variable from '../../../../../Variable';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { dividerClasses } from '@mui/material';



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
    id: string;
    nom: string;
    description: string;
    type: string;
    frequence: string;
    jourReunion: string;
    nbCaisse: number;
    nbMembre: number;
    create_par: string;
    id_admin1:string;
    id_admin2:string;
    id_admin3:string;
  };
  

  const BoardView: React.FC = () => {
    const [toogle,setToogle]=useState(false)
    const butRef=useRef<HTMLDivElement | null>(null);
    const menuRef=useRef<HTMLDivElement | null>(null);
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
      if(response.data.data.length!=0){setIsLoading(false)}
      
    })
    .catch((error) => {
      console.log(error);
    });

  }
    
  const addTontine=(tontine:TTontineModel)=>{
    
    setTontinesList(tontinesList.concat(tontine))

  }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    position:"absolute",
    fontWeight:"bold"
  };
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  

  return (
    <div className=''>
      {isLoading?
      
      <div className='absolute bottom-[50vh] left-[55vw]'> 
        <PropagateLoader
        color={"white"}
        loading={isLoading}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      :
      <div>
        <div className='w-full grid  grid-cols-2 sm:grid-cols-2 md:grid-cols-4 mb-5 gap-4 2xl:gap-10 '>
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
       </div>
       {tontinesList==null || tontinesList.length==0?<div className='text-lg w-full text-center text-white font-bold'> Vous n'êtes dans aucune tontine !</div>:null}
      </div>}
      
      

      
        <div ref={butRef} onClick={()=>{setAddTontineVisibility(!addTontineVisibility);}}  className='text-xl cursor-pointer absolute  sm:bottom-8 sm:right-8 right-8 bottom-[75px]  w-[70px] h-[70px] sm:h-[60px] sm:w-[60px] flex justify-center items-center  rounded-full  bg-red-700 text-white font-bold'>
            +
        </div>

        {addTontineVisibility &&<div ref={menuRef} className='absolute shadow-sm shadow-white h-[65vh] w-[90vw] mr-4 mx-auto  border-[1px] border-red-600 sm:h-[55vh] sm:top-40 sm:w-[30vw] shadow-lg bg-white  sm:bg-white top-[13vh]  sm:right-[25vw] right-[1vw] rounded-lg   '>
                    <AddTontine setVisibility={setAddTontineVisibility} addTontine={addTontine}  />
        </div>}

        
         
    </div>
  )
}

export default BoardView