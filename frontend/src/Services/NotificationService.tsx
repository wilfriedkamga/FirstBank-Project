import axios from "axios";
import Variable from "../Variable";

const routes_get_notifications_by_phone =
  Variable.notification_2 + "/api/notificationmanagement/getNotifications";

  const routes_send_invitation =
  Variable.notification_2 + "/api/notificationmanagement/sendInvitation";


class NotificationService {
  GetNotificationsByPhone(phone: string) {
    console.log(routes_get_notifications_by_phone + "?phone=" + phone);
    return axios.get(routes_get_notifications_by_phone + "?phone=" + phone);
  }

   sendInvitation(data:any){
    
    return  axios.post(routes_send_invitation , data);
  }

}

export default new NotificationService();
