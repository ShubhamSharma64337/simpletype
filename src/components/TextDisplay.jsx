import React from 'react'

export default function TextDisplay({givenText,typedText}) {
  let typedArray = typedText.split('');
  let givenArray = givenText.split('');
  console.log('Typed ',typedArray);
  console.log('Given ',givenArray);
  return (
      <div className='text-justify'>
          {givenArray.map((val, ind) => {
              if (val == typedArray[ind] && ind < typedArray.length) { //Characters which are correctly been typed
                  return <span key={ind} className={`${ind === typedArray.length - 1 ? 'border-r-2' : ''} ${typedArray.length === 0 && ind === 0? 'border-l-2' : ''} border-purple-500 text-2xl text-purple-700`}>{val}</span>
                } else if(val !== typedArray[ind] && ind < typedArray.length){ //Characters which have been typed incorrectly
                  return <span key={ind} className={`${ind === typedArray.length - 1 ? 'border-r-2' : ''} ${typedArray.length === 0 && ind === 0? 'border-l-2' : ''} border-purple-500 text-2xl text-red-500`}>{val}</span>
              } else { //Characters not typed yet
                  return <span key={ind} className={`${ind === typedArray.length - 1 ? 'border-r-2' : ''} ${typedArray.length === 0 && ind === 0? 'border-l-2' : ''} border-purple-500 text-2xl text-slate-400`}>{val}</span>
              }
          })}
      </div>
  )
}
