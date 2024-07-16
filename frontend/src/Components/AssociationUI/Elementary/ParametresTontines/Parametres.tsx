import React from "react";
import RoleDialog from "../maTontine/RoleDialog";
import { useNavigate } from "react-router-dom";
import SettingForm from "./SettingForm";

const Parametres = () => {
  const navigate=useNavigate()
  return (
    <div>
      <button onClick={()=>navigate("/tontine/mestontines/:idTontine/parametres/roles")} className="bg-white p-3 hidden text-black rounded-lg hover:bg-gray-200 ">gérer les roles</button>
      <SettingForm/>
      
    </div>
  );
};

export default Parametres;

