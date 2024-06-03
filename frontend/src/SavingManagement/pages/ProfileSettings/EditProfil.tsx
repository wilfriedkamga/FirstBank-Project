import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditOffIcon from "@mui/icons-material/EditOff";
import Variable from "../../../Variable";
import { setDate } from "date-fns";
import Authentications from "../../../Services/Authentications";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

type TProfilModel = {
  phone: string;
  newPhone: string;
  fullName: string;
  birthDate: string;
  gender: string;
  password: string;
  email: string;
  idCardIm: string;
  signature: string;
  photo: string;
};

const EditProfil = () => {
  const navigate = useNavigate();
  const [editNom, setEditNom] = useState<boolean>(true);
  const [editMail, setEditMail] = useState<boolean>(true);
  const [ediBirthDate, setEditBirthDate] = useState<boolean>(true);
  const [editGender, setEditGender] = useState<boolean>(true);
  const [nom, setNom] = useState("");
  const [mail, setMail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const handleEditNom = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setEditNom(!editNom);
  };

  const handleEditGender = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setEditGender(!editGender);
  };

  const handleEditMail = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setEditMail(!editMail);
  };

  const handleEditBirthdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setEditBirthDate(!ediBirthDate);
  };
  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setNom(user.user.fullName);
    setMail(user.user.email);
    setBirthDate(user.user.birthDate);
    setGender(user.user.gender);
    setPhone(user.user.phone);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const profilModel: TProfilModel = {
      phone: phone,
      newPhone: phone,
      fullName: nom,
      birthDate: birthDate,
      gender: gender,
      password: "",
      email: mail,
      idCardIm: "",
      signature: "",
      photo: "",
    };

    Authentications.updateProfil(profilModel)
      .then((response) => {
        const user = Variable.getLocalStorageItem("user");
        const updatedUser = {
          ...user.user,
          email: mail,
          fullName: nom,
          gender: gender,
          birthDate: birthDate,
        };
        Variable.setLocalStorageItem("user", { user: updatedUser });
        alert("succèss");
      })
      .catch((error) => {});
  };

  return (
    <div className="w-full bg-white h-[100vh] p-2.5 flex flex-col">
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
        <div className="flex mt-5 flex-col  justify-center items-center  h-50vh bg-white w-full  md:w-4/5 mx-auto">
          <div className="flex rounded-lg flex-row  w-full md:w-2/5">
            <div className=" bg-white w-[15vw] sm:w-[10vw]  flex justify-center items-center border  shadow h-[10vh]">
              <button
                className=" px-2 rounded-lg "
                onClick={() => navigate("/settings")}
              >
                <KeyboardBackspaceIcon style={{ fontSize: "3rem" }} />
              </button>
            </div>
            <div className=" bg-white font-bold text-xl w-full flex pl-6 items-center  shadow h-[10vh]">
              Modifier votre profil
            </div>
          </div>
          <div className="flex flex-col bg-white font-semibold  mt-2 rounded-lg mb-2 mx-auto w-full md:w-2/5 p-2 md:p-5 shadow-lg border h-full">
            <div className="flex w-full flex-col">
              <label className="block mb-2 text-sm mt-3 ">Nom complet</label>
              <div className="flex  items-center gap-2">
                <input
                  type="text"
                  value={nom}
                  onChange={(e) => {
                    setNom(e.target.value);
                  }}
                  defaultValue={nom}
                  placeholder="Enter your password"
                  className="block w-4/5 px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                  disabled={editNom}
                />
                <button
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleEditNom(e)}
                  className=" w-[10vw] sm:w-[2vw] h-[5vh] text-white font-bold rounded-lg bg-red-600"
                >
                  {editNom ? <EditNoteIcon /> : <EditOffIcon />}
                </button>
              </div>
            </div>
            <div className="flex w-full flex-col">
              <label className="block mb-2 text-sm mt-3 ">Email</label>
              <div className="flex  items-center gap-2">
                <input
                  type="text"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  defaultValue={mail}
                  placeholder="Enter your password"
                  className="block w-4/5 px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  disabled={editMail}
                />
                <button
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleEditMail(e)}
                  className=" w-[10vw] sm:w-[2vw] h-[5vh] text-white font-bold rounded-lg bg-red-600"
                >
                  {editMail ? <EditNoteIcon /> : <EditOffIcon />}
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col">
              <label className="block mb-2 text-sm mt-3 ">
                Date de naissance
              </label>
              <div className="flex  items-center gap-2">
                <input
                  defaultValue={birthDate}
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  type="date"
                  placeholder="Enter your password"
                  className="block w-4/5 px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                  disabled={ediBirthDate}
                />
                <button
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleEditBirthdate(e)}
                  className=" w-[10vw] sm:w-[2vw] h-[5vh] text-white font-bold rounded-lg bg-red-600"
                >
                  {ediBirthDate ? <EditNoteIcon /> : <EditOffIcon />}
                </button>
              </div>
            </div>

            <div className="flex w-full flex-col">
              <label className="block mb-2 text-sm mt-3 ">Sexe</label>
              <div className="flex  items-center gap-2">
                <select
                  defaultValue={gender}
                  disabled={editGender}
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  name=""
                  id=""
                  className="block w-4/5 px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                </select>
                <button
                  onClick={(
                    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                  ) => handleEditGender(e)}
                  className=" w-[10vw] sm:w-[2vw] h-[5vh] text-white font-bold rounded-lg bg-red-600"
                >
                  {editGender ? <EditNoteIcon /> : <EditOffIcon />}
                </button>
              </div>
            </div>

            <div className="flex flex-row w-full mt-8 justify-between ">
              <input
                type="submit"
                value={"Valider"}
                placeholder="Enter your password"
                className=" px-5 py-2 bg-red-600 hover:bg-red-900  text-white font-bold rounded cursor-pointer"
              />
              <input
                type="button"
                value={"Annuler"}
                onClick={() => navigate("/settings")}
                placeholder="Enter your password"
                className="  px-5 py-2 bg-gray-600 rounded hover:bg-gray-800 text-white font-bold cursor-pointer"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfil;
