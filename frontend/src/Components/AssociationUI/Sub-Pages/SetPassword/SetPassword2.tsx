import React, { useState, ChangeEvent, FocusEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SimpleDialog from "../../Elementary/Dialog/SimpleDialog";
import logo from "../../../../Assets/Images/FBLogo.png";
import Variable from "../../../../Variable";
import Authentications from "../../../../Services/Authentications";
import { useTranslation } from "react-i18next";
import LabelField from "../../MuiCustomComponent/LabelField";
import TextFieldPassword from "../../MuiCustomComponent/TextFieldPassword";
import SubmitedButton from "../../MuiCustomComponent/SubmitedButton";

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
  const { t } = useTranslation();
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
            <h1 className="text-lg text-red-600 font-semibold tracking-wider text-gray-800 text-center mt-3 capitalize dark:text-white">
            {t("usermanagement.passwordManagement.title")}
            </h1>

            <div className="absolute z-20 ml-4 lg:ml-0  mt-20 lg:mt-20 lg:mr-15 w-4/5">
              {dialogVisibility ? (
                <SimpleDialog
                  message={dialogMessage}
                  handleClose={() => handleCloseDialog()}
                />
              ) : null}
            </div>

            <form className="gap-6 mt-8 " onSubmit={(e) => handleSubmit(e)}>
              <div>
              <LabelField text={t("usermanagement.signin.labelPassword")} />
                <TextFieldPassword
                  required
                  label="password"
                  value={password}
                  placeholder={t("usermanagement.signin.placeHolderPassword")}
                  onChange={() => setPassword}
                />
              </div>

              <div>
              <LabelField
                  text={t("usermanagement.signin.labelConfirmPassword")}
                />
                <TextFieldPassword
                  required
                  label="confirmPassword"
                  value={confirmPassword}
                  placeholder={t(
                    "usermanagement.signin.placeHolderConfirmPassword"
                  )}
                  onChange={() => handlePasswordConfirmationChange}
                />
              </div>
              <SubmitedButton text={t("usermanagement.passwordManagement.validateButton")}/>
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
