import { AES, enc } from "crypto-ts";

class Variable {
  static routeApi: string = "http://localhost:8088/";
  static routeApiTontine: string = "http://localhost:8081";
  static pathSmsAPI: string =
    "https://9lmmqr.api.infobip.com/sms/2/text/advanced";
  static preTimeOut = 1000;
  static key_localStorage = "";
  static secret_key = "your_secret_key";
  static local_storage_key = "userFB";

  static stocker_dans_localStorage = (datas: any, key:string) => {
    const encryptedData = AES.encrypt(
      JSON.stringify(datas),
      this.secret_key
    ).toString();
    // Stocker les informations chiffrées dans le localStorage
    localStorage.setItem(key, datas);
  };

  static recupérer_du_localStorage = (key: string) => {
    const encryptedData = localStorage.getItem(this.local_storage_key);

    if (encryptedData) {
      //const bytes = AES.decrypt(encryptedData, this.secret_key);
      //const decryptedData = JSON.parse(bytes.toString(enc.Utf8));
      const user = JSON.parse(localStorage.getItem(key) || "{}");
      return JSON.parse(encryptedData || "{}");
    }
    return null;
  };

  static getLocalStorageItem = (key: string): any => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

   static setLocalStorageItem = (key: string, data: any): boolean => {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`*-*-*-*-- token save`)

    const token=localStorage.getItem(key)
    console.log(`*-*-*-*-- token ${token}`)
    return token != null && token != ""


};
static removeFromLocalStorage = (key: string): void => {
  localStorage.removeItem(key);
};

}

export default Variable;
