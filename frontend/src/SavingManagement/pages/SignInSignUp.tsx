import React from 'react'

const SignInSignUp = () => {
  return (
    <div className='items-center bg-whiteh-full w-full'>
      <div className='bg-[#BB0A01] justify-items-center justify-center h-fit w-56 px-8 py-3 absolute bottom-56 right-[12vh] md:right-[45vw] rounded-full'>
        <a href='/' className='text-[#E6E7E8] mx-12'>Sign In</a>
      </div>
      <div className='bg-[#ecf1ff80] justify-items-center h-fit w-56 px-8 py-3 absolute bottom-40 right-[12vh] md:right-[45vw] rounded-full'>
        <a href='/signup' className='text-[#BB0A01] mx-12'>Sign Up</a>
      </div>
    </div>
  )
}

export default SignInSignUp