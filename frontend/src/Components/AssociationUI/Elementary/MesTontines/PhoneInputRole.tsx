import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import SelectItem from "../Component/SelectItem";
import useIsMobile from "../../../../Services/useIsMobile";
import Variable from "../../../../Variable";

type childComponents = {
  setPhone: (phone: string) => void;
  defaultValue:string, 
  disabled?:boolean
};
const nb_chiffre_tel=Variable.nb_chiffres_telephone;

const PhoneInputRole = ({ setPhone , defaultValue,disabled}: childComponents) => {
  const [value1, setValue1] = useState<string>(defaultValue);
  const isMobile = useIsMobile();
  
  const handleContactPicker = async () => {
    try {
      if ("contacts" in navigator && "ContactsManager" in window) {
        const props = ["name", "tel"];
        const opts = { multiple: false };
        const contacts = await (navigator as any).contacts.select(props, opts);

        if (contacts.length > 0) {
          const contact = contacts[0];
          const phoneNumber = contact.tel[0]; // Assumes the contact has at least one phone number
          setPhone(phoneNumber);
        }
      } else {
        console.log("Contact Picker API not supported");
      }
    } catch (err) {
      console.error("Error picking contact:", err);
    }
  };
 
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="flex justify-start items-start flex-col w-full">
        <PhoneInput
          country={"cm"}
          value={defaultValue}
          onChange={(phone) => {
            setValue1(phone);
            setPhone(phone);
          }}
          disabled={disabled}
          containerClass="w-full"
          buttonStyle={{ backgroundColor: "transparent" }}
          dropdownStyle={{ backgroundColor: "" }}
          inputStyle={{ backgroundColor: "transparent", height: 58 }}
          inputClass="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
        />
        {value1.length<nb_chiffre_tel?<label className="text-xs text-red-500">Le numéro de telephone doit avoir au moins 10 chiffres</label>:null}
         
        {isMobile && (
          <button
            className="mt-2 mb-1 rounded-lg bg-red-700 hover:bg-red-800 px-2 text-white"
            onClick={handleContactPicker}
          >
            Choisir
          </button>
        )}
      </div>
    </div>
  );
};

export default PhoneInputRole;
