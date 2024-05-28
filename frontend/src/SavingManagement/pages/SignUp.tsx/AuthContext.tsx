import React, { createContext, useState } from 'react'

interface AuthContextData {
    formData : any
    setFormData: React.Dispatch<React.SetStateAction<any>>
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [formData, setFormData] = useState({
      phoneNum: '',
      fullname: '',
      gender: '',
      birthday: '',
      password: '',
      role: 'user',
    })
  return (
    <AuthContext.Provider value={{formData, setFormData}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
