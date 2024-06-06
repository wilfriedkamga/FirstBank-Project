import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import BottomNavigation from "../../components/bottom navigation/BottomNavigation";
import PhoneInput from "react-phone-input-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Authentications from "../../../Services/Authentications";
import {
  faCloudArrowUp,
  faLock,
  faUnlock,
} from "@fortawesome/free-solid-svg-icons";
import Variable from "../../../Variable";

const EditProfile: React.FC = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthDateEditable, setBirthdateEditable] = useState<boolean>(true);
  const [emailEditable, setEmailEditable] = useState<boolean>(true);
  const [phoneEditable, setPhoneEditable] = useState<boolean>(true);
  const [fullnameEditable, setFullnameEditable] = useState<boolean>(true);
  const [photo, setPhoto] = useState<string>("");
  const [showUploadText, setShowUploadText] = useState(false);

  const handleUpload = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault();

    const uploadFile = {
      cniRecto: "",
      cniVerso: "",
      photo: photo,
      phone: phone,
      signature: "",
    };

    Authentications.uploadFile(uploadFile)
      .then((response) => {
      })
      .catch((error) => {
        alert("une erreur s'est produit");
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const file2: Blob = new Blob();

    if (file) {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("cniRecto", file2);
      formData.append("cniVerso", file2);
      formData.append("photo", file);
      formData.append("signature", file2);

      Authentications.uploadFile(formData)
        .then((response) => {
          const reader = new FileReader();
          reader.onload = () => {
            const imageUrl = reader.result as string;
            setPhoto(imageUrl);
            const user = Variable.getLocalStorageItem("user");
          const updatedUser = {
            ...user.user,
            photo:imageUrl
          };
          Variable.setLocalStorageItem("user", { user: updatedUser });
          alert("success")
          };

          reader.readAsDataURL(file);
        })
        .catch((error) => {});
    }
  };
  useEffect(() => {
    const user = Variable.getLocalStorageItem("user");
    setFullname(user.user.fullName);
    setPhone(user.user.phone);
    setBirthdate(user.user.birthDate);
    setEmail(user.user.email);
    setPhoto(user.user.photo);
    console.log(photo);
  }, []);
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const profilModel = {
      phone: phone,
      newPhone: phone,
      fullName: fullname,
      birthDate: birthdate,
      gender: null,
      password: "",
      email: email,
      idCardIm: "",
      signature: "",
      photo: "",
    };

    Authentications.updateProfil(profilModel)
      .then((response) => {
        const user = Variable.getLocalStorageItem("user");
        const updatedUser = {
          ...user.user,
          email: email,
          fullName: fullname,
          birthDate: birthdate,
          emailIsVallid: email ? false : true,
        };
        Variable.setLocalStorageItem("user", { user: updatedUser });
        
      })
      .catch((error) => {});
  };

  return (
    <div className="w-full h-full p-2 flex flex-col">
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <div className="flex  justify-center flex-col  h-full w-full space-y-6 ">
        <div className="rounded-t-lg h-[15vh] flex items-center font-bold text-white text-3xl pl-6 overflow-hidden bg-white">
          Edit profil
        </div>
        <div className="ml-10 md:mx-auto  w-60 h-60 relative  border-4 border-white rounded-full overflow-hidden">
          <img
            className="object-cover  h-60 w-60 rounded-full object-center p-3"
            src={photo}
            alt="none"
          />
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            style={{ display: "none" }}
            onChange={handleImageChange}
            className="w-full h-40"
          />
        </div>
        <button
          onClick={() => {
            const fileInput = document.getElementById("fileInput");
            fileInput?.click();
          }}
          className="bg-red-600 md:w-1/5 w-4/5 mx-auto p-2 font-bold text-white rounded-lg"
        >
          Change profil image
        </button>

        <div className="w-full">
          <form action="" className="max-w-3xl mx-auto">
            <div className="mb-5 w-full px-2.5">
              <label
                htmlFor="fullname"
                className="block mb-2 text-md font-title font-medium text-gray-900"
              >
                Your full name
              </label>
              <div className="flex gap-4 items-center">
                <input
                  disabled={fullnameEditable}
                  type="text"
                  name="fullname"
                  defaultValue={fullname}
                  value={fullname}
                  id="fullname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base font-title rounded-lg focus:bg-white focus:ring-red-500 focus:border-red-500 outline-none w-full px-2.5 py-3"
                  onChange={(e) => setFullname(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setFullnameEditable(!fullnameEditable);
                  }}
                >
                  {fullnameEditable ? (
                    <FontAwesomeIcon icon={faLock} />
                  ) : (
                    <FontAwesomeIcon icon={faUnlock} />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-5 w-full px-2.5">
              <label
                htmlFor="phone"
                className="block mb-2 text-md font-title font-medium text-gray-900"
              >
                Your phone number
              </label>
              <div className="flex items-center gap-4">
                <PhoneInput country={"cm"} value={phone} disabled />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPhoneEditable(false);
                  }}
                >
                  {phoneEditable ? (
                    <FontAwesomeIcon icon={faLock} />
                  ) : (
                    <FontAwesomeIcon icon={faUnlock} />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-5 w-full px-2.5">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-title font-medium text-gray-900"
              >
                Your email address
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="email"
                  name="email"
                  value={email}
                  id="email"
                  disabled={emailEditable}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base font-title rounded-lg focus:bg-white focus:ring-red-500 focus:border-red-500 outline-none w-full px-2.5 py-3"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEmailEditable(!emailEditable);
                  }}
                >
                  {emailEditable ? (
                    <FontAwesomeIcon icon={faLock} />
                  ) : (
                    <FontAwesomeIcon icon={faUnlock} />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-5 w-full px-2.5">
              <label
                htmlFor="birthdate"
                className="block mb-2 text-md font-title font-medium text-gray-900"
              >
                Your birthdate
              </label>
              <div className="flex  gap-4 items-center">
                <input
                  disabled={birthDateEditable}
                  type="date"
                  name="birthdate"
                  value={birthdate}
                  id="birthdate"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-base font-title rounded-lg focus:bg-whiteIl semble y avoir une coupure dans le code que vous avez fourni. Pouvez-vous me fournir la partie manquante afin que je puisse vous aider correctement ?
                focus:ring-red-500 focus:border-red-500 outline-none w-full px-2.5 py-3"
                  defaultValue={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setBirthdateEditable(!birthDateEditable);
                  }}
                >
                  {birthDateEditable ? (
                    <FontAwesomeIcon icon={faLock} />
                  ) : (
                    <FontAwesomeIcon icon={faUnlock} />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-5 w-full px-2.5">
              <button
                type="button"
                className="flex items-center justify-center w-full px-4 py-3 text-base font-title font-medium text-white bg-red-600 hover:bg-red-600 rounded-lg focus:outline-none"
                onClick={(e) => handleSubmit(e)}
              >
                <span className="mr-2">
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </span>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-200 w-full h-fit p-2 z-20">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default EditProfile;
