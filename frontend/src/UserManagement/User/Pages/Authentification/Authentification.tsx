import React, { useState } from "react";
import { Link } from "react-router-dom";
import Signin from "../../Components/Sub-Pages/Signin/Signin";
import CheckOTP from "../../Components/Sub-Pages/CheckOTP/CheckOTP";
import SetPassword from "../../Components/Sub-Pages/SetPassword/SetPassword";
import PutPhone from "../../Components/Sub-Pages/PutPhone/PutPhone";
import SetPassword2 from "../../Components/Sub-Pages/SetPassword/SetPassword2";
import CheckOTP2 from "../../Components/Sub-Pages/CheckOTP/CheckOTP2";
import Signup2 from "../../Components/Sub-Pages/Signup2/Signup2";
import Signup3 from "../../Components/Sub-Pages/Signup2/Signup3";
import Dialog from "../../Components/Elementary/Dialog/SimpleDialog";

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
  return (
    <div className="h-[100vh] w-full bg-black-100 flex justify-center content-center items-center">
      <div>

      </div>
  
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
          uploadOtpCodeToParent={(value1,value2,value3) => {
            setFullName(value1);
            setBirthdate(value2);
            setGender(value3)

            console.log("*-*-*-*-*-*-*-* " + value1 +"*a****" +value2+"****"+value3);
          }}
        />
      ) : null}

{signup2Visibility ? (
        <Signup3
          handleClick={toggleSigninVisibility}
          toggleSinup2={toggleCheckOTPVisibility}
          fullName={fullName}
          birthDate={birthDate}
          gender={gender}
          uploadCodeToComponent={(value)=>setPhone(value)}
        />
      ) : null}

      {setPasswordVisibility ? (
        <SetPassword
          fullName={fullName}
          birthDate={birthDate}
          phone={phone}
          gender={gender}
          toggleSignin={toggleSignupVisibility}
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
    </div>
  );
}
