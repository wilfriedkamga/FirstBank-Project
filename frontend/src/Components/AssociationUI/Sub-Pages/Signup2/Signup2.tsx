import React, { useEffect, useState } from "react";
import logo from "../../../../Assets/Images/FBLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../Signin/Signin.css";
import Variable from "../../../../Variable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTranslation } from "react-i18next";
import { FormControl, FormLabel, MenuItem, Select } from "@mui/material";
import SelectItem from "../../MuiCustomComponent/SelectItem";
import TextFieldDate from "../../MuiCustomComponent/TextFieldDate";
import LabelField from "../../MuiCustomComponent/LabelField";
import TextFieldSimple from "../../MuiCustomComponent/TextFieldSimple";
import SubmitedButton from "../../MuiCustomComponent/SubmitedButton";
import SimpleButtonLink from "../../MuiCustomComponent/SimpleButtonLink";
import { setDate } from "date-fns";

interface GenderOption {
  id: string;
  name: string;
}

const genderOptions: GenderOption[] = [
  { id: "male", name: "Masculin" },
  { id: "female", name: "Féminin" },
];

type ChildComponentProps = {
  handleClick: () => void;
  toggleSinup2: () => void;
  uploadOtpCodeToParent: (
    fullName: string,
    mail: string,
    birthDate: string,
    gender: string
  ) => void;
  fullnameE: string;
  mailE: string;
  birthDateE: string;
  genderE: string;
};
const Signup2: React.FC<ChildComponentProps> = ({
  handleClick,
  toggleSinup2,
  uploadOtpCodeToParent,
  fullnameE,
  mailE,
  birthDateE,
  genderE,
}) => {
  const [name, setName] = useState(fullnameE);
  const [mail, setMail] = useState(mailE);
  const [gender, setGender] = useState<string>("default");
  const [birthDate, setBirthdate] = useState<string>("")
  const [birthDate2, setBirthdate2] = useState<Date>();
  const [isLoading,setIsLoading]=useState<boolean>(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  useEffect(()=>{
    setBirthdate(birthDate2? birthDate2.toISOString:"")
  })
  
  // fonction de tradcution
  const { t } = useTranslation();

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadOtpCodeToParent(name, mail, birthDate, gender);
    toggleSinup2();
    const route = Variable.routeApi + "api/usermanagement/signin";
  };

  return (
    <section className="bg-white w-full h-full shadow-xl lg:w-[28vw] lg:h-[90vh] relative p-5 dark:bg-gray-900 lg:rounded-xl z-3">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5 ">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider flex gap-10  mb-4  text-red-600 text-gray-800 text-center  capitalize dark:text-white">
              <button
                onClick={() => handleClick()}
                className=" flex justify-center text-center p-1 items-center rounded-lg"
              >
                <ArrowBackIosIcon />{" "}
              </button>
              {t("usermanagement.signup.title")}
            </h1>

            <form
              className="mt-3 flex flex-col "
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="mt-3">
                <LabelField text={t("usermanagement.signup.labelFullName")} />
                <TextFieldSimple
                  value={name}
                  onChange={(e) => {
                    setName(e);
                  }}
                  helperText={""}
                  placeholder="Entrez votre nom complet"
                  required={true}
                  readOnly={false}
                  disabled={false}
                />
              </div>

              <div className="mt-3">
                <LabelField text={t("usermanagement.signup.labelEmail")} />
                <TextFieldSimple
                  value={mail}
                  onChange={(e) => {
                    setMail(e);
                  }}
                  helperText={""}
                  placeholder="mail@gmail.com"
                  required={true}
                  readOnly={false}
                  disabled={false}
                />
              </div>

              <div className="mt-3">
                <LabelField text={t("usermanagement.signup.labelBirthDate")} />
                <TextFieldDate
                  onChange={() => setBirthdate2}
                  value={birthDate2!}
                  required
                />
              </div>

              <div className="mt-3 mb-[60px] lg:mb-6">
                <LabelField text={t("usermanagement.signup.labelGender")} />
                <SelectItem<GenderOption>
                  label="Sexe"
                  options={genderOptions}
                  valueKey="id"
                  labelKey="name"
                  value={gender}
                  onChange={handleGenderChange}
                  placeholder="Sélectionnez un sexe"
                />
              </div>

                <SubmitedButton
                  timeout={3000}
                  isLoading={isLoading}
                  text={t("usermanagement.signup.nextButton")}
                />
              <p className="flex items-center justify-center  mt-2">
                {t("usermanagement.signup.haveAccountMessage")}
                <SimpleButtonLink fontSize="14px" text={t("usermanagement.signup.signinButton")} onClick={()=>handleClick()}/>
              </p>
            </form>
            <img
              src={logo}
              alt="Logo Afriland First Bank"
              className="lg:mb-2 p-5 lg:w-[300px] lg:h-[130px] bottom-5 text-center lg:h-25 lg:relative relative mb-2 "
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup2;
