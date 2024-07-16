import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Header from "../../../Components/SavingPlan/header/Header";
import AssoNotificationDialog from "../../../Components/AssociationUI/Elementary/MesTontines/AssoNotificationDialog";

const AddSignature: React.FC = () => {
  const navigate = useNavigate();
  const [signature, setSignature] = useState<string>("");
  const [notifTitle, setNotifTitle] = useState<string>("");
  const [notifMessage, setNotifMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const signatureCanvasRef = useRef<SignatureCanvas>(null);

  const handleUpload = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();
    if (!signatureCanvasRef.current || signatureCanvasRef.current.isEmpty()) {
      alert("Vous n'avez pas encore ajouté de signature.");
    } else {
      const signatureDataURL = signatureCanvasRef.current.toDataURL();
      // Effectuer le téléchargement ou l'envoi de la signature
      // ...
    }
  };

  return (
    <div className="w-full font-semibold bg-white h-[100vh] p-2.5 flex flex-col">
      <Header/>
      <div className=" mt-[10vh] w-full h-fit p-2 z-20">
        <header className="flex flex-row w-full md:w-4/5 mx-auto">
          <div className="bg-white w-[15vw] sm:w-[10vw] flex justify-center items-center border shadow h-[10vh]">
            <button
              className="px-2 rounded-lg"
              onClick={() => window.history.back()}
            >
              <KeyboardBackspaceIcon style={{ fontSize: "3rem" }} />
            </button>
          </div>
          <div className="bg-white font-bold w-full flex pl-6 items-center shadow h-[10vh]">
            Ajouter une signature
          </div>
        </header>
      </div>
      <div className="flex mt-5 flex-col justify-center items-center h-50vh bg-white w-full md:w-4/5 mx-auto">
        <div className="flex flex-col font-semibold border mt-2 rounded-lg mb-2 mx-auto w-full md:w-3/5 p-2 md:p-5 shadow-lg border h-full">
          <div className="flex w-full flex-col">
              <div className="flex items-center w-full p-2 flex-col gap-4  justify-center">
                <div className="w-full h-full  border">
                  <SignatureCanvas
                    penColor="black"
                    backgroundColor="white"
                    canvasProps={{ className: "signatureCanvas" }}
                    ref={signatureCanvasRef}
                    onEnd={() => {
                      if (signatureCanvasRef.current) {
                        setSignature(signatureCanvasRef.current.toDataURL());
                      }
                    }}
                  />
                </div>

              </div>
            </div>
          </div>
          <div className="mt-5 p-8 flex ">
            <input
              type="submit"
              value="Valider"
              onClick={handleUpload}
              className="px-5 py-2  w-full bg-red-600 text-white font-bold rounded cursor-pointer"
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
   
  );
};

export default AddSignature;
