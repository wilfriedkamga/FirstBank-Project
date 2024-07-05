import React, { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Variable from "../../../../../Variableprod1";
import SimpleDialog from "../../Elementary/Dialog/SimpleDialog";
import logo from "../../../Assets/Images/FBLogo.png";
import Authentications from "../../../../../Services/Authentications";

type ChildComponentProps = {
  toggleSignin: () => void;
  fullName: string;
  birthDate: string;
  phone: string;
  gender: string;
};
type Props = {};

export default function SetPassword2({
  toggleSignin,
  fullName,
  birthDate,
  phone,
  gender,
}: ChildComponentProps) {
  const messageError = "Votre mod de passe a été modifié avec succèss";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(messageError);

  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setDialogVisibility(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setDialogMessage("Password don't match with confirmPassword");
      setDialogVisibility(true);
    } else {
      setDialogVisibility(false);
      setDialogMessage(messageError);

      const tempUser = {
        phone: phone,
        newPhone: phone,
        password: password,
      };
      const route = Variable.routeApi + "api/usermanagement/updateprofil";

      axios
        .post(`${route}`, tempUser)
        .then((response) => {
          setDialogMessage("Password updated successfully !");
          setDialogVisibility(true);

          Authentications.loginService(tempUser)
            .then((response) => {
              const data = Variable.setLocalStorageItem(
                "user",
                response.data.data
              );
              navigate("/home");
            })
            .catch((error) => {});
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <section className="bg-white w-full relative h-full lg:w-[28vw] lg:h-[90vh] dark:bg-gray-900 lg:rounded-xl p-4">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 text-center mt-3 capitalize dark:text-white">
              Set Password
            </h1>

            <div className="absolute z-20 ml-4 lg:ml-0  mt-20 lg:mt-20 lg:mr-15 w-4/5">
              {dialogVisibility ? (
                <SimpleDialog
                  message={dialogMessage}
                  handleClose={() => handleCloseDialog()}
                />
              ) : null}
            </div>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">
              Veuillez renseigner ce formulaire pour Créer votre compte.
            </p>

            <form className="gap-6 mt-8 " onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label className="block mb-2 text-sm mt-3 ">Password</label>
                <input
                  value={password}
                  onChange={handlePasswordChange}
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm mt-3 ">
                  Password confirmation
                </label>
                <input
                  value={confirmPassword}
                  onChange={handlePasswordConfirmationChange}
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                />

                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    className="mr-2  w-4 h-4"
                    checked={isPasswordVisible}
                    onChange={togglePasswordVisibility}
                  />
                  <span className="text-sm  text-gray-600">Show password</span>
                </label>
              </div>

              <button
                type="submit"
                className=" flex items-center justify-center w-full mt-10 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
              >
                <span className="text-center ">Valider</span>
              </button>
            </form>
            <img
              src={logo}
              alt="Logo Afriland First Bank"
              className="lg:pb-8  p-5 lg:w-50 lg:h-25 lg:relative lg:t-10 "
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
}
