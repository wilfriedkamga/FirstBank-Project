import React, { Children, useState } from "react";
import PhoneInput from "react-phone-input-2";
import SelectItem from "../Component/SelectItem";
import useIsMobile from "../../../../Services/useIsMobile";
import Variable from "../../../../Variable";
import Authentications from "../../../../Services/Authentications";
import { Button, IconButton } from "@mui/material";
import { Person } from "@mui/icons-material";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

type childComponents = {
  setPhone: (phone: string) => void;
  defaultValue: string;
  disabled?: boolean;
};

type Contact = {
  name: string;
  tel: string[];
};
const nb_chiffre_tel = Variable.nb_chiffres_telephone;

const PhoneInputRole = ({
  setPhone,
  defaultValue,
  disabled,
}: childComponents) => {
  const [value1, setValue1] = useState<string>(defaultValue);
  const [contacts, setContacts] = useState<any[]>([]);
  const [verifiedContacts, setVerifiedContacts] = useState<Contact[]>([]);
  const isMobile = useIsMobile();

  async function verifyPhone(phone: string): Promise<boolean> {
    try {
      const response = await Authentications.verifyUserHasAccount(phone);
      console.log(response.status === 200);
      return response.status === 200;
    } catch (error) {
      console.error("Error verifying phone:", error);
      return false;
    }
  }
  
  const handleContactPicker = async () => {
    try {
      if ("contacts" in navigator && "ContactsManager" in window) {
        const props = ["name", "tel"];
        const opts = {
          multiple: false,
          sortOrder: "displayName",
        };
        const selectedContacts = await (navigator as any).contacts.select(
          props,
          opts
        );

        if (selectedContacts.length > 0) {
          setContacts(
            selectedContacts.map((contact: any) => ({
              name: contact.name[0],
              tel: contact.tel,
            }))
          );
          
        }
      } else {
        console.log("Contact Picker API not supported");
      }
    } catch (err) {
      console.error("Error picking contact:", err);
    }
  };

  return (
    <div className=" md:flex-row gap-2">
      <div className="flex justify-center items-center w-full">
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
        <Button onClick={handleContactPicker}>
          <PermContactCalendarIcon sx={{fontSize:"60px", border:"1px solid #E5E7EB", borderRadius:"12px", padding:"7px", color:"#e53935"}} />
        </Button>
      </div>
      <div>

      {value1.length < nb_chiffre_tel ? (
          <label className="text-xs text-red-500">
            Le numéro de telephone doit avoir au moins {nb_chiffre_tel} chiffres
          </label>
        ) : null}
      </div>
      
    </div>
  );
};

export default PhoneInputRole;
