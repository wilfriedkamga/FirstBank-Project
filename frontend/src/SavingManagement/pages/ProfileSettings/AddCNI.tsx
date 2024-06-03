import React, { useState, ChangeEvent, useEffect } from "react";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Variable from "../../../Variable";
import Authentications from "../../../Services/Authentications";

type TUploadFileModel = {
  cniRecto: string;
  cniVerso: string;
  signature: string;
  photo: string;
  phone: string;
};

const AddCNI: React.FC = () => {
  const navigate = useNavigate();
  const [cniRectoPath, setCniRectoPath] = useState("");
  const [cniVersoPath, setCniVersoPath] = useState("");
  const [cniRectoPathInput, setcniRectoPathInput] = useState("");
  const [cniVersoPathInput, setCniVersoPathInput] = useState("");
  const [rectoFile, setRectoFile] = useState<File>();
  const [rectoFilePath, setRectoFilePath] = useState<string>("");

  const [versoFile, setVersoFile] = useState<File>();
  const [versoFilePath, setVersoFilePath] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setCniRectoPath(user.user.cniRecto);
    setCniVersoPath(user.user.cniVerso);
    setPhone(user.user.phone);
  }, []);

  const handleUpload = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (
      cniRectoPath == null ||
      cniRectoPath == "" ||
      cniVersoPath == null ||
      cniVersoPath == ""
    ) {
      alert(
        "Vous n'avez pas choisi de fichier ou alors le chemin de votre fichier est vice"
      );
    } else {
        alert(cniRectoPath+cniVersoPath)
      const uploadFile: TUploadFileModel = {
        cniRecto: cniRectoPath,
        cniVerso: cniVersoPath,
        photo: "",
        phone: phone,
        signature: "",
      };

      Authentications.uploadFile(uploadFile)
        .then((response) => {
          const user = Variable.getLocalStorageItem("user");
          const updatedUser = {
            ...user.user,
            cniRecto: cniRectoPath,
            cniVerso: cniVersoPath,
          };
          Variable.setLocalStorageItem("user", { user: updatedUser });
          alert("success");
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="w-full font-semibold bg-white h-[100vh] p-2.5 flex flex-col">
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <div className="flex  mt-5 flex-col justify-center items-center h-50vh bg-white w-full md:w-4/5 mx-auto">
        <div className="flex flex-row w-full md:w-3/5">
          <div className="bg-white w-[15vw] sm:w-[10vw] flex justify-center items-center border shadow h-[10vh]">
            <button
              className=" px-2 rounded-lg"
              onClick={() => navigate("/settings")}
            >
              <KeyboardBackspaceIcon style={{ fontSize: "3rem" }} />
            </button>
          </div>
          <div className="bg-white font-bold w-full flex pl-6 items-center shadow h-[10vh]">
            Carte Nationale D'identité
          </div>
        </div>
        <div className="flex flex-col font-semibold border mt-2 rounded-lg mb-2 mx-auto w-full md:w-3/5 p-2 md:p-5 shadow-lg border h-full">
          <div className="flex w-full flex-col">
            <div className="flex flex-col ">
              <label className="block mb-1 ml-2 px-5 text-sm mt-3">
                Recto de la CNI
              </label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setRectoFile(file);
                  setRectoFilePath(file ? file.name : "");
                }}
                className="px-5 py-2 ml-2 mt-2 text-transparent font-bold rounded cursor-pointer"
              />
              <textarea
                value={cniRectoPath}
                placeholder="Chemin vers l'image Recto de votre CNI (Aucune)"
                className="block ml-6 w-4/5 px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                disabled
                required
              />
            </div>

            <div className="flex flex-col ">
              <label className="block ml-2 px-5 mb-1 text-sm mt-3">
                Verso de la CNI
              </label>
              <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setVersoFile(file);
                  setVersoFilePath(file ? file.name : "");
                }}
                className="px-5 py-2 ml-2 mt-2 text-transparent font-bold rounded cursor-pointer"
              />
              <textarea
                value={cniVersoPath}
                placeholder="Chemin vers l'image Verso de votre CNI (Aucune)"
                className="block ml-6 w-4/5 px-5 py-3  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                disabled
                required
              />
            </div>
          </div>

          <div className="mt-5 flex justify-between">
            <input
              type="submit"
              value="Valider"
              onClick={(e) => handleUpload(e)}
              className="px-5 py-2 mt-2 bg-red-600  text-white font-bold rounded cursor-pointer"
            />
            <input
              type="button"
              value="Annuler"
              onClick={() => navigate("/settings")}
              className="px-5 py-2  bg-gray-600 text-white font-bold rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCNI;
