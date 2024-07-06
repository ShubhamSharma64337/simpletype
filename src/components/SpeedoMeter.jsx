export default function SpeedoMeter({timeElapsed,typedText}) {
  return (
    <div className='text-3xl py-5 flex gap-x-4'>
       <div className="time-elapsed border-r-2 px-5 flex justify-center items-center gap-x-4 text-slate-700">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
</svg>

{timeElapsed>60?parseInt(timeElapsed/60) + ' m ' + timeElapsed%60 + ' s':timeElapsed + ' s'} 
       </div>
        
       <div className='flex items-center justify-center gap-x-4 text-slate-700'>
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
  <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14.25a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.546 3.75 3.75 0 0 1 3.255 3.718Z" clipRule="evenodd" />
</svg>
       {timeElapsed === 0 ? '0' : parseInt(typedText.split(' ').length*60/timeElapsed)} wpm
       </div>
    </div>
  )
}
