import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import SelectItem from "../ParametresTontines/SelectItem";
import useIsMobile from "../../../../../Services/useIsMobile";

type childComponents = {
  setPhone: (phone: string) => void;
  setRole: (role: string) => void;
  table: any[];
};

const PhoneInputRole = ({ setPhone, setRole, table }: childComponents) => {
  const [value1, setValue1] = useState<string>("");
  const isMobile=useIsMobile()
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
          value={value1}
          onChange={(phone) => {
            setValue1(phone);
            setPhone(phone);
          }}
          containerClass="w-full"
          buttonStyle={{ backgroundColor: "transparent" }}
          dropdownStyle={{ backgroundColor: "" }}
          inputStyle={{ backgroundColor: "transparent", height: 58 }}
          inputClass="bg-transparent rounded-lg px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-500 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300"
        />
      
        {isMobile && (
          <button
            className='mt-2 mb-1 rounded-lg bg-red-700 hover:bg-red-800 px-2 text-white'
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
