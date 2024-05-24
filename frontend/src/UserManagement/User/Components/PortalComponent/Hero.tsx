import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Variable from '../../../../Variable';

type ChildComponentProps = {
  handleClick: () => void;
  
};



const Hero = ({handleClick}:ChildComponentProps) => {

  const [username,setUsername]=useState<String>("")

  useEffect(() => {
    // Récupérer le nom de l'utilisateur à partir du localStorage
    console.log("Ce block est exécuté")
    const user = Variable.getLocalStorageItem("user")
    setUsername(user.user.fullName); // Remplacez 'name' par le bon champ
    console.log(user.user.phone)
    console.log("Ce block est exécuté jusqu'`ala fin")

  });


  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto  text-center flex flex-col justify-center'>
        <p className='text-[#00df9a]  text-2xl font-bold p-2'>
          Outils de gestion des tontines {username && <span className='ml-2 text-black font-bold'>{username}</span>}
        </p>
       
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
          Gérez vos tontines avec simplicité et efficacité.
          </p>
          
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit..</p>
        <Link to="/tontine">
             <button onClick={handleClick} className='bg-[#666666]  w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white'>Accéder</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
