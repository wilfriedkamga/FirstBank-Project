import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Variable from "../../../Variable";
import Authentications from "../../../Services/Authentications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Header from "../header/Header";
import AssoNotificationDialog from "../../../Front_Association/Component/Elementary/MesTontines/AssoNotificationDialog";

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
  const [notifTitle, setNotifTitle] = useState<string>("");
  const [notifMessage, setNotifMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

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
      setRectoFile(file);
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
      setVersoFile(file);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData();
    const file2 = new Blob();
    
    if (rectoFile && versoFile) {
      formData.append("phone", phone);
      formData.append("cniRecto", rectoFile);
      formData.append("cniVerso", versoFile);
      formData.append("photo", file2);
      formData.append("signature", file2);

      Authentications.uploadFile(formData)
        .then((response) => {
          const reader1 = new FileReader();
          const reader2 = new FileReader();

          reader1.onload = () => {
            const imageUrl = reader1.result as string;
            setCniRectoPath(imageUrl);
            const user = Variable.getLocalStorageItem("user");
            const updatedUser = {
              ...user.user,
              cniRecto: imageUrl,
            };
            Variable.setLocalStorageItem("user", { user: updatedUser });
            setNotifMessage(
              "Vos fichiers ont été uploader avec success sur le serveur."
            );
            setNotifTitle("Success");
            setDialogOpen(true);
          };

          reader2.onload = () => {
            const imageUrl = reader2.result as string;
            setCniVersoPath(imageUrl);
            const user = Variable.getLocalStorageItem("user");
            const updatedUser = {
              ...user.user,
              cniVerso: imageUrl,
            };
            Variable.setLocalStorageItem("user", { user: updatedUser });
          };
          reader1.readAsDataURL(rectoFile);
          reader2.readAsDataURL(versoFile);
        })
        .catch((error) => {
          setNotifMessage(
            "Une erreure s'est produite lors de l'envoi des fichiers vers le serveur. Vérifier votre connexion et ressayez"
          );
          setNotifTitle("Erreur");
          setDialogOpen(true);
        });
    } else {
      setNotifMessage("Vous devez remplir tous les champs");
      setNotifTitle("Erreur");
      setDialogOpen(true);
    }
  };

  return (
    <div className="w-full font-semibold bg-white h-full flex flex-col">
      <Header />

      <div className="flex mt-[13vh] mb-[] p-4 justify-center flex-col  h-full w-full space-y-6 ">
        <div className="rounded-t-lg h-[15vh] flex items-center font-bold text-white text-3xl pl-6 overflow-hidden bg-red-700">
          Ajouter l'image de vos CNI
        </div>
        <div className="bg-white w-[15vw] sm:w-[10vw] flex justify-center items-center   shadow h-[10vh]">
          <button
            className="  rounded-lg"
            onClick={() => window.history.back()}
          >
            <KeyboardBackspaceIcon style={{ fontSize: "2rem" }} />
          </button>
        </div>
      </div>

      <div className="flex  flex-col justify-center items-center h-50vh bg-white w-full md:w-4/5 mx-auto">
        <div className="flex flex-col font-semibold  rounded-lg mb-2 mx-auto w-full md:w-3/5 p-2 md:p-5 shadow-lg  h-full">
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
              className="px-5 py-2 mt-2 bg-red-600 w-full hover:bg-red-800  text-white font-bold rounded cursor-pointer"
            />
          </div>
          <AssoNotificationDialog
            title={notifTitle}
            message={notifMessage}
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCNI;
