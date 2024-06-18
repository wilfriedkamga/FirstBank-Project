import React from "react";
import RoleDialog from "../maTontine/RoleDialog";
import { useNavigate } from "react-router-dom";

const Parametres = () => {
  const navigate=useNavigate()
  return (
    <div>
      <button onClick={()=>navigate("/tontine/mestontines/:idTontine/parametres/roles")} className="bg-white p-3 text-black rounded-lg hover:bg-gray-200 ">gérer les roles</button>
    </div>
  );
};

export default Parametres;
