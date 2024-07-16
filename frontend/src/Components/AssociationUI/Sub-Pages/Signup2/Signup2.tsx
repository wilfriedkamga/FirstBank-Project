import React, { useEffect, useState } from "react";
import logo from "../../../../Assets/Images/FBLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../Signin/Signin.css";
import Variable from "../../../../Variable";

type ChildComponentProps = {
  handleClick: () => void;
  toggleSinup2: () => void;
  uploadOtpCodeToParent: (
    fullName: string,
    mail: string,
    birthDate: string,
    gender: string
  ) => void;
};
const Signup2: React.FC<ChildComponentProps> = ({
  handleClick,
  toggleSinup2,
  uploadOtpCodeToParent,
}) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadOtpCodeToParent(name, mail, birthDate, gender);
    toggleSinup2();
    const route = Variable.routeApi + "api/usermanagement/signin";
  };

  return (
    <section className="bg-white w-full  box-shadow lg:w-[28vw] lg:h-[90vh] p-4 dark:bg-gray-900 lg:rounded-xl">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider  mt-10 lg:mt-0 text-red-600 text-gray-800 text-center  capitalize dark:text-white">
              S'inscrire
            </h1>

            <p className="mt-2 text-gray-700 dark:text-gray-400 text-center">
              Please fill in these fields to log in.
            </p>

            <form className="gap-6 mt-4 " onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label className="block mb-2 text-sm ">Full name</label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                  type="text"
                  placeholder="John"
                  className="block w-full h-13  px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm ">Email</label>
                <input
                  value={mail}
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                  required
                  type="text"
                  placeholder="mail@gmail.com"
                  className="block w-full h-13  px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-1 mt-1">Birth Date</label>
                <input
                  value={birthDate}
                  onChange={(e) => {
                    setBirthdate(e.target.value);
                  }}
                  required
                  type="date"
                  placeholder="Snow"
                  className="block w-full px-5 h-13 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label htmlFor="countries" className="block mb-1 mt-1  ">
                  Gender
                </label>
                <select
                  required
                  value={gender}
                  onChange={(e: any) => setGender(e.target.value)}
                  id="countries"
                  className="bg-gray-50 border h-14 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled selected hidden>
                    Choose your gender
                  </option>
                  <option value="Homme" selected>
                    Homme
                  </option>
                  <option value="Femme">Femme</option>
                </select>
              </div>

              <button
                // onClick={() => handleSubmit()}
                type="submit"
                className="flex items-center justify-center w-full mt-10 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
              >
                Next
              </button>
              <p className="flex items-center justify-center mt-2">
                You already have an account?
                <button
                  className="signin text-red-600"
                  onClick={() => handleClick()}
                >
                  {" "}
                  Signin
                </button>
              </p>
            </form>
            <img
              src={logo}
              alt="Logo Afriland First Bank"
              className="lg:mb-2 p-5 lg:w-50 lg:h-25 lg:relative "
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup2;
