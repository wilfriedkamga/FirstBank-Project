import React, { useEffect, useState } from "react";
import logo from "../../../Assets/Images/FBLogo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import './Signup.css'
import Variable from "../../../../../Variable"
import SimpleDialog from "../../Elementary/Dialog/SimpleDialog";



type ChildComponentProps = {
  handleClick: () => void;
  toggleSinup2: () => void;
  fullName:string;
  birthDate:string;
  gender:string;
  uploadCodeToComponent:(value:string)=>void;
};
const Signup3: React.FC<ChildComponentProps> = ({
  handleClick,
  toggleSinup2,
  fullName,
  birthDate,
  gender,
  uploadCodeToComponent
}) => {
  const messageError="Votre compte a été créee avec succèss"
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [Confirmpassword, setConfirmPassword] = useState("");
  const [response, setResponse] = useState("");
  const [errorVisibility, setErrorVisibility] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const [dialogMessage, setDialogMessage] = useState(messageError);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const handleCloseDialog = () => {
    setDialogVisibility(false);
  };
  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const navigate = useNavigate();
 
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    
   if(password!=Confirmpassword){
    setDialogMessage("Password doesn't match with confirm password !")
    setDialogVisibility(true)
   }
   else{
    setDialogMessage(messageError)
    const tempUser = {
      phone: phone,
      fullname: fullName,
      birthDate: birthDate,
      gender: gender,
      password: password,
    };
    const route=Variable.routeApi+"api/usermanagement/signup"
    
    axios
      .post(`${route}`, tempUser)
      .then((response) => {
        setDialogVisibility(true)
        uploadCodeToComponent(phone)
        toggleSinup2()
        
      })
      .catch((error) => {
        
        setDialogMessage("Ce numero de telephone existe déjà dans notre base de données")
        setDialogVisibility(true)
        console.log(error);
      });

   }
    

  };

  return (
    <section className="bg-white relative w-full  box-shadow lg:w-[28vw] lg:h-[90vh] lg:p-4 p-5 dark:bg-gray-900 lg:rounded-xl">
      <div className="">
        <div className=" max-w-2xl mx-auto lg:w-4/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-red-600 mt-10 lg:mt-3 text-gray-800 text-center  capitalize dark:text-white">
              S'inscrire
            </h1>
            <div className="absolute z-20 ml-4 lg:ml-0  mt-20 lg:mt-20 lg:mr-15 w-4/5">
              {dialogVisibility?<SimpleDialog message={dialogMessage} handleClose={()=>handleCloseDialog()} />:null}
              
              
            </div>

            <p className="mt-2 text-gray-700 dark:text-gray-400 text-center">
            Please fill in these fields to log in.
            </p>
          
            <form className="gap-6 mt-4 " onSubmit={(e) => handleSubmit(e)}>
            <div>
                <label className="block mb-2 ">Phone number</label>
                  <PhoneInput
                   inputClass="block w-full h-full mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                   country={'cm'}
                   onChange={(value:any) => setPhone( value)}
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
                  <label className="block mb-2 text-sm mt-3 ">Password confirmation</label>
                  <input
                  value={Confirmpassword}
                  onChange={handleConfirmPasswordChange}
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  required
                  />
                  <label className="flex items-center mt-2"></label>
                  <input
                    type="checkbox"
                    className="mr-2 w-4 h-4"
                    checked={isPasswordVisible}
                    onChange={togglePasswordVisibility}
                />
        <span className="text-sm text-gray-600">Show password</span>
              </div>
              <button
                // onClick={() => handleSubmit()}
                type="submit"
                className="flex items-center justify-center w-full mt-10 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
              >
                Signup
              </button>
              <p className="flex items-center justify-center mt-2">
                You already have an account?
                <button className="signin  text-red-500" onClick={() => handleClick()}>
                  {" "}
                  Signin
                </button>
              </p>
            </form>
            <img
              src={logo}
              alt="Logo Afriland First Bank"
              className="lg:pb-8  lg:mb-9 lg:w-50 lg:h-25 lg:relative lg:t-10 "
            ></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup3;
