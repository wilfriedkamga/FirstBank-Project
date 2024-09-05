import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import logo from "../../../Front_Association/Assets/FBLogo.png";
import Variable from "../../../Variable";
import AccountMenu from "./AccountMenu";
import Notification from "./Notification";
import NotificationService from "../../../Services/NotificationService";
import FullScreenDialog from "../../../Front_Association/Component/Elementary/Notifications/FullScreenDialog";
import NotificationSection from "./Notifications";

const Header = () => {
  const [listNotifs, setListNotifs] = useState<any[]>([]);

  React.useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    getMyNotifications(user.user.phone);
  }, []);

  const getMyNotifications = (phone: string) => {
    NotificationService.GetNotificationsByPhone(phone)
      .then((response) => {
        console.log(response.data.data);
        setListNotifs(response.data.data);
      })
      .catch((error) => {});
  };

  return (
    <div className="flex fixed bg-white shadow-lg  z-[1000]  justify-between w-full p-2">
      <div className=" right-1 bottom-[10px] relative ">
        <img src={logo} alt="logo" className="w-[60%] lg:w-[35%]"  />
      </div>
      <div className="h-10 flex gap-2 space-x-1">
        <div className="h-full">
          <a
            className="flex font-bold text-white h-8 w-8 md:h-10 md:w-10 rounded-full"
            href="/search"
          >
            <SearchIcon
              sx={{
                fontSize: "40px",
                top: 2,
                right: "20px",
                position: "relative",
              }}
              className="h-8 font-extrabold w-8"
            />
          </a>
        </div>
        <div className="h-full ">
          <Notification />
        </div>

        <div className="h-full ">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
