import { useState, useEffect } from 'react'
import './App.css'
import Loader from './components/Loader'
import UnderConstruction from './components/UnderConstruction'
import Navbar from './components/Navbar'
import Settings from './components/Settings'
import Alert from './components/Alert'
import ResultsModal from './components/ResultsModal'
import TypingArea from './components/TypingArea'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import Login from './components/Login'
import Signup from './components/Signup'

function App() {
  const [authStatus, setAuthStatus] = useState({isAuth: false, email: null});
  const [isLoading,setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const [showSettingsModal, setSettingsModal] = useState(false);
  const [showResultsModal, setResultsModal] = useState(false);
  const [config, setConfig]  = useState({backspaceAllowed: false});
  const [results, setResults] = useState(null);

  function showAlert(message){
    setAlerts(message)
    setTimeout(()=>{
      setAlerts(null);
    },3000)
  }
  
  function toggleSettingsModal(){
    showSettingsModal?setSettingsModal(false):setSettingsModal(true);
  }
  function toggleResultsModal(){
    showResultsModal?setResultsModal(false):setResultsModal(true);
  }

  async function checkLogin(){
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/loginstatus",{
      method: 'GET',
      credentials: 'include'
    }
  ).then((response)=>response.json())
  .then((data)=>{
    if(data.success){
      setAuthStatus({...authStatus, isAuth: true, email: data.message});
      setIsLoading(false);
    }else{
      setIsLoading(false);
    }
  })

  }
  useEffect(()=>{
    checkLogin();
  },[])

  return (
    <div className='grid grid-cols-4 grid-rows-10  mx-auto h-screen'>
      <Alert alerts={alerts}></Alert>
      <Loader isLoading={isLoading}></Loader>
        <BrowserRouter basename={process.env.NODE_ENV === 'production'?'/simpletype':undefined}>
          <div className="col-span-4 row-span-1">
            <Navbar showAlert={showAlert} toggleSettingsModal={toggleSettingsModal} toggleResultsModal={toggleResultsModal} setIsLoading={setIsLoading} authStatus={authStatus} setAuthStatus={setAuthStatus}></Navbar>
          </div>
          <Routes>
            <Route path="/" element={<TypingArea results={results} setResults={setResults} showAlert={showAlert} config={config}/>} />
            <Route path="/login" element={<Login setIsLoading={setIsLoading} showAlert={showAlert} setAuthStatus={setAuthStatus}/>} />
            <Route path="/signup" element={<Signup setIsLoading={setIsLoading} showAlert={showAlert}/>} />
          </Routes>
        </BrowserRouter>
      <UnderConstruction></UnderConstruction>
      <Settings config={config} setConfig={setConfig} visible={showSettingsModal} toggleVisible={toggleSettingsModal}></Settings>
      <ResultsModal visible={showResultsModal} toggleVisible={toggleResultsModal} results={results}></ResultsModal>
    </div>
  )
}

export default App
