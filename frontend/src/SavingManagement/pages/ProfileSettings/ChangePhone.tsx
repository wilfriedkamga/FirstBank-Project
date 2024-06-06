import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import UserAvatar from "../../../UserManagement/User/Components/Elementary/Navbar/UserAvatar";
import { Navigate, useNavigate } from "react-router-dom";
import TontinesServices from "../../../Services/TontinesServices";
import Authentications from "../../../Services/Authentications";
import Variable from "../../../Variable";
import PhoneInput from "react-phone-input-2";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import axios from "axios";

const ChangePhone = () => {
  const navigate = useNavigate();
  const [Phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [verifier, setVerifier] = useState<boolean>(true);
  const [rectoFile, setRectoFile] = useState<File | null>(null);
  const [versoFile, setVersoFile] = useState<File | null>(null);
  const [rectoFilePath, setRectoFilePath] = useState<string>("");
  const [versoFilePath, setVersoFilePath] = useState<string>("");

  const handleUpload = async () => {
    const formData = new FormData();
    if (rectoFile) formData.append("recto", rectoFile);
    if (versoFile) formData.append("verso", versoFile);

    try {
      const response = await axios.post("http://62.169.22.170:8088/api/uploadCNI", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(`Téléchargement réussi : ${response.data}`);
    } catch (error) {
      console.error("Erreur lors du téléchargement des fichiers !", error);
      alert("Erreur lors du téléchargement des fichiers");
    }
  };
  return (
    <div className="w-full bg-white h-[100vh] p-2.5 flex flex-col">
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>

      {verifier ? (
        <form action="" onSubmit={(e) => null}>
          <div className="flex mt-5 flex-col justify-center items-center  h-50vh bg-white w-full  md:w-4/5 mx-auto">
            <div className="flex flex-row w-full md:w-2/5">
              <div className=" bg-white w-[15vw] sm:w-[10vw] flex justify-center items-center border  shadow h-[10vh]">
                <button
                  className="px-2 rounded-lg "
                  onClick={() => navigate("/settings")}
                >
                  <KeyboardBackspaceIcon style={{ fontSize: "3rem" }} />
                </button>
              </div>
              <div className=" bg-white flex font-bold w-full flex pl-6  items-center  shadow h-[10vh]">
                Modifier votre numero de telephone
              </div>
            </div>
            <div className="flex flex-col font-semibold bg-white mt-2 rounded-lg mb-2 mx-auto w-full md:w-2/5 p-2 md:p-5 shadow-lg border h-full">
              <div className="flex w-full flex-col  ">
                <label className="block mb-2 text-sm mt-3 ">
                  Entrez votre numero de telephone
                </label>
                <PhoneInput
                  inputClass="block required:true w-full h-full mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  country={"cm"}
                  onChange={(value: any) => setPhone(value)}
                  countryCodeEditable={false}
                />
                <input
                  type="button"
                  value={"Vérifier"}
                  onClick={() => setVerifier(false)}
                  placeholder="Le nouveau numero de telephone"
                  className="  px-5 py-2 mt-5 bg-gray-600 rounded hover:bg-gray-800 text-white font-bold cursor-pointer"
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form action="" onSubmit={(e) => null}>
          <div className="flex mt-5 flex-col justify-center items-center  h-50vh bg-white w-full  md:w-4/5 mx-auto">
            <div className="flex flex-row w-full md:w-2/5">
              <div className=" bg-white w-[10vw]  flex justify-center items-center border  shadow h-[10vh]">
                <button
                  className=" px-2 rounded-lg "
                  onClick={() => setVerifier(true)}
                >
                  <KeyboardBackspaceIcon style={{ fontSize: "3rem" }} />
                </button>
              </div>
              <div className=" bg-white   font-bold w-full flex pl-6 items-center  shadow h-[10vh]">
                Verification par otp
              </div>
            </div>
            <div className="flex flex-col font-semibold bg-white mt-2 rounded-lg mb-2 mx-auto w-full md:w-2/5 p-2 md:p-5 shadow-lg border h-full">
              <div className="flex w-full flex-col  ">
                <label className="block mb-2 text-sm mt-3 ">
                  Entrez Le code qui vous a eté envoyé
                </label>
                <input
                  type={"text"}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter Otp Code"
                  className="block w-full py-3 px-5  text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
                <div className="mt-5 flex gap-10 justify-center">
                  <input
                    type="button"
                    value="Valider"
                    onClick={handleUpload}
                    className="px-5 py-2 ml-2 mt-2 bg-red-600  text-white font-bold rounded cursor-pointer"
                  />
                  <input
                    type="button"
                    value="Annuler"
                    onClick={() => navigate("/settings")}
                    className="px-5 py-2 ml-2 mt-2 bg-gray-600 text-white font-bold rounded cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChangePhone;
