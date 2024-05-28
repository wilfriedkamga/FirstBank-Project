import React, { useEffect, useState } from "react";
import TontinesServices from "../../../../../Services/TontinesServices";
import Variable from "../../../../../Variable";
import { useLocation } from "react-router-dom";

type TCaisseModel = {
  id: string;
  nom: string;
  total: string;
  type: string;
  montant: string;
  bg: string;
  tontine_id: string;
  creerPar: string;
  nbMembres: number;
};

type TCaisseMembreModel = {
  id: string;
  nomUtilisateur: string;
  role: string;
  id_caisse: string;
  idutiliateur: string;
  creer_par: string;
};

type AddCaisseProps = {
  addCaisse: (tontine: TCaisseModel) => void;
  setVisibility: (test: boolean) => void;
};

const AddCaisse = ({ addCaisse, setVisibility }: AddCaisseProps) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [montant, setMontant] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [type, setType] = useState("");
  const [creator, setCreator] = useState("");
  const location = useLocation();

  const [end, setEnd] = useState(false);
  const [view, setView] = useState(true);
  const [tontineMembreList, setTontineMembreList] = useState<
    TCaisseMembreModel[]
  >([]);

  const [caisse, setCaisse] = useState<TCaisseModel>({
    id: "",
    nom: "",
    total: "",
    type: "",
    montant: "",
    bg: "",
    tontine_id: "",
    creerPar: "",
    nbMembres: 0,
  });

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setCreator(user.user.phone);
  }, []);

  useEffect(() => {
    console.log(location.pathname)
    tontineMembreListInit(extractTontineId(location.pathname));
  }, []);

  const tontineMembreListInit = (idTontine: string) => {
    TontinesServices.GetMembresTontine(idTontine)
      .then((response) => {
        console.log(response.data.data);
        setTontineMembreList(response.data.data);
      })
      .catch((error) => {});
  };

  const HandleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCaisse: TCaisseModel = {
      id: "",
      nom: nom,
      total: description,
      type: type,
      montant: montant,
      bg: "",
      tontine_id: extractTontineId(location.pathname),
      creerPar: creator,
      nbMembres: 1,
    };

    TontinesServices.CreateCaisse(newCaisse)
      .then((response) => {
        setVisibility(false);
        setCaisse(response.data.data);
        newCaisse.id = response.data.data.id;
        addCaisse(newCaisse);
      })
      .catch((error) => {console.log("Passe ici")});
  };
  const extractTontineId = (url: string): string => {
    const parts = url.split("/");
    return parts[3]; // L'ID de la tontine est à l'indice 3 dans le tableau de segments
  };

  return (
    <>
      {!end && view ? (
        <div className=" ">
          <form>
            <div className="text-base  font-bold leading-6 text-gray-900 mb-2 mt-2 m-2 ">
              Créer une Caisse
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <label className="block mb-2 text-sm mt-3 ">
                Nom de la Caisse
              </label>
              <input
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
                type="text"
                placeholder="Nom par defaut"
                className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                required
              />
              <label className="block mb-2 text-sm mt-3 ">Description</label>
              <input
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                type="text"
                placeholder="Ent"
                className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                required
              />
              <div className="w-full flex gap-4 justify-between ">
                <div className="w-1/2 pr-2">
                  <label className="block mb-2 text-sm mt-3 ">
                    Type de la caisse
                  </label>
                  <select
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                  >
                    <option value="" className="text-gray-300">
                      choisir le type de la caisse
                    </option>
                    <option value="Statique">Statique</option>
                    <option value="Dyanamique">Dynamique</option>
                  </select>
                </div>
                <div className="  w-1/2 pr-2">
                  <label className="block mb-2 text-sm mt-3 ">
                    Montant des contributions
                  </label>
                  <input
                    required
                    type="text"
                    value={montant}
                    onChange={(e) => setMontant(e.target.value)}
                    className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                  />
                </div>
              </div>

              <div className="flex justify-end text-white mt-5 ">
                <button
                  onClick={() => setVisibility(false)}
                  className="px-3 py-1 mr-2 hover:bg-red-900  bg-red-700 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setEnd(true);
                  }}
                  className="px-3 py-1  hover:bg-gray-800 bg-gray-500 rounded-lg"
                >
                  Suivant
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="">
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              HandleCreate(e);
              setVisibility(false);
            }}
          >
            <div className="text-base m-2 font-bold leading-6 text-gray-900 mb-2 mt-2">
              Créer une Caisse
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <label className="block mb-2 text-sm mt-3 ">Validateur 1</label>
              <select
                value={contact1}
                onChange={(e) => setContact1(e.target.value)}
                className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
              >
                {tontineMembreList &&
                  tontineMembreList.map(
                    (item: TCaisseMembreModel, index: number) => (
                      <option key={index} value={item.idutiliateur}>
                        {"Nom: "+item.nomUtilisateur}{" Phone:"+item.idutiliateur}
                      </option>
                    )
                  )}
              </select>
              <label className="block mb-2 text-sm mt-3 ">Validateur 2</label>
              <select
                value={contact2}
                onChange={(e) => setContact2(e.target.value)}
                className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
              >
                {tontineMembreList &&
                  tontineMembreList.map(
                    (item: TCaisseMembreModel, index: number) => (
                      <option
                        key={index}
                        value={item.nomUtilisateur}
                        disabled={item.idutiliateur == contact1}
                      >
                        {"Nom: "+item.nomUtilisateur}{" Phone:"+item.idutiliateur}
                      </option>
                    )
                  )}
              </select>
              <div className="flex justify-end mt-[100px] text-white mt-2">
                <button
                  onClick={() => setEnd(false)}
                  className="px-3 py-1 m-2 hover:bg-red-900  bg-red-700 rounded-lg"
                >
                  Retour
                </button>
                <input
                  type="submit"
                  value="Creer"
                  className="px-3 py-1 m-2 hover:bg-gray-800 bg-gray-500 rounded-lg"
                />
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddCaisse;
