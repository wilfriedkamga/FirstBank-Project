import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Variable from "../../../../Variable";
import TontinesServices from "../../../../Services/TontinesServices";

type TTontineModel = {
  id: string;
  nom: string;
  description: string;
  type: string;
  frequence: string;
  jourReunion: string;
  nbCaisse: number;
  nbMembre: number;
  create_par: string;
  id_admin1: string;
  id_admin2: string;
  id_admin3: string;
};

type AddTontineProps = {
  addTontine: (tontine: TTontineModel) => void;
  setVisibility: (test: boolean) => void;
};

const AddTontine = ({ addTontine, setVisibility }: AddTontineProps) => {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [frequence, setFrequence] = useState("hebdomadaire");
  const [date, setDate] = useState("");
  const [contact1, setContact1] = useState("");
  const [contact2, setContact2] = useState("");
  const [type, setType] = useState("");
  const [creator, setCreator] = useState("");

  const [end, setEnd] = useState(false);
  const [view, setView] = useState(true);
  const [tontine, setTontine] = useState<TTontineModel>({
    id: "",
    nom: "",
    description: "",
    type: "",
    frequence: "",
    jourReunion: "",
    nbCaisse: 0,
    nbMembre: 0,
    create_par: "",
    id_admin1: "",
    id_admin2: "",
    id_admin3: "",
  });

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setCreator(user.user.phone);
  }, []);
  const HandleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (contact1.length > 3 && contact2.length > 3) {
      const newTontine: TTontineModel = {
        id: "",
        nom: nom,
        description: description,
        frequence: frequence,
        type: type,
        jourReunion: date,
        nbCaisse: 0,
        nbMembre: 1,
        create_par: creator,
        id_admin1: creator,
        id_admin2: contact1,
        id_admin3: contact2,
      };

      TontinesServices.CreateTontine(newTontine)
        .then((response) => {
          setVisibility(false);
          setTontine(response.data.data);
          newTontine.id = response.data.data.id;
          addTontine(newTontine);
        })
        .catch((error) => {});
    } else {
      alert("Il faut remplir les contacts");
      // Handle missing contacts
    }
  };

  return (
    <>
      {!end && view ? (
        <div className=" ">
          <form>
            <div className="text-base  font-bold leading-6 text-gray-900 mb-2 mt-2 m-2 ">
              Créer une association
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <label className="block mb-2 text-sm mt-3 ">
                Nom de l'association
              </label>
              <input
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                }}
                type="text"
                placeholder="Nom de la tontine"
                className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                required
              />

              <div className="w-full pr-2">
                <label className="block mb-2 text-sm mt-3 ">
                  Périodicité des réunions
                </label>
                <select
                  value={frequence}
                  onChange={(e) => {
                    setFrequence(e.target.value);
                  }}
                  className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                >
                  <option value="hebdomadaire">Hebdomadaire</option>
                  <option value="mensuelle">Mensuelle</option>
                  <option value="mensuelle">Bimensuelle</option>
                  <option value="trimestrielle">Trimestrielle</option>
                  <option value="trimestrielle">Autre</option>
                </select>
              </div>
              <div className="w-full pr-2">
                <label className="block mb-2 text-sm mt-3 ">
                  Jour de réunion
                </label>

                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                >
                  <option value="Lundi">Lundi</option>
                  <option value="Mardi">Mardi</option>
                  <option value="Mercredi">Mercredi</option>
                  <option value="Jeudi">Jeudi</option>
                  <option value="Vendredi">Vendredi</option>
                  <option value="Samedi">Samedi</option>
                  <option value="Dimanche">Dimanche</option>
                </select>
              </div>

              <div className="flex justify-end text-white mt-5 ">
                <button
                  onClick={() => setVisibility(false)}
                  className="px-3 py-1 mr-2 hover:bg-red-900 bg-red-700 rounded-lg"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    if (nom) {
                      setEnd(true);
                    } else {
                      // Handle missing name
                    }
                  }}
                  className="px-3 py-1 hover:bg-gray-800 bg-gray-500 rounded-lg"
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
            }}
          >
            <div className="text-base m-2 font-bold leading-6 text-gray-900 mb-2 mt-2">
              Créer une association
            </div>
            <div className=" flex mx-4 flex-col gap-1">
              <div className="flex gap-2">
                <div className="flex flex-col w-3/5">
                  <label className="block mb-2 text-sm mt-3 ">
                    Contact admin 2
                  </label>
                  <PhoneInput
                    country={"cm"}
                    value={contact1}
                    onChange={(phone) => setContact1(phone)}
                    containerClass="w-full mb-2"
                    buttonStyle={{ backgroundColor: "transparent" }}
                    dropdownStyle={{ backgroundColor: "" }}
                    inputStyle={{ backgroundColor: "transparent" }}
                    inputClass="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full"
                  />
                </div>
                <div className="flex-col flex w-2/5">
                  <label className="block mb-2 text-sm mt-3 ">Role</label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                  >
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Mercredi">Mercredi</option>
                    <option value="Jeudi">Jeudi</option>
                    <option value="Vendredi">Vendredi</option>
                    <option value="Samedi">Samedi</option>
                    <option value="Dimanche">Dimanche</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col w-3/5">
                  <label className="block mb-2 text-sm mt-3 ">
                    Contact admin 2
                  </label>
                  <PhoneInput
                    country={"cm"}
                    value={contact1}
                    onChange={(phone) => setContact1(phone)}
                    containerClass="w-full mb-2"
                    buttonStyle={{ backgroundColor: "transparent" }}
                    dropdownStyle={{ backgroundColor: "" }}
                    inputStyle={{ backgroundColor: "transparent" }}
                    inputClass="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full"
                  />
                </div>
                <div className="flex-col flex w-2/5">
                  <label className="block mb-2 text-sm mt-3 ">Role</label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                  >
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Mercredi">Mercredi</option>
                    <option value="Jeudi">Jeudi</option>
                    <option value="Vendredi">Vendredi</option>
                    <option value="Samedi">Samedi</option>
                    <option value="Dimanche">Dimanche</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col w-3/5">
                  <label className="block mb-2 text-sm mt-3 ">
                    Contact admin 2
                  </label>
                  <PhoneInput
                    country={"cm"}
                    value={contact1}
                    onChange={(phone) => setContact1(phone)}
                    containerClass="w-full mb-2"
                    buttonStyle={{ backgroundColor: "transparent" }}
                    dropdownStyle={{ backgroundColor: "" }}
                    inputStyle={{ backgroundColor: "transparent" }}
                    inputClass="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full"
                  />
                </div>
                <div className="flex-col flex w-2/5">
                  <label className="block mb-2 text-sm mt-3 ">Role</label>
                  <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
                  >
                    <option value="Lundi">Lundi</option>
                    <option value="Mardi">Mardi</option>
                    <option value="Mercredi">Mercredi</option>
                    <option value="Jeudi">Jeudi</option>
                    <option value="Vendredi">Vendredi</option>
                    <option value="Samedi">Samedi</option>
                    <option value="Dimanche">Dimanche</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end text-white mt-2">
                <button
                  onClick={() => setEnd(false)}
                  className="px-3 py-1 m-2 hover:bg-red-900 bg-red-700 rounded-lg"
                >
                  Retour
                </button>
                <input
                  type="submit"
                  value="Créer"
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

export default AddTontine;
