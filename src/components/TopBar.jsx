export default function TopBar({title,timeElapsed,typedText,resetEverything,nextPara,prevPara}) {
  return (
    <div className='text-base sm:text-lg md:text-xl lg:text-2xl py-5 flex justify-between w-4/5 sm:w-3/5'>
      <div className='left flex justify-center items-center gap-x-4'>
        <div className=' reset-button text-slate-700 hover:bg-slate-200 p-2 rounded-full' onClick={resetEverything}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 sm:size-6 md:size-7 lg:size-8">
            <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="previous-button hover:bg-slate-200 p-2 rounded-full" onClick={prevPara}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 sm:size-6 md:size-7 lg:size-8">
            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
          </svg>

        </div>
        <div className="next-button hover:bg-slate-200 p-2 rounded-full" onClick={nextPara}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 sm:size-6 md:size-7 lg:size-8">
            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="title hidden md:block text-center">
        {title}
      </div>
      <div className="right flex items-center justify-center gap-x-4">
        <div className="time-elapsed border-r-2 px-5 flex justify-center items-center gap-x-4 text-slate-700">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 sm:size-6 md:size-7 lg:size-8">
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
          </svg>
          {timeElapsed > 60 ? parseInt(timeElapsed / 60) + ' m ' + timeElapsed % 60 + ' s' : timeElapsed + ' s'}
        </div>

        <div className='speed flex items-center justify-center gap-x-4 text-slate-700'>
          <svg fill="currentColor" className="size-8" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-q</title><path d="M425.7,118.25A240,240,0,0,0,76.32,447l.18.2c.33.35.64.71,1,1.05.74.84,1.58,1.79,2.57,2.78a41.17,41.17,0,0,0,60.36-.42,157.13,157.13,0,0,1,231.26,0,41.18,41.18,0,0,0,60.65.06l3.21-3.5.18-.2a239.93,239.93,0,0,0-10-328.76ZM240,128a16,16,0,0,1,32,0v32a16,16,0,0,1-32,0ZM128,304H96a16,16,0,0,1,0-32h32a16,16,0,0,1,0,32Zm48.8-95.2a16,16,0,0,1-22.62,0l-22.63-22.62a16,16,0,0,1,22.63-22.63l22.62,22.63A16,16,0,0,1,176.8,208.8Zm149.3,23.1-47.5,75.5a31,31,0,0,1-7,7,30.11,30.11,0,0,1-35-49l75.5-47.5a10.23,10.23,0,0,1,11.7,0A10.06,10.06,0,0,1,326.1,231.9Zm31.72-23.1a16,16,0,0,1-22.62-22.62l22.62-22.63a16,16,0,0,1,22.63,22.63ZM423.7,436.4h0ZM416,304H384a16,16,0,0,1,0-32h32a16,16,0,0,1,0,32Z" /></svg>
          {timeElapsed === 0 ? '0' : parseInt(typedText.split(' ').length * 60 / timeElapsed)} wpm
        </div>
      </div>
    </div>
  )
}
