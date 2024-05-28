import React, { useContext, useState } from 'react'
import AuthContext from '../AuthContext'

const SignUp = () => {
  const { formData, setFormData } = useContext(AuthContext);
  const [terms, setTerms] = useState(false);

  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullNameValue = e.target.value
    setFormData((prevData: any) => {
      return {...prevData, fullname: fullNameValue}
    })
  }

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genderValue = e.target.value
    setFormData((prevData: any) => {
      return {...prevData, gender: genderValue}
    })
  }

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const termsAccept = e.target.checked
    setTerms(termsAccept)
  }

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const birthdayValue = e.target.value
    setFormData((prevData: any) => {
      return {...prevData, birthday: birthdayValue}
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.fullname ||!formData.gender ||!formData.birthday || !terms) {
      alert('Please fill in all fields')
      return
    }
    window.location.href = '/signup/2'
  }

  return (
    <div className='items-center bg-white w-full h-full flex-col pt-10 px-5 pb-5'>
      <div className='items-center w-full h-16 p-4'>
        <p className='absolute right-[40vw] md:right-1/2 text-3xl font-title text-[#BB0A01]'>Sign Up</p>
      </div>
      <div className="mt-2 h-fit w-full md:w-2/5 md:absolute md:right-[10vw] pt-5 border-black shadow-sm md:border-  md:shadow-md rounded-bl-xl rounded-br-xl">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-2x ml-5 mb-5">
            Personal Information
        </h1>
        <form className="space-y-10 md:space-y-10 p-5" onSubmit={handleSubmit}>
          <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
              <input type="text" name="name" id="name" value={formData.fullname} className="bg-[#f5f5f5] border-b border-gray-300 text-gray-900 sm:text-sm rounded-lg outline-none focus:border-[#BB0A01] block w-full p-2.5" placeholder="Eyape Njukandji" onChange={handleFullNameChange}/>
          </div>
          <div>
            <span className="text-gray-900 text-sm font-medium mr-10">Gender :</span>
            <label className="inline-flex items-center mr-2">
              <input type="radio" className="form-radio" name="gender" value="male" onChange={handleGenderChange}/>
              <span className="ml-2 text-sm">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input type="radio" className="form-radio" name="gender" value="female" onChange={handleGenderChange}/>
              <span className="ml-2 text-sm">Female</span>
            </label>
          </div>
          <div>
              <div className="mb-5">
                  <label htmlFor="birthday" className="block mr-5 mb-2 font-medium text-sm text-gray-900">
                      Date of Birth :
                  </label>
                  <input type="date" name="birthday" id="date" value={formData.birthday}
                      className=" w-full rounded-md border-b border-[#e0e0e0] bg-[#f5f5f5] p-2.5 text-base font-medium text-[#6B7280] outline-none focus:border-[#BB0A01] focus:shadow-md"  onChange={handleBirthdayChange}/>
              </div>
          </div>
          <div className="flex items-start">
              <div className="flex items-center h-5">
                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" onChange={handleTermsChange}/>
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500">
                  I accept the 
                  <a className="font-medium md:font-semibold text-gray-600 hover:underline" href="/terms-and-condition"> Terms and Conditions</a>
                </label>
              </div>
          </div>
          <button type="submit" className="w-full h-14 text-white bg-[#BB0A01] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full md:rounded-lg text-sm px-5 py-2.5 text-center">Next</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <a href="/" className="font-medium md:font-semibold text-gray-600 hover:underline">Login here</a>
          </p>
        </form>
        
      </div>
    </div>
  )
}

export default SignUp
