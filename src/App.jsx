import { useState,useEffect } from 'react'
import './App.css'
import TopBar from './components/TopBar'
import TextDisplay from './components/TextDisplay'
import Loader from './components/Loader'
import UnderConstruction from './components/UnderConstruction'
import Navbar from './components/Navbar'
import Settings from './components/Settings'
import Alert from './components/Alert'
import ResultsSidebar from './components/ResultsSidebar'
import ResultsModal from './components/ResultsModal'
function App() {
  const [isLoading,setIsLoading] = useState(false);
  const [pressed, setPressed] = useState(['NONE']);
  const [characters, setCharacters] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [chunkIndex, setChunkIndex] = useState(0); //This is used to split the text into multiple chunks to implement an imitation of autoscroll
  const [chunkSize, setChunkSize] = useState(400); //This decides the size of each chunk
  const [allTexts, setAllTexts] = useState([
    {title: 'Demo', text: "One of you must come here"},
    {title: 'Machine Learning', text: "Machine learning, a subset of AI, continues to be a driving force behind many technological innovations. By leveraging vast amounts of data, machine learning algorithms can identify patterns and make predictions with remarkable precision. This capability is harnessed across a myriad of applications, from personalized recommendations on streaming platforms to predictive maintenance in manufacturing. The healthcare sector, in particular, stands to benefit immensely from machine learning. Predictive analytics can aid in early disease detection, personalized treatment plans, and improved patient outcomes. Nevertheless, the integration of machine learning into healthcare also raises concerns about data security, patient privacy, and the need for robust regulatory frameworks.Machine learning, a subset of AI, continues to be a driving force behind many technological innovations. By leveraging vast amounts of data, machine learning algorithms can identify patterns and make predictions with remarkable precision. This capability is harnessed across a myriad of applications, from personalized recommendations on streaming platforms to predictive maintenance in manufacturing. The healthcare sector, in particular, stands to benefit immensely from machine learning. Predictive analytics can aid in early disease detection, personalized treatment plans, and improved patient outcomes. Nevertheless, the integration of machine learning into healthcare also raises concerns about data security, patient privacy, and the need for robust regulatory frameworks."},
    {title: 'Journaling', text: "Journaling is a powerful tool for self-reflection, personal growth, and mental well-being. It involves the regular practice of writing down thoughts, feelings, experiences, and observations in a structured or freeform manner. The act of journaling serves as a private space for individuals to explore their inner worlds, providing a safe outlet for expressing emotions and processing events. One of the key benefits of journaling is its ability to enhance self-awareness. By consistently documenting one's thoughts and experiences, individuals can gain deeper insights into their patterns of behavior, emotional triggers, and recurring themes in their lives. This heightened self-awareness can lead to greater emotional intelligence, allowing individuals to better understand and manage their emotions, and ultimately fostering healthier relationships with others."},
    {title: 'Evolution', text: "Evolution is a fundamental concept in biology that explains the diversity of life on Earth. It is the process by which species of organisms change over time through variations in their genetic makeup, often driven by natural selection, mutation, genetic drift, and gene flow. The theory of evolution, first comprehensively formulated by Charles Darwin in the 19th century, posits that all species of organisms arise and develop through the natural selection of small, inherited variations that increase the individual's ability to compete, survive, and reproduce."}
  ])
  const [currentTextIndex,setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showSettingsModal, setSettingsModal] = useState(false);
  const [showResultsModal, setResultsModal] = useState(false);
  const [invalidKeys, setInvalidKeys] = useState(['Shift','Control','Alt','CapsLock','Backspace','Tab'])
  const [config, setConfig]  = useState({backspaceAllowed: false});
  const [results, setResults] = useState(null);
  function showAlert(message){
    setAlerts(message)
    setTimeout(()=>{
      setAlerts(null);
    },3000)
  }
  function nextPara(){
    if(currentTextIndex<allTexts.length-1){
      resetEverything();
      setCurrentTextIndex(currentTextIndex+1);
    } else {
      showAlert('This is the last paragraph')
    }
  }
  function prevPara(){
    if(currentTextIndex>0){
      resetEverything();
      setCurrentTextIndex(currentTextIndex-1);
    } else {
      showAlert('This is the first paragraph!')
    }
  }

  useEffect(()=>{
    //The below code generates and stores the results and resets everything
    if(typedText.length >= allTexts[currentTextIndex].text.length){
      let grossSpeed = parseInt(typedText.split(' ').length*60/timeElapsed);
      let newResult = null;
      let correctWords = correctWordsCalculator(typedText, allTexts[currentTextIndex].text);
      console.log(correctWords);
      let netSpeed = correctWords*60/timeElapsed
      if(results === null){
        newResult = [{gross: grossSpeed, net: netSpeed, timeTaken: timeElapsed}]
      } else {
        newResult = [...results,{gross: grossSpeed, net: netSpeed, timeTaken: timeElapsed}]
      }
      setResults(newResult)
      resetEverything();
      showAlert('Score Saved');
    }
  },[typedText])

  function correctWordsCalculator(tText, gText){
    let gInd = 0;
    let tInd = 0;
    let wc = 0;
    console.log(tText)
    tText = tText.replace(/\s+/g," ") //To avoid splitting string into spaces    
    while(gInd < gText.split(' ').length && tInd < tText.split(' ').length){
      if(tText.split(' ')[tInd] === gText.split(' ')[gInd]){ //If words match
        wc++;
        gInd++;
        tInd++;
      } else {
        let tLen = tText.split(' ')[tInd].length;
        if(tLen > gText.split(' ')[gInd].length){
          while(gInd < gText.split(' ').length && tLen > gText.split(' ')[gInd].length){
            tLen -= gText.split(' ')[gInd].length;
            gInd+=1;
          }
          tInd+=1;
        } else {
          gInd++;
          tInd++;
        }
      }
    }
    return wc;
  }

  useEffect(()=>{
    
    let intt = setInterval(()=>{
      if(startTime){
        setTimeElapsed(timeElapsed+1);
      }
    }, 1000);
    return ()=>{clearInterval(intt)};
  } , [timeElapsed,startTime]);

  function toggleSettingsModal(){
    showSettingsModal?setSettingsModal(false):setSettingsModal(true);
  }
  function toggleResultsModal(){
    showResultsModal?setResultsModal(false):setResultsModal(true);
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
    if(typedText.slice(chunkIndex*chunkSize,chunkIndex*chunkSize+chunkSize).length >= chunkSize){
      setChunkIndex(chunkIndex+1);
    }
    setPressed(pressedCopy);
  }

  function resetEverything(){
    setStartTime(null);
    setTypedText('');
    setPressed(['NONE']);
    setCharacters(0);
    setTimeElapsed(0);
    setChunkIndex(0); 
  }
  window.onkeydown = keyDownHandler;
  window.onkeyup = keyUpHandler;

  return (
    <div className='grid grid-cols-4 grid-rows-10  mx-auto h-screen'>
      <Alert alerts={alerts}></Alert>
      <Loader isLoading={isLoading}></Loader>
      <div className="col-span-4">
        <Navbar toggleSettingsModal={toggleSettingsModal} toggleResultsModal={toggleResultsModal}></Navbar>
      </div>
      <div className='col-span-4 flex lg:col-span-3 justify-center'>
       <TopBar currentTextIndex={currentTextIndex} title={allTexts[currentTextIndex].title} prevPara={prevPara} nextPara={nextPara} typedText={typedText} timeElapsed={timeElapsed} resetEverything={resetEverything}></TopBar>
      </div>
      <div className='col-span-4 lg:col-span-3 flex row-span-5 justify-center'>
        <TextDisplay givenText={allTexts[currentTextIndex].text} chunkIndex={chunkIndex} chunkSize={chunkSize} typedText={typedText} resetEverything={resetEverything}></TextDisplay>
      </div>
      <div className='col-start-4 row-start-2 row-span-9 justify-center items-center hidden lg:flex'>
        <ResultsSidebar results={results}></ResultsSidebar>
      </div>
      
      <UnderConstruction></UnderConstruction>
      {/* <Keyboard pressed={pressed}></Keyboard> */}
      <Settings config={config} setConfig={setConfig} visible={showSettingsModal} toggleVisible={toggleSettingsModal}></Settings>
      <ResultsModal visible={showResultsModal} toggleVisible={toggleResultsModal} results={results}></ResultsModal>
    </div>
  )
}

export default App
