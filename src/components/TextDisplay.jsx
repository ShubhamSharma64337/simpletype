import React from 'react'

export default function TextDisplay({givenText,typedText,resetEverything}) {
  let typedArray = typedText.split('');
  let givenArray = givenText.split('');
  return (
      <div className='text-justify w-4/5 sm:w-3/5'>
          {givenArray.map((val, ind) => {
              if (val == typedArray[ind] && ind < typedArray.length) { //Characters which are correctly been typed
                  return <span key={ind} className={`${ind === typedArray.length - 1 ? 'border-r-2' : ''} ${typedArray.length === 0 && ind === 0? 'border-l-2' : ''} border-purple-500 text-2xl text-purple-700`}>{val}</span>
                } else if(val !== typedArray[ind] && ind < typedArray.length){ //Characters which have been typed incorrectly
                  return <span key={ind} className={`${ind === typedArray.length - 1 ? 'border-r-2' : ''} ${typedArray.length === 0 && ind === 0? 'border-l-2' : ''} border-purple-500 text-2xl ${val===' '?'underline decoration-red-500':'text-red-500'}`}>{val}</span>
              } else { //Characters not typed yet
                  return <span key={ind} className={`${ind === typedArray.length - 1 ? 'border-r-2' : ''} ${typedArray.length === 0 && ind === 0? 'border-l-2' : ''} border-purple-500 text-2xl text-slate-400`}>{val}</span>
              }
          })}
          <div className='text-slate-600 text-right'>
                    <button className=' hover:bg-slate-200 p-2 rounded-full' onClick={resetEverything}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
            </svg>
                    </button>
          </div>

      </div>
  )
}
