import React, { useState } from 'react'

export default function TextDisplay({givenText,typedText,chunkIndex,chunkSize,keyDownHandler, keyUpHandler}) {
  const [active,setActive] = useState(false);
  let typedArray = typedText.split('').slice(chunkIndex*chunkSize,chunkIndex*chunkSize+chunkSize);
  let givenArray = givenText.split('').slice(chunkIndex*chunkSize,chunkIndex*chunkSize+chunkSize);;
  function activateTyping(){
    console.log("Activated!");
    setActive(true);
  }
  
  window.onclick = (e)=>{
    if(document.querySelector("#typingRegion") !== document.activeElement){
      setActive(false);
    }
  }
  return (
      <div id="typingRegion" className='relative text-justify w-4/5 sm:w-3/5 text-base sm:text-lg md:text-xl lg:text-2xl h-full overflow-y-auto p-1 outline-none'  onKeyDown={keyDownHandler} onKeyUp={keyUpHandler} tabIndex={0}>
      <div onClick={activateTyping} className={`${active ? 'hidden' : ''} banner text-xl select-none hover:cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-80 w-full h-full flex gap-x-2 justify-center items-center rounded`}>
        <div className="pane bg-white flex gap-x-2 p-3 rounded-md bg-opacity-90 border border-slate-400 shadow-lg">
          <div className="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
            <path fillRule="evenodd" d="M12 1.5a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.25A.75.75 0 0 1 12 1.5ZM5.636 4.136a.75.75 0 0 1 1.06 0l1.592 1.591a.75.75 0 0 1-1.061 1.06l-1.591-1.59a.75.75 0 0 1 0-1.061Zm12.728 0a.75.75 0 0 1 0 1.06l-1.591 1.592a.75.75 0 0 1-1.06-1.061l1.59-1.591a.75.75 0 0 1 1.061 0Zm-6.816 4.496a.75.75 0 0 1 .82.311l5.228 7.917a.75.75 0 0 1-.777 1.148l-2.097-.43 1.045 3.9a.75.75 0 0 1-1.45.388l-1.044-3.899-1.601 1.42a.75.75 0 0 1-1.247-.606l.569-9.47a.75.75 0 0 1 .554-.68ZM3 10.5a.75.75 0 0 1 .75-.75H6a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10.5Zm14.25 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H18a.75.75 0 0 1-.75-.75Zm-8.962 3.712a.75.75 0 0 1 0 1.061l-1.591 1.591a.75.75 0 1 1-1.061-1.06l1.591-1.592a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>
          </div>
          <div className="text">
            Click to focus
          </div>
        </div>
      </div>
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
          return <div key={ind} className={`rounded w-4 h-2 ${ind<chunkIndex+1?'bg-purple-400':'bg-slate-300'}`}></div>
        })}
      </div>
    </div>
  )
}
