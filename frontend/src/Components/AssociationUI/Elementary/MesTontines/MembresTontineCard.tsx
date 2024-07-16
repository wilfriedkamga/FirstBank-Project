import { Avatar } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditMembreAssociationDialog from "./EditMembreAssociation";
import RemoveMembreAssociationDialog from "./RemoveMembreAssociation";

type ChildComponentProps = {
  nom: string;
  phone: string;
  role: string;
};

const MembresTontineCard = ({ nom, phone, role }: ChildComponentProps) => {
  return (
    <div className="bg-white h-[80px] flex justify-between p-2 shadow-md rounded-md">
      <div className="flex items-center gap-4 ">
        <div className="font-bold">
          <Avatar sx={{ width: "50px", height: "50px" }} />
        </div>
        <div className="flex flex-col">
          <div className="font-bold">{nom}</div>
          <div className="">{phone}</div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end ">
        <div className="text-sm text-gray-600">{role}</div>
        <div className="flex">
          <div className="w-[30px] h-[30px] text-lg font-bold text-white text-center rounded-full ">
            <button>
              {" "}
              <RemoveMembreAssociationDialog/>
              
            </button>
          </div>
          <div className="w-[30px] h-[30px] text-lg font-bold text-white text-center rounded-full ">
            <button>
              
              <EditMembreAssociationDialog/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembresTontineCard;
