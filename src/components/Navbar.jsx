import React from 'react'
import { Outlet, Link } from "react-router-dom";


export default function Navbar({ toggleSettingsModal,showAlert,setIsLoading, toggleResultsModal,userInfo, setUserInfo }) {
  async function tryLogout(){
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/users/logout",{
      method: 'GET',
      credentials: 'include'
    }
  ).then((response)=>response.json())
  .then((data)=>{
    if(data.success){
      setUserInfo(false);
      setIsLoading(false);
      showAlert("Successfully logged out");
    }else{
      setIsLoading(false);
      showAlert("Could not log out"); 
    }
  })

  }
  return (
    <div className='p-3 flex justify-between items-center'>
      <Link to={'/'} className="logo flex justify-center items-center text-2xl text-purple-700 font-serif">
        Simpletype
      </Link>
      <div className="right flex justify-center items-center">
        
        <div className="right flex justify-center items-center">
          <div className="nav-links">
            <ul className='flex justify-center items-center gap-x-2'>
              <li className={`${userInfo.isAuth?'hidden':''}`}>
                <Link className='px-3 py-2 bg-purple-100 rounded text-sm font-medium hover:bg-purple-200 transition-colors' to={'/login'}>Login</Link>
              </li>
              <li className={`${userInfo.isAuth?'hidden':''}`}>
                <Link className='px-3 py-2 bg-purple-100 rounded text-sm font-medium hover:bg-purple-200 transition-colors' to={'/signup'}>Signup</Link>
              </li>
              <li className={`${userInfo.isAuth?'':'hidden'}`}>
                <div className='px-3 py-2text-sm font-medium'>{userInfo.email}</div>
              </li>
              <li className={`${userInfo.isAuth?'':'hidden'}`}>
                <button className='px-3 py-2 bg-purple-100 rounded text-sm font-medium hover:bg-purple-200 transition-colors' onClick={tryLogout}>Logout</button>
              </li>
              <li>
                <div className='p-2 text-slate-700 transition hover:bg-slate-200 rounded-full' onClick={toggleResultsModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 sm:size-7 lg:size-8">
                    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375ZM6 12a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V12Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 15a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V15Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75ZM6 18a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H6.75a.75.75 0 0 1-.75-.75V18Zm2.25 0a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                  </svg>
                </div>
              </li>
              <li>
                <div className='p-1 text-slate-700 transition hover:bg-slate-200 rounded-full' onClick={toggleSettingsModal}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 sm:size-7 lg:size-8">
                    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
