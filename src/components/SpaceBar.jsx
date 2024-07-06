import React from 'react'

export default function SpaceBar({pressed}) {
  return (
    <div className={`keystroke rounded  flex justify-center items-center w-[24rem] h-4 p-10 text-3xl hover:bg-gray-300 transition ${pressed.includes(' ')?'bg-green-100 translate-y-[4px]':' bg-gray-100 shadow-[0px_4px_1px_0.2px] shadow-gray-300'}`}>
        __
    </div>
  )
}
