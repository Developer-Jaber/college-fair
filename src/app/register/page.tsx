'use client'

import RegisterForm from "./components/RegisterForm"

export default function RegisterPage () {
  return (
    <div className='flex justify-center items-center bg-[var(--background)] py-42 min-h-screen'>
      <div className='bg-white shadow-lg rounded-xl w-full max-w-md overflow-hidden'>
        <div className='bg-[var(--primary)] p-6 text-white'>
          <h1 className='font-bold text-2xl'>Create Account</h1>
          <p className='text-blue-100'>Join us to get started</p>
        </div>

        {/* Form here */}
        <RegisterForm></RegisterForm>
      </div>
    </div>
  )
}
