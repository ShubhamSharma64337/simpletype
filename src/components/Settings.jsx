import React from 'react'

export default function Settings({config,setConfig,visible,toggleVisible}) {
    function checkHandler(e){
        let checked = e.currentTarget.checked;
        let name = e.currentTarget.name;
        setConfig({...config, [name]:checked})
    }
  return (
    visible && <div className='overlay flex justify-center items-center bg-white bg-opacity-50 absolute h-screen w-screen top-0 left-0 text-xl'>
        <div className="modal bg-white shadow border rounded p-5 w-4/5 sm:w-3/5 md:w-2/5">
            <div className="modal-header flex justify-between items-center mb-5">
                <div className="font-bold">
                    Settings
                </div>
                  <button className='hover:bg-slate-200 rounded-full p-2'  onClick={toggleVisible}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                          <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                      </svg>
                  </button>
            </div>
            <div className="modal-body text-lg">
                <ul>
                    <li className='pe-2 flex justify-between items-center'>Allow Backspace <input type='checkbox' className='size-5 accent-purple-600' name={'backspaceAllowed'} onChange={checkHandler} checked={config.backspaceAllowed}></input></li>

                </ul>
            </div>
        </div>
    </div>
  )
}
