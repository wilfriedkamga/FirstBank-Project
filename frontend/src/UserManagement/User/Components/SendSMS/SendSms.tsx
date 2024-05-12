import axios from "axios";
import Variable from "../../../../Variable";

export default function sendSMS(message: string, recipientNumber: string) {
  try {
    const headers = {
      Authorization:
        "App c9ecf0786292a16fa8671605d96bc296-bc6da9b6-907c-4328-9e2a-d0601b55ffd4",
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const payload = {
      messages: [
        {
          destinations: [{ to: recipientNumber }],
          from: "ServiceSMS",
          text: message,
        },
      ],
    };

    const route = Variable.pathSmsAPI;

    const response = axios.post(
      "https://9lmmqr.api.infobip.com/sms/2/text/advanced",
      payload,
      { headers }
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
