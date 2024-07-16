class Variable {
  static routeApi: string = "http://localhost:8088/";
  static routeApiTontine: string = "http://localhost:8081";
  static routeApiAssociation: string = "http://localhost:8082";
  static pathSmsAPI: string =
    "https://9lmmqr.api.infobip.com/sms/2/text/advanced";
  static preTimeOut = 1000;
  static nb_chiffres_telephone = 12;
  static key_localStorage = "";
  static secret_key = "your_secret_key";
  static local_storage_key = "userFB";
  static saving_base_url = "http://localhost:8085";
  static operation_service_base_url = "http://localhost:8082";
  static notification_baseUrlc = "http://localhost:8000";
  static notification_2 = "http://localhost:8091";

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

  static navigationItems = [
    { label: "association", lien: "/mes associations/id" },
    { label: "association", lien: "/mes associations/id" }

    // You can add more items here
  ];

  static getLocalStorageItem = (key: string): any => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  static setLocalStorageItem = (key: string, data: any): boolean => {
    localStorage.setItem(key, JSON.stringify(data));

    const token = localStorage.getItem(key);

    return token != null && token != "";
  };
  static removeFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
  };

  static getParentPath = (url: string): string => {
    // Crée un objet URL à partir de la chaîne fournie

    const lastSlashIndex = url.lastIndexOf("/");

    // Si '/' est trouvé, retourne la sous-chaîne jusqu'à cette position
    if (lastSlashIndex !== -1) {
      return url.substring(0, lastSlashIndex);
    }

    // Si '/' n'est pas trouvé, retourne l'URL originale (ou vous pouvez gérer cela différemment)
    return url;
  };
}

export default Variable;


