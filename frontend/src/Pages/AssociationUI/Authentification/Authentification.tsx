import React, { CSSProperties, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
import logo from "../../../Assets/Images/FBLogo.png"
import Signup2 from "../../../Components/AssociationUI/Sub-Pages/Signup2/Signup2";
import Signin from "../../../Components/AssociationUI/Sub-Pages/Signin/Signin";
import Signup3 from "../../../Components/AssociationUI/Sub-Pages/Signup2/Signup3";
import SetPassword2 from "../../../Components/AssociationUI/Sub-Pages/SetPassword/SetPassword2";
import CheckOTP from "../../../Components/AssociationUI/Sub-Pages/CheckOTP/CheckOTP";
import CheckOTP2 from "../../../Components/AssociationUI/Sub-Pages/CheckOTP/CheckOTP2";
import PutPhone from "../../../Components/AssociationUI/Sub-Pages/PutPhone/PutPhone";

export default function Authentification() {
  const [signinVisibility, setSigninVisibility] = useState(true);
  const [signupVisibility, setSignupVisibility] = useState(false);
  const [signup2Visibility, setSignup2Visibility] = useState(false);
  const [checkOTPVisibility, setCheckOTPVisibility] = useState(false);
  const [checkOTP2Visibility, setCheckOTP2Visibility] = useState(false);
  const [setPasswordVisibility, setSetPasswordVisibility] = useState(false);
  const [setPassword2Visibility, setSetPassword2Visibility] = useState(false);
  const [putPhoneVisibility, setPutPhoneVisibility] = useState(false);
  const [otpCode, setOtpCode] = useState<string>("");

  // for Signup
  const [fullName, setFullName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthdate] = useState("");

  const toggleSigninVisibility = () => {
    setSigninVisibility(true);
    setSignupVisibility(false);
    setCheckOTPVisibility(false);
    setSetPasswordVisibility(false);
    setPutPhoneVisibility(false);
    setSetPassword2Visibility(false);
    setCheckOTP2Visibility(false);
    setSignup2Visibility(false);
  };

  const toggleSignupVisibility = () => {
    setSigninVisibility(false);
    setSignupVisibility(true);
    setCheckOTPVisibility(false);
    setSetPasswordVisibility(false);
    setPutPhoneVisibility(false);
    setSetPassword2Visibility(false);
    setCheckOTP2Visibility(false);
    setSignup2Visibility(false);
  };
  const toggleSignup2Visibility = () => {
    setSigninVisibility(false);
    setSignupVisibility(false);
    setSignup2Visibility(true);
    setCheckOTPVisibility(false);
    setSetPasswordVisibility(false);
    setPutPhoneVisibility(false);
    setSetPassword2Visibility(false);
    setCheckOTP2Visibility(false);
  };
  const toggleCheckOTPVisibility = () => {
    setSigninVisibility(false);
    setSignupVisibility(false);
    setCheckOTPVisibility(true);
    setSetPasswordVisibility(false);
    setPutPhoneVisibility(false);
    console.log(otpCode);
    setSetPassword2Visibility(false);
    setCheckOTP2Visibility(false);
    setSignup2Visibility(false);
  };
  const toggleCheckOTP2Visibility = () => {
    setSigninVisibility(false);
    setSignupVisibility(false);
    setCheckOTPVisibility(false);
    setSetPasswordVisibility(false);
    setPutPhoneVisibility(false);
    console.log(otpCode);
    setSetPassword2Visibility(false);
    setCheckOTP2Visibility(true);
    setSignup2Visibility(false);
  };
  const toggleSetPasswordVisibility = () => {
    setSigninVisibility(false);
    setSignupVisibility(false);
    setCheckOTPVisibility(false);
    setSetPasswordVisibility(true);
    setPutPhoneVisibility(false);
    setSetPassword2Visibility(false);
    setCheckOTP2Visibility(false);
    setSignup2Visibility(false);
  };
  const togglePutPhoneVisibility = () => {
    setSigninVisibility(false);
    setSignupVisibility(false);
    setCheckOTPVisibility(false);
    setSetPasswordVisibility(false);
    setPutPhoneVisibility(true);
    setSetPassword2Visibility(false);
    setCheckOTP2Visibility(false);
    setSignup2Visibility(false);
  };

  const toggleSetPassword2Visibility = () => {
    setSigninVisibility(false);
    setSignupVisibility(false);
    setCheckOTPVisibility(false);
    setSetPasswordVisibility(false);
    setPutPhoneVisibility(false);
    setSetPassword2Visibility(true);
    setCheckOTP2Visibility(false);
    setSignup2Visibility(false);
  };
  let table: string[];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",

    fontWeight: "bold",
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return <div>
    {isLoading?
    <div className="text-[50px] h-[100vh] shadow-red-600  flex flex-col justify-center items-center text-white font-bold">
      <img src={logo} className="bg-white rounded-lg" alt="" />
      <span className="font-bold text-red-600">Welcome page</span>
      </div>:
     <div className="h-[100vh] w-full bg-black-100 flex justify-center content-center items-center">
      {signinVisibility ? (
        <Signin
          handleClick={toggleSignupVisibility}
          togglePassword={togglePutPhoneVisibility}
        />
      ) : null}
      {signupVisibility ? (
        <Signup2
          handleClick={toggleSigninVisibility}
          toggleSinup2={toggleSignup2Visibility}
          fullnameE={fullName}
          mailE={mail}
          genderE={gender}
          birthDateE={birthDate}
          uploadOtpCodeToParent={(value1,value2,value3,value4) => {
            setFullName(value1);
            setBirthdate(value3);
            setGender(value4)
            setMail(value2);
          }}
        />
      ) : null}

{signup2Visibility ? (
        <Signup3
          uploadFieldValueCodeToPrevious={(value1,value2,value3,value4) => {
            setFullName(value1);
            setBirthdate(value3);
            setGender(value4)
            setMail(value2);}}
          handleClick={toggleSigninVisibility}
          toggleSinup2={toggleCheckOTPVisibility}
          togglePrevious={toggleSignupVisibility}
          fullName={fullName}
          mail={mail}
          birthDate={birthDate}
          gender={gender}
          uploadCodeToComponent={(value)=>setPhone(value)}
        />
      ) : null}

      
      {setPassword2Visibility ? (
        <SetPassword2
          fullName={fullName}
          birthDate={birthDate}
          phone={phone}
          gender={gender}
          toggleSignin={toggleSigninVisibility}
        />
      ) : null}
      {checkOTPVisibility ? (
        <CheckOTP
          OtpCode={otpCode}
          fullName={fullName}
          phone={phone}
          gender={gender}
          birthDate={birthDate}
          handleClick={toggleSetPasswordVisibility}
        />
      ) : null}
      {checkOTP2Visibility ? (
        <CheckOTP2
          OtpCode={otpCode}
          fullName={fullName}
          phone={phone}
          gender={gender}
          birthDate={birthDate}
          handleClick={toggleSetPassword2Visibility}
          tooglePassword={toggleSigninVisibility}
        />
      ) : null}
      {putPhoneVisibility ? (
        <PutPhone
          handleClick={toggleCheckOTP2Visibility}
          togglePassword={toggleSigninVisibility}
          uploadOtpCodeToParent={(value1,value2) => {
            setOtpCode(value1);
            setPhone(value2);
            
          }}
        />
      ) : null}
    </div>}
  </div>;
}
