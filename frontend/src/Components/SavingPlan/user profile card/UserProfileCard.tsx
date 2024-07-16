import React, { useEffect, useState } from "react";
import Variable from "../../../Variable";
import { UserAvatar } from "../header/UserAvatar";
import { Avatar } from "@mui/material";
import { getInitials } from "../../AssociationUI/Elementary/Utils";

const UserProfileCard = () => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setPhoto(user.user.photo);
    setName(user.user.fullName);
  }, []);
  return (
    <div className="w-full">
      <div className="rounded-t-lg md:h-40 h-40 overflow-hidden bg-red-700"></div>
      <div className="ml-5 md:ml-16 w-36 h-36 flex justify-center items-center -mt-20  border-2 border-white rounded-full overflow-hidden">
        {photo ? (
          <Avatar
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#BB0000",
            }}
            src={photo}
            alt=""
          />
        ) : (
          <div className=" w-36 h-36 flex items-center justify-center   border-white rounded-full overflow-hidden">
            <Avatar
              sx={{
                marginBottom: 0,
                bgcolor: "#bb0000",
                width: "100%",
                height: "100%",
                fontWeight: "bold",
                fontSize: "46px",
              }}
            >
              {getInitials(name)}
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
