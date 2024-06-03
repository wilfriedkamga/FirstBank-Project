import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import Variable from "../../../Variable";
import Authentications from "../../../Services/Authentications";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const EmailVerification = () => {
    const navigate=useNavigate()
    const [mail, setMail]=useState("")
    const [inputOtp,setinputOTP]=useState("")
    
    useEffect(()=>{
      const user=  Variable.getLocalStorageItem("user")
        setMail(user.user.email)
    },[])
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     Authentications.VerifyMailOtp(mail,inputOtp)
     .then((response)=>{
        const user = Variable.getLocalStorageItem("user");
        const updatedUser = {
          ...user.user,
          emailIsVallid: true,
          mail:mail
        };
        Variable.setLocalStorageItem("user", { user: updatedUser });
        alert("succèss");

     })
     .then((error)=>{
       
     })

    }
  return (
    <div className="w-full bg-white h-[100vh] p-2.5 flex flex-col">
      <div className="border-b border-gray-200 w-full h-fit p-2 z-20">
        <Header />
      </div>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex mt-5 flex-col justify-center items-center  h-50vh bg-white w-full  md:w-4/5 mx-auto">
            <div className="flex flex-row w-full md:w-2/5">
              <div className=" bg-white w-[15vw] sm:w-[10vw]  flex justify-center items-center border  shadow h-[10vh]">
                <button
                  className="bg-green-400 px-2 rounded-lg "
                  onClick={() => navigate("/settings")}
                >
                  <KeyboardBackspaceIcon style={{ fontSize: "3rem" }} />
                </button>
              </div>
              <div className=" bg-white w-full flex justify-center items-center  shadow h-[10vh]">
                Vérification de l'adresse mail
              </div>
            </div>
            <div className="flex flex-col font-semibold bg-white mt-2 rounded-lg mb-2 mx-auto w-full md:w-2/5 p-2 md:p-5 shadow-lg border h-full">
              <div className="flex w-full flex-col  ">
                <label className="block mb-2 text-sm mt-3 ">
                  Entrez le code otp que vous avez reçu
                </label>
                <input
                  value={inputOtp}
                  onChange={(e)=>setinputOTP(e.target.value)}
                  className="block required:true py-2 px-5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  type="text"
                  placeholder="X X X X X "
                />
                <input
                  type="submit"
                  value="Verifier"
                  placeholder="Le nouveau numero de telephone"
                  className="  px-5 py-2 mt-5 bg-gray-600 rounded hover:bg-gray-800 text-white font-bold cursor-pointer"
                />
              </div>
            </div>
          </div>
        </form>
    </div>
  );
};

export default EmailVerification;
