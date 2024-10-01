import React from 'react'

export default function Loader({isLoading}) {
  return (
    isLoading && <div className='loader fixed top-0 left-0 overlay flex flex-col gap-y-2 justify-center items-center bg-white bg-opacity-50 w-screen h-screen z-10'>
        <div className='loader-ring rounded-full p-5 border-4 border-transparent border-r-purple-500 border-t-purple-500'></div>
        <div className="note bg-white p-2 rounded border"><strong>Note - </strong>It can take around 50s on first visit</div>
    </div>
  )
}
