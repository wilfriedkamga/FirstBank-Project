import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import Variable from "../../../Variable";

export const UserAvatar = () => {
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const [photo, setPhoto] = useState("");
  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setPhoto(user.user.photo);
  }, []);

  return (
    <div>
      {!photo ? (
        <Avatar {...stringAvatar("Wilfried kamga")} />
      ) : (
        <Avatar src={photo} />
      )}
    </div>
  );
};
