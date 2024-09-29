import React from 'react'

export default function TextDisplay({givenText,typedText,chunkIndex,chunkSize,resetEverything}) {
  let typedArray = typedText.split('').slice(chunkIndex*chunkSize,chunkIndex*chunkSize+chunkSize);
  let givenArray = givenText.split('').slice(chunkIndex*chunkSize,chunkIndex*chunkSize+chunkSize);;
  return (
      <div className='w-4/5 sm:w-3/5 text-base sm:text-lg md:text-xl lg:text-2xl h-full overflow-y-auto p-1'>
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
      {Math.floor((givenText.split('').length / chunkSize)) == chunkIndex ? '' :
        <div className="next inline mx-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="inline text-slate-400 size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      }
      <div className="progress-info justify-center flex gap-x-2 p-4 my-4">
        {Array(Math.ceil((givenText.split('').length / chunkSize))).fill(1).map((val,ind)=>{
          return <div className={`rounded w-4 h-2 ${ind<chunkIndex+1?'bg-purple-400':'bg-slate-300'}`}></div>
        })}
      </div>
    </div>
  )
}
