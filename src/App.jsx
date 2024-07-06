import { useState,useEffect } from 'react'
import './App.css'
import SpeedoMeter from './components/SpeedoMeter'
import TextDisplay from './components/TextDisplay'
import Loader from './components/Loader'
import UnderConstruction from './components/UnderConstruction'
import Navbar from './components/Navbar'
import Settings from './components/Settings'
function App() {
  const [isLoading,setIsLoading] = useState(false);
  const [pressed, setPressed] = useState(['NONE']);
  const [characters, setCharacters] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [givenText, setGivenText] = useState('Machine learning, a subset of AI, continues to be a driving force behind many technological innovations. By leveraging vast amounts of data, machine learning algorithms can identify patterns and make predictions with remarkable precision. This capability is harnessed across a myriad of applications, from personalized recommendations on streaming platforms to predictive maintenance in manufacturing. The healthcare sector, in particular, stands to benefit immensely from machine learning. Predictive analytics can aid in early disease detection, personalized treatment plans, and improved patient outcomes. Nevertheless, the integration of machine learning into healthcare also raises concerns about data security, patient privacy, and the need for robust regulatory frameworks.');
  const [typedText, setTypedText] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showSettingsModal, setSettingsModal] = useState(false);
  const [invalidKeys, setInvalidKeys] = useState(['Shift','Control','Alt','CapsLock','Backspace','Tab'])
  const [config, setConfig]  = useState({backspaceAllowed: false});
  useEffect(()=>{
    setTimeout(()=>{
      if(startTime){
        setTimeElapsed(timeElapsed+1);
      }
    }, 1000)
  } , [timeElapsed,startTime]);

  function toggleSettingsModal(){
    showSettingsModal?setSettingsModal(false):setSettingsModal(true);
  }

  function keyDownHandler(e){
    e.preventDefault();
    
    if(!startTime && !(invalidKeys.includes(e.key))){ //Starting the timer
      let dtObj = new Date();
      setStartTime(dtObj.getTime());
    }


    if(invalidKeys.includes(e.key)){
      if(e.key === 'Backspace' && config.backspaceAllowed && startTime && typedText.length>0){
        let typedTextCopy = typedText.slice(0,typedText.length-1);
        setTypedText(typedTextCopy);
      }
    } else {
        let typedTextCopy = typedText + e.key;
        setTypedText(typedTextCopy);
    }


    let pressedCopy = [...pressed]; //This is for showing on virtual keyboard
    if(!pressedCopy.includes(e.key)){
      pressedCopy.push(e.key);
    }
    setPressed(pressedCopy);
  }

  function keyUpHandler(e){
    let pressedCopy = [...pressed]; //This is for showing on virtual keyboard
    if(pressedCopy.includes(e.key)){
      let ind = pressedCopy.indexOf(e.key);
      pressedCopy.splice(ind,1);
      setCharacters(characters+1);
    }
    setPressed(pressedCopy);
  }

  function resetEverything(){
    setIsLoading(true);
    setStartTime(null);
    setTypedText('');
    setPressed(['NONE']);
    setCharacters(0);
    setTimeout(()=>{
      setTimeElapsed(0);
      setIsLoading(false);
    },1000)
  }
  window.onkeydown = keyDownHandler;
  window.onkeyup = keyUpHandler;

  return (
    <div className='grid grid-rows-10  mx-auto h-screen'>
      <Loader isLoading={isLoading}></Loader>
      <div className="">
        <Navbar toggleSettingsModal={toggleSettingsModal}></Navbar>
      </div>
      <div className='row-start-3 flex justify-center'>
       <SpeedoMeter typedText={typedText} timeElapsed={timeElapsed}></SpeedoMeter>
      </div>
      <div className='row-start-4 row-span-6 flex justify-center'>
        <TextDisplay givenText={givenText} typedText={typedText} resetEverything={resetEverything}></TextDisplay>
      </div>
      <UnderConstruction></UnderConstruction>
      {/* <Keyboard pressed={pressed}></Keyboard> */}
      <Settings config={config} setConfig={setConfig} visible={showSettingsModal} toggleVisible={toggleSettingsModal}></Settings>
    </div>
  )
}

export default App
