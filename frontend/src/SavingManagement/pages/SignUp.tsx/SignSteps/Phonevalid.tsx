import React, { useContext, useState } from "react";
import VerificationInput from "react-verification-input";
import axios from "axios";
import AuthContext from "../AuthContext";

interface VerifyOtpResponse {
  success: boolean;
}

const Phonevalid = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { formData, setFormData } = useContext(AuthContext);

  const handleCodeChange = (value: string) => {
    setFormData((prevData: any) => {
      return { ...prevData, code: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = "/portal";
    /* try {
            const response = await axios.post<VerifyOtpResponse>('localhost:8080/api/usersManagement/verifyOtp', 
            {
                code: formData.code,
                phone: formData.phone
            })
            if (response.data.success) {
                setErrorMessage('')
                window.location.href = '/portal'
            } else {
                setErrorMessage("OTP verification failed")
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while verifying the OTP.");
        } */
  };
  return (
    <div className="items-center bg-white w-full h-full flex-col pt-10 px-5 pb-5">
      <div className="items-center w-full h-16 p-4">
        <p className="absolute right-[40vw] md:right-1/2 text-3xl font-title text-[#BB0A01]">
          Sign Up
        </p>
      </div>
      <div className="mt-5 h-fit w-full md:w-2/5 md:absolute md:top-64 md:right-[10vw] pt-5 shadow-sm md:border-none md:shadow-md rounded-xl">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x ml-5 mb-5">
          Phone Number Verification
        </h1>
        <form className="space-y-8 md:space-y-10 p-5" onSubmit={handleSubmit}>
          <div className="rounded-xl flex flex-col mb-12">
            <span className="text-gray-900 text-xl mb-5 font-medium mr-10">
              Get your code
            </span>
            <span className="text-gray-500 text-sm mb-2 font-extralight mr-10">
              Pease enter the 5-digit code that send to your phone number
            </span>
            <VerificationInput
              length={5}
              placeholder=" "
              value={formData.code}
              classNames={{ container: "container", character: "character" }}
              containerProps={{ style: { height: "4rem", padding: "0.5rem" } }}
              validChars="0-9"
              onChange={handleCodeChange}
            />
          </div>
          <button
            type="submit"
            className="w-full h-14 text-white bg-[#BB0A01] outline-none font-medium rounded-full md:rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Verify and Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Phonevalid;
