import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Header from "../../Component/header/Header";
import AssoNotificationDialog from "../../../Front_Association/Component/Elementary/MesTontines/AssoNotificationDialog";

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
    <div className="w-full h-full bg-white flex flex-col">
      <Header />
      <div className="flex mt-[13vh] mb-[] p-4 justify-center flex-col  h-full w-full space-y-6 ">
        <div className="rounded-t-lg h-[15vh] flex items-center font-bold text-white text-3xl pl-6 overflow-hidden bg-red-700">
          Ajouter ou modifier votre signature.
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
      <div className=" w-full h-fit p-2 z-20"></div>
      <div className="flex flex-col justify-center items-center h-50vh bg-white w-full md:w-4/5 mx-auto">
        <div className="flex flex-col font-semibold border rounded-lg mb-[10vh] mx-auto w-full md:w-3/5 p-2 md:p-5 shadow-lg border h-full">
          <div className="flex w-full flex-col">
            <div className="flex  items-center  p-2 flex-col gap-4  justify-center">
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
          <div className="mt-5 p-8 w-full flex ">
            <input
              type="submit"
              value="Valider"
              onClick={handleUpload}
              className="px-5 py-2  w-full bg-red-600 hover:bg-red-800 text-white font-bold rounded cursor-pointer"
            />
          </div>
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
