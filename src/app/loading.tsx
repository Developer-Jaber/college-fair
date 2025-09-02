'use client'
import React from 'react'

export default function loading() {
  return (
    <div className='flex justify-center items-center min-h-screen text-center'>
        <div>
          <div className='mx-auto border-[var(--primary)] border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin'></div>
          <p className='mt-4'>Loading.... Please Waiit.</p>
        </div>
      </div>
  )
}
