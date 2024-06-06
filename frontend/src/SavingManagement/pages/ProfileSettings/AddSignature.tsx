import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const AddSignature: React.FC = () => {
  const navigate = useNavigate();
  const [signature, setSignature] = useState<string>("");

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
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <header className="flex flex-row w-full md:w-4/5 mx-auto">
          <div className="bg-white w-[15vw] sm:w-[10vw] flex justify-center items-center border shadow h-[10vh]">
            <button
              className="px-2 rounded-lg"
              onClick={() => navigate("/settings")}
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
            <div className="flex flex-col">
              <label className="block mb-1 ml-2 px-5 text-sm mt-3">
                Signature
              </label>
              <div className="flex justify-center">
                <SignatureCanvas
                  penColor="black"
                  backgroundColor="white"
                  canvasProps={{ width: 500, height: 200, className: "signatureCanvas" }}
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
          <div className="mt-5 flex justify-between">
            <input
              type="submit"
              value="Valider"
              onClick={handleUpload}
              className="px-5 py-2 mt-2 bg-red-600 text-white font-bold rounded cursor-pointer"
            />
            <input
              type="button"
              value="Annuler"
              onClick={() => navigate("/settings")}
              className="px-5 py-2 bg-gray-600 text-white font-bold rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSignature;