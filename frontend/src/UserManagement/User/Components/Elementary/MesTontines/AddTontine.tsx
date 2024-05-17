import React, { useRef, useState } from 'react'


const AddTontine = ({ref}:any) => {
    const LISTS = ["En présentiel", "En ligne", "Mixte"];
    const PRIORIRY = ["Hebdomadaire", "Mensuel", "Trimestriel", "Annuel","Indéterminé"];
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNom(event.target.value);
      };
    const [end,setEnd]=useState(false)

  return (
    <>
    {!end?<div>
         <form ref={ref} >
          <div className='text-base m-2 font-bold leading-6 text-gray-900 mb-4'>
            Créer une tontine1
          </div>
          <div className=' flex mx-4 flex-col gap-1'>
          <label className="block mb-2 text-sm mt-3 ">Nom de la tontine</label>
                <input
                 ref={ref}
                  value={nom}
                  onChange={handleNomChange}
                  type="text"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
                  required
                />
            <label className="block mb-2 text-sm mt-3 ">Description</label>
            <input
                  value={nom}
                  onChange={handleNomChange}
                  type="text"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
                  required
                />
                <div className=' flex'>
                  <div className='w-1/2 px-2 '>
                        <label className="block mb-2 text-sm mt-3 ">Mode des réunions</label>
                        <input
                        value={nom}
                        onChange={handleNomChange}
                        type="text"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
                        required
                      />
                  </div>
                  <div className='w-1/2 px-2'>
                        <label className="block mb-2 text-sm mt-3 ">Mode des réunions</label>
                        <input
                        value={nom}
                        onChange={handleNomChange}
                        type="text"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 mr-1 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
                        required
                      />
                  </div>

                 
               

                </div>

                <div className='flex justify-end text-white mt-2'>
                    <button  className='px-3 py-1 m-2 hover:bg-red-900  bg-red-700 rounded-lg'>Annuler</button>
                    <button onClick={()=>setEnd(true)} className='px-3 py-1 m-2 hover:bg-gray-800 bg-gray-500 rounded-lg'>Suivant</button>
                  </div>
                </div>
        </form>
    </div>

    :
    <div>
         <form ref={ref} >
          <div className='text-base m-2 font-bold leading-6 text-gray-900 mb-4'>
            Créer une tontine2
          </div>
          <div className=' flex mx-4 flex-col gap-1'>
          <label className="block mb-2 text-sm mt-3 ">Nom de la tontine</label>
                <input
                 ref={ref}
                  value={nom}
                  onChange={handleNomChange}
                  type="text"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
                  required
                />
            <label className="block mb-2 text-sm mt-3 ">Description</label>
            <input
                  value={nom}
                  onChange={handleNomChange}
                  type="text"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
                  required
                />
                <div className=' flex'>
                  <div className='w-1/2 px-2 '>
                        <label className="block mb-2 text-sm mt-3 ">Mode des réunions</label>
                        <input
                        value={nom}
                        onChange={handleNomChange}
                        type="text"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
                        required
                      />
                  </div>
                  <div className='w-1/2 px-2'>
                        <label className="block mb-2 text-sm mt-3 ">Mode des réunions</label>
                        <input
                        value={nom}
                        onChange={handleNomChange}
                        type="select"
                        placeholder="Enter your password"
                        className="block w-full px-5 py-3 mt-2 mr-1 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
                        required
                      />
                  </div>

                 
               

                </div>

                <div className='flex justify-end text-white mt-2'>
                    <button onClick={()=>setEnd(false)} className='px-3 py-1 m-2 hover:bg-red-900  bg-red-700 rounded-lg'>Retour</button>
                    <button className='px-3 py-1 m-2 hover:bg-gray-800 bg-gray-500 rounded-lg'>Créer</button>
                  </div>
                </div>
        </form>
    </div>
    
    }

  </>  
  )
}

export default AddTontine