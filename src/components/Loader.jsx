import React from 'react'

export default function Loader({isLoading}) {
  return (
    isLoading && <div className='loader fixed top-0 left-0 overlay flex justify-center items-center bg-white bg-opacity-50 w-screen h-screen'>
        <div className='loader-ring rounded-full p-5 border-4 border-transparent border-r-purple-500 border-t-purple-500'></div>
    </div>
  )
}
