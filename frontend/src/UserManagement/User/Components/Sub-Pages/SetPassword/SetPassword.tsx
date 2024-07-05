import React, { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Variable from "../../../../../Variableprod1";

type ChildComponentProps = {
  toggleSignin: () => void;
  fullName: string;
  birthDate: string;
  phone: string;
  gender: string;
};
type Props = {};

interface InputValues {
  username: string;
  password: string;
  confirmPassword: string;
}

interface ErrorValues {
  username: string;
  password: string;
  confirmPassword: string;
}

export default function SetPassword({
  toggleSignin,
  fullName,
  birthDate,
  phone,
  gender,
}: ChildComponentProps) {
  const [input, setInput] = useState<InputValues>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [password, setPassword] = useState("");

  const [error, setError] = useState<ErrorValues>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  useEffect(() => {
    setPassword(input.password);
  }, [input.password]);

  const validateInput = (e: ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username.";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password do not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password do not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tempUser = {
      phone: phone,
      fullname: fullName,
      birthDate: birthDate,
      gender: gender,
      password: password,
    };
    const route = Variable.routeApi + "api/usermanagement/signup";

    axios
      .post(`${route}`, tempUser)
      .then((response) => {
        const data = Variable.setLocalStorageItem("user", response.data.data);
        console.log(response);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="bg-white w-full h-full lg:w-[28vw] lg:h-[90vh] dark:bg-gray-900 lg:rounded-xl p-4">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 text-center mt-3 capitalize dark:text-white">
              Set Password
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400 text-center">
              Veuillez renseigner ce formulaire pour Créer votre compte.
            </p>

            <form className="gap-6 mt-8 " onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-4">
                <label className="block mb-2 ">Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={input.password}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 ">Password Confirmation</label>
                <input
                  required
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                  value={input.confirmPassword}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {error.confirmPassword && (
                  <span className="err text-red-500">
                    {error.confirmPassword}
                  </span>
                )}
              </div>
              {input.password === input.confirmPassword ? (
                <button
                  type="submit"
                  className=" flex items-center justify-center w-full mt-10 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
                >
                  <span className="text-center ">Valider</span>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled
                  className=" cursor-not-allowed flex items-center justify-center w-full mt-10 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-300 rounded-lg hover:bg-red-900 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
                >
                  <span className="text-center ">Valider</span>
                </button>
              )}
              <p className="flex justify-center">
                <button
                  className=" float-right flex items-center justify-center w-full mt-4 p-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
                  onClick={toggleSignin}
                >
                  Annuler&nbsp;&nbsp;
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
