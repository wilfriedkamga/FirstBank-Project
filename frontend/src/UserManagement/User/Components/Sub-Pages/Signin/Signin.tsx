import React, { useEffect, useState } from "react";
import logo from "../../../Assets/Images/FBLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Signin.css";
import Variable from "../../../../../Variable";
import Popup from "reactjs-popup";
import SimpleDialog from "../../Elementary/Dialog/SimpleDialog";
import { ProgressSpinner } from "primereact/progressspinner";
import Authentication from "../../../../../Services/Authentications";
import Authentification from "../../../Pages/Authentification/Authentification";
import useAuthStore from "../../../../../Store/AuthStore";
import useAuthStore2 from "../../../../../Store/AuthStore2";

/* definitiion des nouveaux types*/

type ChildComponentProps = {
  handleClick: () => void;
  togglePassword: () => void;
};

/** deut de la fonction de signin */

const Signup: React.FC<ChildComponentProps> = ({
  handleClick,
  togglePassword,
}) => {
  /* Definition des variables pour stocker l'état de nos composants*/

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(
    "Incorrect password or phone"
  );
  const navigate = useNavigate();

  /** Definition des différentes fonctions à utiliser */

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const handleCloseDialog = () => {
    setErrorVisibility(false);
  };

  const login = useAuthStore2((state) => state.login);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (phone.length <= 3) {
      setDialogMessage("Please enter a valid number phone");
      setErrorVisibility(true);
    } else {
      setDialogMessage("Incorrect password or phone");
      setIsLoading(true);

      setTimeout(() => {
        const tempUser = {
          phone: phone,
          password: password,
        };

       
        
        Authentication.loginService(tempUser)
          .then((response) => {
            setErrorVisibility(false);
            login();
            navigate("/home");
          })
          .catch((error) => {
            console.log(error);
            setErrorVisibility(true);
          });

        setIsLoading(false); // Désactiver le chargement après l'exécution
      }, Variable.preTimeOut);
    }
  };

  return (
    <section className="bg-white w-full h-full shadow-xl lg:w-[28vw] lg:h-[90vh] relative p-5 dark:bg-gray-900 lg:rounded-xl z-3">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5 ">
          <div className="w-full h-full  bg-gree-300 ">
            <h1 className="text-2xl font-semibold tracking-wider text-red-600 text-gray-800 text-center mt-3 capitalize dark:text-white">
              Signin in
            </h1>
            <div className="absolute z-20 ml-4 lg:ml-0  mt-20 lg:mt-20 lg:mr-15 w-4/5">
              {errorVisibility ? (
                <SimpleDialog
                  message={dialogMessage}
                  handleClose={() => handleCloseDialog()}
                />
              ) : null}
            </div>

            <p className="mt-4 text-gray-700 dark:text-gray-400 text-center ">
              Please fill in these fields to log in.
            </p>

            <form className="gap-6 mt-6 " onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label className="block mb-1 lg:mb-2 ">Phone number</label>
                <PhoneInput
                  inputClass="block required:true w-full h-full mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  country={"cm"}
                  onChange={(value: any) => setPhone(value)}
                  countryCodeEditable={false}
                />
              </div>

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

                <button
                  className="float-right text-red-600 text-10 cursor-pointer"
                  onClick={() => togglePassword()}
                >
                  Forgot password?
                </button>
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
                // onClick={() => handleSubmit()}
                type="submit"
                className="flex items-center justify-center w-full mt-9  lg:mt-10 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
              >
                SignIn
              </button>

              <p className="flex items-center justify-center mt-2">
                Don't you have an account?
                <button
                  className="signin  text-red-500"
                  onClick={() => handleClick()}
                >
                  {""}
                  Signup
                </button>
              </p>
            </form>
            <img
              src={logo}
              alt="Logo Afriland First Bank"
              className="lg:pb-8 p-5 lg:w-50 lg:h-25 lg:relative lg:t-10 "
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
