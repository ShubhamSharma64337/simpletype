import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Keyboard from './components/Keyboard'
import SpeedoMeter from './components/SpeedoMeter'
import TextDisplay from './components/TextDisplay'

function App() {
  const [pressed, setPressed] = useState(['NONE']);
  const [characters, setCharacters] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [cpm, setCpm] = useState(0);
  const [givenText, setGivenText] = useState('Machine learning, a subset of AI, continues to be a driving force behind many technological innovations. By leveraging vast amounts of data, machine learning algorithms can identify patterns and make predictions with remarkable precision. This capability is harnessed across a myriad of applications, from personalized recommendations on streaming platforms to predictive maintenance in manufacturing. The healthcare sector, in particular, stands to benefit immensely from machine learning. Predictive analytics can aid in early disease detection, personalized treatment plans, and improved patient outcomes. Nevertheless, the integration of machine learning into healthcare also raises concerns about data security, patient privacy, and the need for robust regulatory frameworks.');
  const [typedText, setTypedText] = useState('');
  function keyDownHandler(e){
    if(!(['Shift','Control','Alt','CapsLock','Backspace'].includes(e.key))){
      let typedTextCopy = typedText + e.key;
      setTypedText(typedTextCopy);
    }
    if(!startTime){
      let dtObj = new Date();
      setStartTime(dtObj.getTime());
    }
    let pressedCopy = [...pressed];
    if(!pressedCopy.includes(e.key)){
      pressedCopy.push(e.key);
    }
    setPressed(pressedCopy);
  }

  function keyUpHandler(e){
    let pressedCopy = [...pressed];
    if(pressedCopy.includes(e.key)){
      let ind = pressedCopy.indexOf(e.key);
      pressedCopy.splice(ind,1);
      
      setCharacters(characters+1);
      let dtObj = new Date();
      let curTime = dtObj.getTime();
      let timeElapsedInSecs = (curTime - startTime)/1000;
      
      setCpm(parseInt(characters*60/timeElapsedInSecs));
    }
    setPressed(pressedCopy);
  }

  window.onkeydown = keyDownHandler;
  window.onkeyup = keyUpHandler;

  return (
    <div className='w-2/3 flex flex-col justify-center items-center mx-auto h-screen'>
      <SpeedoMeter characters={characters} startTime={startTime} cpm={cpm}></SpeedoMeter>
      <TextDisplay givenText={givenText} typedText={typedText}></TextDisplay>
      {/* <Keyboard pressed={pressed}></Keyboard> */}
    </div>
  )
}

export default App
