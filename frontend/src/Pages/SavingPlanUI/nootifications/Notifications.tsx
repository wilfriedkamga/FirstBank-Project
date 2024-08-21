import React, { useEffect, useState } from "react";
import Header from "../../../Components/SavingPlan/header/Header";
import Footer from "../../../Components/AssociationUI/Elementary/Footer/Footer";
import Variable from "../../../Variable";
import NotificationService from "../../../Services/NotificationService";
import AllNotification from "./AllNotification";


interface Notification {
  id:number;
  message: string;
  read: boolean;
}

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [listNotifs, setListNotifs] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const open = Boolean(anchorEl);
  const menuOpen = Boolean(menuAnchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationItemClick = (index: number) => {
    console.log("Notification clicked:", index);
  };

  const getMyNotifications = (phone: string) => {
    NotificationService.GetNotificationsByPhone(phone)
      .then((response) => {
        const notifications: Notification[] = response.data.data;
        setListNotifs(notifications);
        setUnreadCount(notifications.filter((notif) => !notif.message).length);
      })
      .catch((error) => {
        console.error("Error fetching notifications", error);
      });
  };

  const markAllAsRead = () => {
    const updatedNotifs = listNotifs.map((notif) => ({
      ...notif,
      read: true,
    }));
    setListNotifs(updatedNotifs);
    setUnreadCount(0);
  };

  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    console.log(user);
    getMyNotifications(user.user.phone);
  }, []);
  return (
    <div className="w-full bg-gray-300 h-full flex flex-col">
      <Header />

      <div className="notifications-page  mb-[10vh] mt-[8vh] lg:mt-[15vh]">
        <AllNotification/>
      </div>
      <div className="w-full h-fit z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Notifications;
