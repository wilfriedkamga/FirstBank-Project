import React, { useState } from "react";
import TontinesServices from "../../../../../Services/TontinesServices";
import tontineStore from "../../../../../Store/Store";



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
};


const AddCaisse = () => {
  
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [frequence, setFrequence] = useState("hebdomadaire");
  const [date, setDate] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [type, setType] = useState("");
  

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

  const handleSubmit=()=>{
   
  }
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
      create_par:""
    }

   

    TontinesServices.CreateTontine(newTontine)
    .then((response)=>{
      
      setTontine(response.data.data)
      
    })
    .catch((error)=>{
        alert("error")
    })
  }

  return (
    <>
      {!end && view ? (
        <div className="pl-4 ">
          <form>
            <div className="text-base  font-bold leading-6 text-gray-900 mb-2 mt-2 m-2 ">
              Créer une caisse
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <label className="block mb-2 text-sm mt-3 ">
                Nom de la Caisse
              </label>
              <input
                value={nom}
                onChange={(e)=>{setNom(e.target.value)}}
                type="text"
                placeholder="Nom par defaut"
                className="bg-transparent rounded-lg px-3 placeholder-gray-900 py-2.5 2xl:py-3 border border-gray-300   outline-none  focus:ring-2 ring-blue-300"
                required
              />
              <label className="block mb-2 text-sm mt-3 ">Type de caisse</label>
              <select value={frequence} onChange={(e)=>{setFrequence(e.target.value)}} className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300">
                    <option value="hebdomadaire" selected>Statique</option>
                    <option value="mensuelle">Dynamique</option>
                  </select>
             
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

                <button  className="px-3 py-1 mr-2 hover:bg-red-900  bg-red-700 rounded-lg">
                  Annuler
                </button>
                <button
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
          <form onSubmit={(e: React.FormEvent<HTMLFormElement>)=>HandleCreate(e)}>
            <div className="text-base m-2 font-bold leading-6 text-gray-900 mb-2 mt-2">
              Créer une Caisse
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <label className="block mb-2 text-sm mt-3 ">
                Choisir un validateur
              </label>
              <select value={contact1} onChange={(e)=>setContact1(e.target.value)} className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300">
                <option value="value1">contact1</option>
                <option value="value2">contact2</option>
                <option value="value2">contact3</option>
              </select>
              <label className="block mb-2 text-sm mt-3 ">
                Choisir un validateur
              </label>
              <select value={contact2} onChange={(e)=>setContact2(e.target.value)}  className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300">
                <option value="value1">contact1</option>
                <option value="value2">contact2</option>
                <option value="value2">contact3</option>
              </select>

              <div className="flex justify-end mt-[15vh] text-white mt-2">
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


export default AddCaisse
