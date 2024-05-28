/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import 'react-phone-input-2/lib/style.css'
import AuthContext from '../AuthContext'
import { request } from '../../../axios_helper'


const Phonepsswrd = () => {
    const [visible, setVisible] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false)
    const {formData, setFormData} = useContext(AuthContext);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePhoneChange = (value: string) => {
        setFormData((prevData:any) => {
            return {...prevData, phoneNum: value}
        })
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value
        setFormIsValid(
            passwordValue.length >= 8 && /[A-Z]/.test(passwordValue) && /\d/.test(passwordValue) && /\W/.test(passwordValue) && passwordValue === confirmPassword
        )
        setFormData((prevData: any) => {
            return { ...prevData, password: passwordValue}
        })
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPasswordValue = e.target.value
        setFormIsValid(e.target.value.length >= 8 && /[A-Z]/.test(e.target.value) && /\d/.test(e.target.value) && /\W/.test(e.target.value) && e.target.value === formData.password)
        setConfirmPassword(confirmPasswordValue);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(formData.phoneNum.length >= 10 && formData.password.length >= 8 && confirmPassword.length >= 8 && formData.password === confirmPassword){
            console.log(formData)
            window.location.href = '/signup/3'
            /* try {
                const response = await request('POST', '/userManagement/sendOtp', formData)
                if (response.status === 200) {
                    window.location.href = '/signup/3'
                } else {
                    alert('Something went wrong. Please try again.')
                }
            } catch (error) {
                console.error(error);
                alert('Something went wrong. Please try again.2')
            } */
        } else {
            console.log(formData)
            alert('Please fill in all fields')
        }
    }

    
  return (
    <div className='items-center bg-white w-full h-full flex-col pt-10 px-5 pb-5'>
        <div className='items-center w-full h-16 p-4'>
            <p className='absolute right-[40vw] md:right-1/2 text-3xl font-title text-[#BB0A01]'>Sign Up</p>
        </div>
        <div className="mt-5 h-fit w-full md:w-2/5 md:absolute md:top-56 md:right-[10vw] pt-5 shadow-sm md:border-none md:shadow-md rounded-xl">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x ml-5 mb-5">
                Phone & Password
            </h1>
            <form className="space-y-10 md:space-y-10 p-5" onSubmit={handleSubmit}>
                <div>
                    <span className="text-gray-900 text-sm font-medium mr-10">Phone Number</span>
                    <PhoneInput 
                        country={"cm"}
                        value={formData.phoneNum}
                        onChange={handlePhoneChange}
                        inputStyle={{
                            height: '3rem',
                            width: '100%',
                            borderRadius: '0.5rem',
                        }}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                    <div className="flex justify-between items-center">
                        <input value={formData.password} type={visible ? "text" : "password"} name="password" id="password" onChange={handlePasswordChange} placeholder="password" className="bg-[#f5f5f5] border-b rounded-tr-none rounded-br-none border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:border-[#BB0A01] block w-full p-2.5"/>
                        <div className="h-10 w-10 p-3 bg-[#f5f5f5] border-b rounded-r-lg" onClick={() => setVisible(!visible)}>
                            {
                                visible ? <FontAwesomeIcon icon={faEye} size='sm' style={{color:"#0c1013",}}/> : <FontAwesomeIcon icon={faEyeSlash} size='sm' style={{color:"#0c1013"}}/>
                            }
                        </div>
                    </div>
                    
                </div>
                <div>
                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm your password</label>
                    <input type="text" name="confirm-password" value={confirmPassword} id="confirm-password" onChange={handleConfirmPasswordChange} placeholder=" password" className="bg-[#f5f5f5] border-b border-gray-300 text-gray-900 text-sm mb-32 rounded-lg outline-none focus:border-[#BB0A01] block w-full p-2.5" />
                </div>
                <button type="submit" className="w-full h-14 text-white bg-[#BB0A01] outline-none font-medium rounded-full md:rounded-lg text-sm px-5 py-2.5 text-center">Next</button>
            </form>    
        </div>
    </div>
  )
}

export default Phonepsswrd