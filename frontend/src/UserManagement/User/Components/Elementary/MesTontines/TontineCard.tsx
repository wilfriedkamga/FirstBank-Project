import { Button } from '@mui/material'
import React from 'react'
import { formatDate } from '../Utils'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import UserInfo from './UserInfo';
import { Link } from 'react-router-dom';

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

  type ChildComponentProps={
    tontine:Tontine
  }
 const add=(baseUrl:string, id:string)=>{return baseUrl+id}
const TontineCard = ({tontine}:ChildComponentProps) => {
  return (
    <div className='w-full  bg-white shadow-md px-2 rounded'>
        <div className='w-full flex justify-between'>
                <div className="flex flex-1 gap-1 items-center text-sm font-medium">
                
                <span className='uppercase'> {tontine.type}</span>
                </div>
                {true?<button className='text-black font-extrabold text-lg'>...</button>:null}
        </div>
        <>
          <div className='flex items-center gap-2'>
          
            <h4 className='line-clamp-2 text-black uppercase'>{tontine.nom}</h4>
          </div>
          <span className='text-sm text-gray-600'>
            {formatDate(new Date())}
          </span>
        </>
        <div className='w-full border-t border-gray-200 my-2' />
            <div className='flex justify-center items-center gap-9'>
                <div className='flex gap-1 items-center text-sm text-gray-600'>
                    <PeopleOutlineIcon />
                    <span>{tontine.nbMembre}</span>
                </div>
                <div className='flex gap-1 items-center text-sm text-gray-600 '>
                    <SavingsOutlinedIcon />
                    <span>{tontine.nbCaisse}</span>
                </div>
                <div className='flex gap-1 items-center text-sm text-gray-600 '>
                    <NotificationsNoneIcon />
                    <span>{/*tontine.nbNotifications*/}10</span>
                </div>
            </div>
         
          <div className='py-4 border-t border-gray-200'>
            <h5 className='text-base line-clamp-1 text-black'>
              Prochaine réunion programmée
            </h5>
            <div className='p-4 space-x-8'>
              
              <span className='bg-blue-600/10 px-3 py-1 rounded0full text-blue-700 font-medium'>
              {formatDate(new Date())}
              
              </span> <button  className='bg-red-600 hover:bg-red-800 mt-3 text-white font-bold rounded-xl border-[#666666] border-[1px] shadow-lg  w-2/5'><Link to={"/tontine/mestontines/"+tontine.id}> Visiter</Link></button>
            </div>
          </div>
         
    </div>
  )
}

export default TontineCard