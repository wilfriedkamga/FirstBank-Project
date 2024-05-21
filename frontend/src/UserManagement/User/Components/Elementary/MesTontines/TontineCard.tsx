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
 
};

  type ChildComponentProps={
    tontine:Tontine
  }
 const add=(baseUrl:string, id:string)=>{return baseUrl+id}
const TontineCard = ({tontine}:ChildComponentProps) => {
  return (
    <div className='w-full h-fit bg-white shadow-md p-4 rounded'>
        <div className='w-full flex justify-between'>
                <div className="flex flex-1 gap-1 items-center text-sm font-medium">
                <span className='text-lg'><SearchRoundedIcon /></span>
                <span className='uppercase'> {tontine.type}</span>
                </div>
                {true?<button>...</button>:null}
        </div>
        <>
          <div className='flex items-center gap-2'>
            <div
              className="w-4 h-4 bg-red-600 rounded-full"
            />
            <h4 className='line-clamp-1 text-black uppercase'>{tontine.nom}</h4>
          </div>
          <span className='text-sm text-gray-600'>
            {formatDate(new Date())}
          </span>
        </>
        <div className='w-full border-t border-gray-200 my-2' />
          <div className='flex items-center justify-between mb-2'>
            <div className='flex items-center gap-3'>
                <div className='flex gap-1 items-center text-sm text-gray-600'>
                    <PeopleOutlineIcon />
                    <span>{/*tontine.nbMembres*/}10</span>
                </div>
                <div className='flex gap-1 items-center text-sm text-gray-600 '>
                    <SavingsOutlinedIcon />
                    <span>{/*tontine.nbCaisses*/}10</span>
                </div>
                <div className='flex gap-1 items-center text-sm text-gray-600 '>
                    <NotificationsNoneIcon />
                    <span>{/*tontine.nbNotifications*/}10</span>
                </div>
            </div>

                <div className='flex flex-row-reverse'>
                
                    <div className="w-7 h-7 rounded-full text-white flex items-center justify-center mr-5">
                    <UserInfo />
                    <UserInfo />
                    <UserInfo />
                    </div>
                </div>
               
          </div>
          <div className='py-4 border-t border-gray-200'>
            <h5 className='text-base line-clamp-1 text-black'>
              Prochaine réunion programmée
            </h5>
            <div className='p-4 space-x-8'>
              
              <span className='bg-blue-600/10 px-3 py-1 rounded0full text-blue-700 font-medium'>
              {formatDate(new Date())}
              
              </span> <button className='bg-gray-600 hover:bg-red-700 mt-3 rounded-xl border-gray-600 border shadow-lg  w-2/5'><Link to={"/tontine/mestontines/"+tontine.id}> Visiter</Link></button>
            </div>
          </div>
         
    </div>
  )
}

export default TontineCard