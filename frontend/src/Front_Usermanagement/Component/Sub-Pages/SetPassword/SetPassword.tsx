import React, { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Variable from "../../../../Variable";
import { useTranslation } from "react-i18next";
import TextFieldPassword from "../../../../Front_Association/Component/MuiCustomComponent/TextFieldPassword";
import LabelField from "../../../../Front_Association/Component/MuiCustomComponent/LabelField";
import SubmitedButton from "../../../../Front_Association/Component/MuiCustomComponent/SubmitedButton";
import SimpleButtonLink from "../../../../Front_Association/Component/MuiCustomComponent/SimpleButtonLink";

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

  const { t } = useTranslation();

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
              {t("usermanagement.passwordManagement.title")}
            </h1>

            <form className="gap-6 mt-8 " onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-4">
                <LabelField text={t("usermanagement.signin.labelPassword")} />
                <TextFieldPassword
                  required
                  label="password"
                  value={input.password}
                  placeholder={t("usermanagement.signin.placeHolderPassword")}
                  onChange={() => onInputChange}
                />
              </div>

              <div className="mb-4">
                <LabelField
                  text={t("usermanagement.signin.labelConfirmPassword")}
                />
                <TextFieldPassword
                  required
                  label="confirmPassword"
                  value={input.confirmPassword}
                  placeholder={t(
                    "usermanagement.signin.placeHolderConfirmPassword"
                  )}
                  onChange={() => onInputChange}
                />

                {error.confirmPassword && (
                  <span className="err text-red-500">
                    {error.confirmPassword}
                  </span>
                )}
              </div>
              <SubmitedButton text={t("usermanagement.passwordManagement.validateButton")}/>

              <p className="flex justify-center">
                <SimpleButtonLink text={t("usermanagement.passwordManagement.cancelButton")} onClick={()=>toggleSignin()}/>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
