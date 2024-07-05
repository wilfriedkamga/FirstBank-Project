import axios from "axios";
import Variable from "../../../../Variableprod1";

export default async function sendSms(
  message: string,
  recipientNumbers: string[]
) {
  try {
    const headers = {
      "X-Api-Key": "2C250CF6-0B66-41D5-A7A5-59EC8B6942E0",
      "X-Secret": "Fa20uInW2h2n3IpWs0f4NY6BRcPmC8snBioUcRJHmU9pC7",
      "Content-Type": "application/json",
    };

    const payload = {
      senderId: "FirstSaving",
      message: message,
      msisdn: recipientNumbers,
      maskedMsisdn: false,
      flag: "GSM7",
    };

    const route =
      Variable.pathSmsAPI || "https://sms.lmtgroup.com/api/v1/pushes";

    const response = await axios.post(route, payload, { headers });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
