import { useState } from 'react'
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

function App() {
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

  return (
    <div className='grid grid-cols-4 grid-rows-10  mx-auto h-screen'>
      <Alert alerts={alerts}></Alert>
      <Loader isLoading={isLoading}></Loader>
        <BrowserRouter basename='/simpletype'>
          <div className="col-span-4 row-span-1">
            <Navbar toggleSettingsModal={toggleSettingsModal} toggleResultsModal={toggleResultsModal}></Navbar>
          </div>
          <Routes>
            <Route path="/" element={<TypingArea results={results} setResults={setResults} showAlert={showAlert} config={config}/>} />
            <Route path="/login" element={<Login setIsLoading={setIsLoading} showAlert={showAlert}/>} />
          </Routes>
        </BrowserRouter>
      <UnderConstruction></UnderConstruction>
      <Settings config={config} setConfig={setConfig} visible={showSettingsModal} toggleVisible={toggleSettingsModal}></Settings>
      <ResultsModal visible={showResultsModal} toggleVisible={toggleResultsModal} results={results}></ResultsModal>
    </div>
  )
}

export default App
