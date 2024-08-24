import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TontinesServices from "../../../../Services/TontinesServices";
import Variable from "../../../../Variable";

type TMembreCaisseModel = {
  id: string;
  nomUtilisateur: string;
  role: string;
  id_caisse: string;
  idutiliateur: string;
  creer_par: string;
  date_creation: string;
};
type ChildComponentProps = {
  setVisibility: (isVisible: boolean) => void;
  visibility: boolean;
};

const extractTontineId = (url: string): string => {
  const parts = url.split("/");
  return parts[3]; // L'ID de la tontine est à l'indice 3 dans le tableau de segments
};

const AddTontineMembre = ({
  setVisibility,
  visibility,
}: ChildComponentProps) => {
  const [contact, setContact] = useState("");
  const [nom, setNom] = useState("");
  const [role, setRole] = useState("");
  const [end, setEnd] = useState<boolean>(false);
  useState<TMembreCaisseModel>();
  const [phone, setPhone] = useState("");
  const location = useLocation();
  const [tontineMembreList, setTontineMembreList] = useState<
    TMembreCaisseModel[]
  >([]);
  const [creator, setCreator] = useState("");

  const HandleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const membreCaisse: TMembreCaisseModel = {
      id: "",
      nomUtilisateur: nom,
      role: role,
      id_caisse: extractIdCaisse(location.pathname),
      idutiliateur: contact,
      creer_par: phone,
      date_creation: "",
    };

    TontinesServices.addMembreCaisse(membreCaisse)
      .then((response) => {
        console.log(response.data.data);
      })
      .then((error) => {});
  };

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setPhone(user.user.phone);
  }, []);

  const extractIdCaisse = (url: string): string => {
    const pattern = url.split("/");
    const chaine = pattern[5];
    return chaine;
  };

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setCreator(user.user.phone);
  }, []);

  useEffect(() => {
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

  return (
    <div className="">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          HandleAdd(e);
          setVisibility(!visibility);
        }}
      >
        <div className="text-base m-2 font-bold leading-6 text-gray-900 mb-2 mt-2">
          Ajouter un membre
        </div>
        <div className=" flex mx-4 flex-col gap-1">
          <label className="block mb-2 text-sm mt-3 ">Nom du membre</label>
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

          <div className="flex gap-4 justify-between">
            <div className=" w-full">
              <label className="block mb-2 text-sm mt-3 ">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-transparent w-full rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
              >
                <option value="" disabled>
                  chosir le role
                </option>
                <option value="validateur">ADMINISTRATEUR</option>
                <option value="participant">PRESIDENT</option>
                <option value="participant">ADHERENT</option>
              </select>
            </div>
          </div>

          <label className="block mb-2 text-sm mt-3 ">Contact</label>

          <select
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
          >
            {tontineMembreList &&
              tontineMembreList.map(
                (item: TMembreCaisseModel, index: number) => (
                  <option key={index} value={item.nomUtilisateur}>
                    {item.idutiliateur}
                  </option>
                )
              )}
          </select>

          <div className="flex justify-end mt-4  text-white ">
            <button
              onClick={() => {
                setEnd(false);
                setVisibility(!visibility);
              }}
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
  );
};

export default AddTontineMembre;
