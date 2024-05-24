import React, { useEffect, useState } from "react";
import TontinesServices from "../../../../../Services/TontinesServices";
import tontineStore from "../../../../../Store/Store";
import Variable from "../../../../../Variable";



type TTontineModel={
  id:string,
  nom:string,
  description:string,
  type:string,
  frequence:string,
  jourReunion:string,
  nbCaisse:number;
  nbMembre:number;
  create_par:string;
}

type AddTontineProps = {
  addTontine: (tontine: TTontineModel) => void;
  setVisibility:(test:boolean)=>void;
};


const AddTontine = ({addTontine,setVisibility}:AddTontineProps) => {
  
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [frequence, setFrequence] = useState("hebdomadaire");
  const [date, setDate] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [type, setType] = useState("");
  const [creator,setCreator]=useState("")

  const [end, setEnd] = useState(false);
  const [view, setView]=useState(true)
  const [tontine, setTontine] = useState<TTontineModel>({
    
    id: "",
    nom: "",
    description:"",
    type:"",
    frequence:"",
    jourReunion:"",
    nbCaisse:0,
    nbMembre:0,
    create_par:""
    
  }); 

  useEffect(()=>{
    const user = Variable.getLocalStorageItem("user")
    setCreator(user.user.phone)
    
   },[])
  const useStoreTontine=tontineStore((state:any)=>state.create)

  const HandleCreate=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
   
    const newTontine:TTontineModel={
      id:"",
      nom:nom,
      description:description,
      frequence:frequence,
      type:type,
      jourReunion:date,
      nbCaisse:0,
      nbMembre:0,
      create_par:creator,
    }

   

    TontinesServices.CreateTontine(newTontine)
    .then((response)=>{
      
      setVisibility(false)
      setTontine(response.data.data)
      addTontine(newTontine)
    })
    .catch((error)=>{
        
    })
  }

  return (
    <>
      {!end && view ? (
        <div className=" ">
          <form>
            <div className="text-base  font-bold leading-6 text-gray-900 mb-2 mt-2 m-2 ">
              Créer une tontine
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <label className="block mb-2 text-sm mt-3 ">
                Nom de la tontine
              </label>
              <input
                value={nom}
                onChange={(e)=>{setNom(e.target.value)}}
                type="text"
                placeholder="Enter your password"
                className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                required
              />
              <label className="block mb-2 text-sm mt-3 ">Description</label>
              <input
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                type="text"
                placeholder="Enter your password"
                className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                required
              />
              <div className="w-full flex gap-4 justify-between ">
                <div className="w-1/2 pr-2">
                  <label className="block mb-2 text-sm mt-3 ">
                    Fréquence 
                  </label>
                  <select value={frequence} onChange={(e)=>{setFrequence(e.target.value)}} className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300">
                    <option value="hebdomadaire" selected>Hebdomadaire</option>
                    <option value="mensuelle">Mensuelle</option>
                    <option value="trimestrielle">Trimestrielle</option>
                    <option value="annuelle">Annuelle</option>
                  </select>
                </div>
                <div className="  w-1/2 pr-2">
                  <label className="block mb-2 text-sm mt-3 ">
                    Jour de réunion
                  </label>
                  <input  type="date" value={date} onChange={(e)=>setDate(e.target.value)} className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300" />
                </div>
              </div>

              <div className="flex justify-end text-white mt-5 ">

                <button onClick={()=>setVisibility(false)} className="px-3 py-1 mr-2 hover:bg-red-900  bg-red-700 rounded-lg">
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={() => { setEnd(true);}}
                  className="px-3 py-1  hover:bg-gray-800 bg-gray-500 rounded-lg"
                >
                  Suivant
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : view && (
        <div className="pl-4">
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>)=>{HandleCreate(e);setVisibility(false)}}>
            <div className="text-base m-2 font-bold leading-6 text-gray-900 mb-2 mt-2">
              Créer une tontine
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <label className="block mb-2 text-sm mt-3 ">
                Choisir un admin
              </label>
              <select value={contact1} onChange={(e)=>setContact1(e.target.value)} className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300">
                <option value="value1">contact1</option>
                <option value="value2">contact2</option>
                <option value="value2">contact3</option>
              </select>
              <label className="block mb-2 text-sm mt-3 ">
                Choisir un admin
              </label>
              <select value={contact2} onChange={(e)=>setContact2(e.target.value)}  className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300">
                <option value="value1">contact1</option>
                <option value="value2">contact2</option>
                <option value="value2">contact3</option>
              </select>

              <label className="block mb-2 text-sm mt-3 ">
                Type de réunions
              </label>
              <select value={type} onChange={(e)=>setType(e.target.value)}  className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300">
                <option>En ligne</option>
                <option selected>En présentiel</option>
                <option>Mixte</option>
              </select>

              <div className="flex justify-end text-white mt-2">
                <button
                  onClick={() => setEnd(false)}
                  className="px-3 py-1 m-2 hover:bg-red-900  bg-red-700 rounded-lg"
                >
                  Retour
                </button>
                <input type="submit" value="Creer" className="px-3 py-1 m-2 hover:bg-gray-800 bg-gray-500 rounded-lg"/>
                  
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddTontine;
