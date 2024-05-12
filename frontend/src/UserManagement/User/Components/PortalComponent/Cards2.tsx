import React from 'react';


const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
          <div className='w-4/5 shadow-xl flex flex-col p-4 my-2 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white'  alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Gérer les événements</h2>
              <p className='text-center text-4xl font-bold'>Mariage</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Deuils</p>
                  <p className='py-2 border-b mx-8'>Naissance</p>
                  <p className='py-2 border-b mx-8'>....</p>
              </div>
              <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Visite</button>
          </div>
          <div className='w-4/5 shadow-xl flex flex-col p-4 my-2 rounded-lg hover:scale-105 duration-300'>
              <img className='w-20 mx-auto mt-[-3rem] bg-white'  alt="/" />
              <h2 className='text-2xl font-bold text-center py-8'>Gérer les événements</h2>
              <p className='text-center text-4xl font-bold'>Mariage</p>
              <div className='text-center font-medium'>
                  <p className='py-2 border-b mx-8 mt-8'>Deuils</p>
                  <p className='py-2 border-b mx-8'>Naissance</p>
                  <p className='py-2 border-b mx-8'>....</p>
              </div>
              <button className='bg-black w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>Visite</button>
          </div>
        
      </div>
    </div>
  );
};

export default Cards;
