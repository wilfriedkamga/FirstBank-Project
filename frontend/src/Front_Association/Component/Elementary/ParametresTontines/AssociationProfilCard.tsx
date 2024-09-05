import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import Variable from "../../../../Variable";
import logo_asso from "../../../Assets/caisse.png"

const AssociationProfileCard = () => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
   
  }, []);
  return (
    <div className="w-full">
      <div className="md:h-40 h-40 overflow-hidden bg-red-700"></div>
      <div className="ml-5 md:ml-16 w-36 h-36 flex justify-center items-center -mt-20  border-white overflow-hidden">
        <Avatar
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#BB0000",
          }}
          src={logo_asso}
          alt=""
        />
      </div>
    </div>
  );
};

export default AssociationProfileCard;
