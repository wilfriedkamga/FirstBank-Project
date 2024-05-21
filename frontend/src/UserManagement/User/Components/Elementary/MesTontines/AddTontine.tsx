import React, { useRef, useState } from "react";
import SelectInput from "../SelectInput/SelectInput";

type Tontine = {
  id: string;
  nom: string;
  Description: string;
  nbMembres: number;
  type: string;
  nbNotifications: number;
  nbCaisses: number;
  Admins: { nom: string; telephone: string }[];
};

type BoardViewProps = {
  table: Tontine[];
};

type ChildComponentProps={
  label:string,
  options:string[],

}

const AddTontine = ({ ref }: any) => {
  const LISTS = ["En présentiel", "En ligne", "Mixte"];
  const PRIORIRY = [
    "Hebdomadaire",
    "Mensuel",
    "Trimestriel",
    "Annuel",
    "Indéterminé",
  ];
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const handleNomChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };
  const [end, setEnd] = useState(false);

  const [tontine, setTontine] = useState<Tontine>();

  return (
    <>
      {!end ? (
        <div>
          <form ref={ref}>
            <div className="text-base m-2 font-bold leading-6 text-gray-900 mb-4">
              Créer une tontine1
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <label className="block mb-2 text-sm mt-3 ">
                Nom de la tontine
              </label>
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
              <div className=" flex">
                <div className="w-1/2 px-2 ">
                  <label className="block mb-2 text-sm mt-3 ">
                    Mode des réunions
                  </label>
                  <input
                    value={nom}
                    onChange={handleNomChange}
                    type="text"
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg"
                    required
                  />
                </div>
                <div className="w-1/2 px-2">
                  <label className="block mb-2 text-sm mt-3 ">
                    Mode des réunions
                  </label>
                 
                </div>
              </div>

              <div className="flex justify-end text-white mt-2">
                <button className="px-3 py-1 m-2 hover:bg-red-900  bg-red-700 rounded-lg">
                  Annuler
                </button>
                <button
                  onClick={() => setEnd(true)}
                  className="px-3 py-1 m-2 hover:bg-gray-800 bg-gray-500 rounded-lg"
                >
                  Suivant
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <form ref={ref}>
            <div className="text-base m-2 font-bold leading-6 text-gray-900 mb-4">
              Créer une tontine2
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <label className="block mb-2 text-sm mt-3 ">
                Nom de la tontine
              </label>
              <select className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white rounded-lg">
                <option value="value1">contact1</option>
                <option value="value2">contact2</option>
                <option value="value2">contact3</option>
              </select>
              <label className="block mb-2 text-sm mt-3 ">Description</label>
              <select className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 ">
                <option value="value1">contact1</option>
                <option value="value2">contact2</option>
                <option value="value2">contact3</option>
              </select>

              <label className="block mb-2 text-sm mt-3 ">Description</label>
              <select className="py-3 px-2 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500">
                <option selected>Open this select menu</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>

              <div className="flex justify-end text-white mt-2">
                <button
                  onClick={() => setEnd(false)}
                  className="px-3 py-1 m-2 hover:bg-red-900  bg-red-700 rounded-lg"
                >
                  Retour
                </button>
                <button className="px-3 py-1 m-2 hover:bg-gray-800 bg-gray-500 rounded-lg">
                  Créer
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddTontine;
