import React, { useState, ChangeEvent, useEffect } from "react";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Variable from "../../../Variable";
import Authentications from "../../../Services/Authentications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

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
  const [rectoImage, setRectoImage] = useState("");
  const [versoImage, setVersoImage] = useState("");

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setRectoImage(user.user.cniRecto);
    setVersoImage(user.user.cniVerso);
    setPhone(user.user.phone);
  }, []);

  const handleRectoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result as string;
      setRectoImage(imageUrl);
    };

    if (file) {
      setRectoFile(file)
      reader.readAsDataURL(file);
    }
  };

  const handleVersoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      const imageUrl = reader.result as string;
      setVersoImage(imageUrl);
    };

    if (file) {
      setVersoFile(file)
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData();
    const file2=new Blob();

    if(rectoFile && versoFile){
        
      formData.append("phone", phone);
      formData.append("cniRecto", rectoFile);
      formData.append("cniVerso", versoFile);
      formData.append("photo", file2);
      formData.append("signature", file2);

      Authentications.uploadFile(formData)
        .then((response) => {
          const reader1 = new FileReader();
          const reader2=new FileReader();

          reader1.onload = () => {
            const imageUrl = reader1.result as string;
            setCniRectoPath(imageUrl);
            const user = Variable.getLocalStorageItem("user");
          const updatedUser = {
            ...user.user,
            cniRecto:imageUrl
          };
          Variable.setLocalStorageItem("user", { user: updatedUser });
          
          }; 

          reader2.onload = () => {
            const imageUrl = reader2.result as string;
            setCniVersoPath(imageUrl);
            const user = Variable.getLocalStorageItem("user");
          const updatedUser = {
            ...user.user,
            cniVerso:imageUrl
          };
          Variable.setLocalStorageItem("user", { user: updatedUser });
          
          };
          reader1.readAsDataURL(rectoFile);
          reader2.readAsDataURL(versoFile);

        })
        .catch((error) => {});
    }
    }
     

    

  return (
    <div className="w-full font-semibold bg-white h-full flex flex-col">
      <Header />

      <div className="flex   mt-[10vh] flex-col justify-center items-center h-50vh bg-white w-full md:w-4/5 mx-auto">
        <div className=" fixed top-[9vh] flex w-full   md:w-3/5">
          <div className="bg-white w-[15vw] sm:w-[10vw] flex justify-center items-center   shadow h-[10vh]">
            <button
              className="  rounded-lg"
              onClick={() => navigate("/settings")}
            >
              <KeyboardBackspaceIcon style={{ fontSize: "2rem" }} />
            </button>
          </div>
          <div className="bg-white  w-full flex pl-6 items-center shadow h-[10vh]">
            Carte Nationale D'identité
          </div>
        </div>
        <div className="flex flex-col font-semibold  mt-9 rounded-lg mb-2 mx-auto w-full md:w-3/5 p-2 md:p-5 shadow-lg  h-full">
          <div className="mb-5 w-full px-2.5">
            <div className="flex flex-col  md:p-4">
              <div className="w-full flex justify-center items-center p-4 flex-col gap-4">
                <p>Recto de la carte</p>
                <div className=" flex justify-center items-center p-2 w-full md:w-4/5 h-[30vh] border-2 border-gray-300 rounded-lg cursor-pointer ">
                  <img
                    src={rectoImage}
                    alt="nothing"
                    className="object-cover  h-full w-full object-center "
                  />
                </div>

                <label
                  htmlFor="idcard"
                  className="flex flex-col items-center justify-center w-4/5 md:w-3/5  h-20 border-2 border-gray-300 border-dashed rounded-lg  bg-gray-50"
                >
                  <div className="">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        size="2x"
                        className="text-gray-500"
                      />
                      <p className="text-xs text-gray-500 font-title">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleRectoChange(e)}
                      name="idcard"
                      id="idcard"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-base font-title rounded-lg focus:ring-red-500 focus:border-red-500 outline-none w-full h-52 px-2.5 py-24 hidden"
                    />
                  </div>
                </label>
              </div>

              <div className="w-full flex justify-center items-center p-4 flex-col gap-4">
                <p>Verso de la carte</p>
                <label
                  htmlFor="idca"
                  className="flex flex-col items-center justify-center p-2 w-full md:w-4/5  border-2 border-gray-300 h-[30vh] rounded-lg cursor-pointer bg-gray-50"
                >
                  <img
                    src={versoImage}
                    alt="nothing"
                    className="object-cover  h-full w-full object-center "
                  />
                </label>

                <label
                  htmlFor="idcar"
                  className="flex flex-col items-center justify-center w-4/5 md:w-3/5  h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                >
                  <div className="p-2">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        size="2x"
                        className="text-gray-500"
                      />
                      <p className="text-xs text-gray-500 font-title">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      name="id"
                      onChange={(e) => handleVersoChange(e)}
                      id="idcar"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-500 text-base font-title rounded-lg focus:ring-red-500 focus:border-red-500 outline-none w-full h-52 px-2.5 py-24 hidden"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="mb-5 flex justify-center items-center px-8 w-full">
            <input
              type="submit"
              value="Valider"
              onClick={(e) => handleUpload(e)}
              className="px-5 py-2 mt-2 bg-red-600 w-full  text-white font-bold rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCNI;
