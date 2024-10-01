import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Signup({setIsLoading,showAlert,urls}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const navigate = useNavigate();

  async function trySignup(){
    if(!document.querySelector('#signupForm').checkValidity()){
        document.querySelector('#signupForm').reportValidity();
        return;
    }
    setIsLoading(true);
    try{
        const response = await fetch(import.meta.env.PROD?urls.productionUrl+"/signup":urls.devUrl+"/signup",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: document.querySelector('#emailInput').value, password: document.querySelector('#passwordInput').value})
        }).then((response)=> response.json() )
        .then((data)=>{
                setIsLoading(false);
                showAlert(data.message)
                if(data.success){
                    navigate('/login')
                }
        });
    } catch(e){
        console.log(e)
    }
    
  }
  return (
    <div className='flex justify-center col-span-4 row-span-9 items-center'>
        <form id={'signupForm'} className='flex flex-col gap-y-5 border p-10 text-xl h-min'>
            <div className='input-group border-b'>
                <input type='text' placeholder='Email' id='emailInput' required={true} className='px-3 py-2 outline-none'></input>
            </div>
            <div className='input-group border-b'>
                <input type='password' placeholder='Password' id='passwordInput' required={true} className='px-3 py-2 outline-none'></input>
            </div>
            <div className='input-group border-b'>
                <input type='password' placeholder='Re-enter Password' id='confirmPasswordInput' required={true} className='px-3 py-2 outline-none'></input>
            </div>
            <div className='input-group my-4'>
                <div className='bg-purple-100 rounded px-3 py-2 text-lg transition-colors hover:bg-purple-200 text-center text-slate-800 hover:cursor-pointer' onClick={trySignup}>Sign Up</div>
            </div>
              <div className='input-group text-sm text-slate-400 flex gap-x-2 items-center justify-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <Link to={'/'}>Back to home</Link>
              </div>

        </form>
    </div>
  )
}
