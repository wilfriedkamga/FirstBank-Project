import React, { useState } from "react";
import PhoneInputRole from "./PhoneInputRole";

type childComponents={
    error1:boolean;
    error2:boolean;
    setContact:(phone:string)=>void;
}

const PhoneInputController = ({error1, error2,setContact}:childComponents) => {
  return (
    <div>
      <PhoneInputRole defaultValue={""} setPhone={setContact} />
      {error2 && (
        <div className="text-red-500 mt-2 font-title text-sm">
          Ce telephone n'existe pas dans cette plateforme
          <button className="ml-2 bg-red-600 rounded-lg text-white hover:bg-red-800  px-3 py-1">
            Inviter
          </button>
        </div>
      )}
      {error1 && (
        <div className="text-red-500 font-title text-sm">
          ce champ doit être remplir
        </div>
      )}
    </div>
  );
};

export default PhoneInputController;
