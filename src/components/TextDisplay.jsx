import React from 'react'

export default function TextDisplay({givenText,typedText,resetEverything}) {
  let typedArray = typedText.split('');
  let givenArray = givenText.split('');
  return (
      <div className='text-justify w-4/5 sm:w-3/5 text-base sm:text-lg md:text-xl lg:text-2xl h-full overflow-y-auto p-1'>
          {givenArray.map((val, ind) => {
              if (val == typedArray[ind] && ind < typedArray.length) { //Characters which are correctly been typed
                //spans cannot be used dur to certain problems with them, so we will use divs with inline display to animate the cursor border properly
                  return <div key={ind} className={`${ind === typedArray.length - 1 ? 'border-r-2' : ''} ${typedArray.length === 0 && ind === 0? 'border-l-2' : ''} character inline border-purple-500 text-purple-700`}>{val}</div>
                } else if(val !== typedArray[ind] && ind < typedArray.length){ //Characters which have been typed incorrectly
                  return <div key={ind} className={`${ind === typedArray.length - 1 ? 'border-r-2' : ''} ${typedArray.length === 0 && ind === 0? 'border-l-2' : ''} character inline border-purple-500 ${val===' '?'underline decoration-red-500':'text-red-500'}`}>{val}</div>
              } else { //Characters not typed yet
                  return <div key={ind} className={`${ind === typedArray.length - 1 ? 'border-r-2' : ''} ${typedArray.length === 0 && ind === 0? 'border-l-2' : ''} character inline border-purple-500 text-slate-400`}>{val}</div>
              }
          })}
          

      </div>
  )
}
