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
  const urls = {productionUrl : 'https://simpletype-backend.onrender.com', devUrl : 'http://localhost:3000'}
  const [userInfo, setUserInfo] = useState({isAuth: false, email: null});
  const [isLoading,setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const [showSettingsModal, setSettingsModal] = useState(false);
  const [showResultsModal, setResultsModal] = useState(false);
  const [config, setConfig]  = useState({backspaceAllowed: false});
  const [results, setResults] = useState(null);

  async function getResults() {
    setIsLoading(true);
    const response = await fetch(import.meta.env.PRODUCTION?urls.productionUrl+"/users/getresults":urls.devUrl+"/users/getresults", {
      method: 'GET',
      credentials: 'include'
    }
    ).then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if(data.payload){ //If user has some saved results
            let updatedResults = new Array();
            data.payload.map((val,ind)=>{
              updatedResults.push({gross: val.gross, net: val.net, timeTaken: val.timeTaken, title: val.title, dtime: val.dtime});
            })
            setResults(updatedResults.map((val)=>{
              return {gross: val.gross, net: val.net, timeTaken: val.timeTaken, title: val.title, dtime: val.dtime}
            }))
          } else {
            setResults(null);
          }
          setIsLoading(false);
        } else {
          showAlert("Could not retrieve results!");
          setIsLoading(false);
        }
      }
      )
  }

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
    const response = await fetch(import.meta.env.PRODUCTION?urls.productionUrl+"/loginstatus":urls.devUrl+"/loginstatus",{
      method: 'GET',
      credentials: 'include'
    }
  ).then((response)=>response.json())
  .then((data)=>{
    if(data.success){
      setUserInfo({...userInfo, isAuth: true, email: data.payload});
      setIsLoading(false);
    }else{
      console.log("No session was found!");
      setIsLoading(false);
    }
  })

  }
  useEffect(()=>{
    checkLogin();
  },[])

  useEffect(()=>{
    if(userInfo.isAuth){
      getResults();
    }else{
      setResults(null);
    }
  },[userInfo])

  return (
    <div className='grid grid-cols-4 grid-rows-10  mx-auto h-screen'>
      <Alert alerts={alerts}></Alert>
      <Loader isLoading={isLoading}></Loader>
        <BrowserRouter basename={import.meta.env.NODE_ENV === 'production'?'/simpletype':undefined}>
          <div className="col-span-4 row-span-1">
            <Navbar urls={urls} showAlert={showAlert} toggleSettingsModal={toggleSettingsModal} toggleResultsModal={toggleResultsModal} setIsLoading={setIsLoading} userInfo={userInfo} setUserInfo={setUserInfo}></Navbar>
          </div>
          <Routes>
            <Route path="/" element={<TypingArea urls={urls} getResults={getResults} results={results} setResults={setResults} showAlert={showAlert} config={config} setIsLoading={setIsLoading} userInfo={userInfo}/>} />
            <Route path="/login" element={<Login urls={urls} setIsLoading={setIsLoading} showAlert={showAlert} setUserInfo={setUserInfo}/>} />
            <Route path="/signup" element={<Signup urls={urls} setIsLoading={setIsLoading} showAlert={showAlert}/>} />
          </Routes>
        </BrowserRouter>
      <UnderConstruction></UnderConstruction>
      <Settings config={config} setConfig={setConfig} visible={showSettingsModal} toggleVisible={toggleSettingsModal}></Settings>
      <ResultsModal visible={showResultsModal} toggleVisible={toggleResultsModal} results={results}></ResultsModal>
    </div>
  )
}

export default App
