'use client'
import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center items-center min-h-screen text-center'>
        <div>
          <div className='mx-auto border-t-2 border-b-2 border-blue-500 rounded-full w-12 h-12 animate-spin'></div>
          <p className='mt-4'>Loading your applications...</p>
        </div>
      </div>
  )
}
