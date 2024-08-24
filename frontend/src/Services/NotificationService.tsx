import axios from "axios";
import Variable from "../Variable";

const routes_get_notifications_by_phone =
  Variable.notification_2 + "/api/notificationmanagement/getNotifications";

const routes_store_token =
  Variable.notification_2 + "/api/notificationmanagement/registerTokenForUser";

const routes_send_invitation =
  Variable.notification_2 + "/api/notificationmanagement/sendInvitation";

class NotificationService {
  GetNotificationsByPhone(phone: string) {
    console.log(routes_get_notifications_by_phone + "?phone=" + phone);
    return axios.get(routes_get_notifications_by_phone + "?phone=" + phone);
  }

  sendInvitation(data: any) {
    return axios.post(routes_send_invitation, data);
  }

  StoreToken(phone: string, token: string) {
    console.log(routes_get_notifications_by_phone + "?phone=" + phone);
    const temp={
      "phone":phone,
      "token":token
    } 
    const formdata =new FormData()
    formdata.append("phone",phone)
    formdata.append("token",token)
    return axios.post(routes_store_token,temp);
  }
}

export default new NotificationService();
