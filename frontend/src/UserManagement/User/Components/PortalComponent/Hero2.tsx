import React from 'react';

type ChildComponentProps = {
  handleClick: () => void;
  
};

const Hero2 = ({handleClick}:ChildComponentProps) => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto  text-center flex flex-col justify-center'>
        <p className='text-[#00df9a]  text-2xl font-bold p-2'>
          Outils de gestion des épargnes
        </p>
       
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
          Le meilleur outil qui vous permet de gérer vos épargnes.
          </p>
          
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms.</p>
        <button onClick={handleClick} className='bg-[#666666] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-white'>Accéder</button>
      </div>
    </div>
  );
};

export default Hero2;
