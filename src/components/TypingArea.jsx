import {useState,React} from 'react'
import { useEffect } from 'react';
import TopBar from './TopBar'
import TextDisplay from './TextDisplay'

export default function TypingArea({results, getResults, setResults, showAlert, config, setIsLoading, userInfo}) {
  const [pressed, setPressed] = useState(['NONE']);
  const [characters, setCharacters] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [chunkIndex, setChunkIndex] = useState(0); //This is used to split the text into multiple chunks to implement an imitation of autoscroll
  const [chunkSize, setChunkSize] = useState(800); //This decides the size of each chunk
  const [allTexts, setAllTexts] = useState([
    {title: 'Machine Learning', text: "Machine learning, a subset of AI, continues to be a driving force behind many technological innovations. By leveraging vast amounts of data, machine learning algorithms can identify patterns and make predictions with remarkable precision. This capability is harnessed across a myriad of applications, from personalized recommendations on streaming platforms to predictive maintenance in manufacturing. The healthcare sector, in particular, stands to benefit immensely from machine learning. Predictive analytics can aid in early disease detection, personalized treatment plans, and improved patient outcomes. Nevertheless, the integration of machine learning into healthcare also raises concerns about data security, patient privacy, and the need for robust regulatory frameworks.Machine learning, a subset of AI, continues to be a driving force behind many technological innovations. By leveraging vast amounts of data, machine learning algorithms can identify patterns and make predictions with remarkable precision. This capability is harnessed across a myriad of applications, from personalized recommendations on streaming platforms to predictive maintenance in manufacturing. The healthcare sector, in particular, stands to benefit immensely from machine learning. Predictive analytics can aid in early disease detection, personalized treatment plans, and improved patient outcomes. Nevertheless, the integration of machine learning into healthcare also raises concerns about data security, patient privacy, and the need for robust regulatory frameworks."},
    {title: 'Journaling', text: "Journaling is a powerful tool for self-reflection, personal growth, and mental well-being. It involves the regular practice of writing down thoughts, feelings, experiences, and observations in a structured or freeform manner. The act of journaling serves as a private space for individuals to explore their inner worlds, providing a safe outlet for expressing emotions and processing events. One of the key benefits of journaling is its ability to enhance self-awareness. By consistently documenting one's thoughts and experiences, individuals can gain deeper insights into their patterns of behavior, emotional triggers, and recurring themes in their lives. This heightened self-awareness can lead to greater emotional intelligence, allowing individuals to better understand and manage their emotions, and ultimately fostering healthier relationships with others."},
    {
      title: 'Evolution', text: "Evolution is a fundamental concept in biology that explains the diversity of life on Earth. It is the process by which species of organisms change over time through variations in their genetic makeup, often driven by natural selection, mutation, genetic drift, and gene flow. The theory of evolution, first comprehensively formulated by Charles Darwin in the 19th century, posits that all species of organisms arise and develop through the natural selection of small, inherited variations that increase the individual's ability to compete, survive, and reproduce."}
    ,{
      title: "Innovation",
      text: "Innovation is the driving force behind progress in the modern world. It is the process of transforming ideas into new or improved products, services, or processes that create value for society. In today’s fast-paced and competitive global market, innovation is not just a luxury; it’s a necessity. Organizations that fail to innovate risk becoming obsolete, as new technologies, market trends, and consumer behaviors continuously evolve. Innovation can take many forms, from incremental improvements to radical breakthroughs that redefine industries. It spans across various sectors, including technology, healthcare, energy, and more. The importance of fostering a culture of innovation within organizations cannot be overstated. By encouraging creativity, collaboration, and risk-taking, companies can stay ahead of the curve and maintain a competitive edge. Additionally, governments and educational institutions play a crucial role in supporting innovation by investing in research and development, creating policies that encourage entrepreneurship, and fostering partnerships between the public and private sectors. In a world where challenges such as climate change, resource scarcity, and global health crises are ever-present, innovation holds the key to creating sustainable solutions that will shape the future."
    },
    {
      title: "Resilience",
      text: "Resilience is the ability to recover from setbacks, adapt to changing circumstances, and continue moving forward despite adversity. It is a critical trait for both individuals and organizations in today's unpredictable and often challenging world. Whether facing personal hardships, economic downturns, or natural disasters, resilience allows us to bounce back stronger than before. For individuals, resilience can be cultivated through practices such as maintaining a positive mindset, developing problem-solving skills, building strong relationships, and seeking support when needed. It also involves recognizing that setbacks are a natural part of life and an opportunity for growth rather than a reason to give up. In organizations, resilience is equally important. Businesses must be prepared to respond to disruptions—whether they come in the form of technological changes, market shifts, or global crises. Building organizational resilience involves creating flexible strategies, fostering a culture of agility, and investing in innovation. In both cases, resilience is not a one-time achievement but an ongoing process of adaptation and growth. It is the foundation for long-term success and the capacity to thrive in an ever-changing world."
    },
    {
      title: "Sustainability",
      text: "Sustainability is a concept that emphasizes meeting the needs of the present without compromising the ability of future generations to meet their own needs. It involves a holistic approach to balancing environmental, social, and economic considerations in decision-making. At its core, sustainability seeks to protect the planet's natural resources, ensure social equity, and promote long-term economic viability. Environmental sustainability focuses on conserving natural resources, reducing pollution, and mitigating the impacts of climate change. This includes promoting renewable energy, sustainable agriculture, and responsible consumption. Social sustainability, on the other hand, emphasizes the importance of human rights, fair labor practices, and access to essential services such as education and healthcare. Economic sustainability aims to create prosperity that benefits all stakeholders, not just a select few, by fostering innovation, job creation, and responsible business practices. Achieving sustainability requires collaboration across sectors and levels of society, from governments and businesses to individuals and communities. It also demands long-term thinking and a commitment to leaving a positive legacy for future generations. In an increasingly interconnected world, sustainability is no longer just an option; it is a necessity for ensuring the health and well-being of both people and the planet."
    },
    {
      title: "Empathy",
      text: "Empathy is the ability to understand and share the feelings of others. It is a key component of emotional intelligence and plays a vital role in fostering meaningful relationships, enhancing communication, and promoting social cohesion. Empathy allows individuals to connect with others on a deeper level, offering support and understanding during difficult times. In both personal and professional settings, empathy can lead to more effective collaboration, conflict resolution, and trust-building. By putting ourselves in someone else's shoes, we gain insight into their experiences, perspectives, and emotions, which can help us respond in a more compassionate and thoughtful way. Empathy is not just about feeling sympathy for others; it is about actively engaging with their emotions and offering a sense of shared humanity. In a world that is often divided by cultural, political, and social differences, empathy serves as a bridge that can help us overcome these barriers and find common ground. It is also an essential skill for leaders, who must be able to understand the needs and concerns of their teams in order to create an inclusive and supportive work environment. Cultivating empathy involves active listening, open-mindedness, and a willingness to learn from others’ experiences."
    },
    {
      title: "Exploration",
      text: "Exploration has always been a fundamental part of human nature. From the earliest days of our species, we have sought to understand the world around us, venturing into unknown territories in search of new knowledge, resources, and experiences. Whether through physical journeys across land and sea or intellectual pursuits in science and philosophy, exploration has driven human progress and innovation. In the modern era, exploration continues to take on new forms, from space exploration to the digital frontier of the internet and artificial intelligence. Space exploration, in particular, has captured the imagination of people around the world, as we seek to uncover the mysteries of the universe and potentially find new habitable planets. But exploration is not limited to outer space; it also includes deep-sea exploration, where scientists are discovering new species and ecosystems in the darkest depths of the oceans. Beyond physical exploration, intellectual and creative exploration remain just as important. Scientists, artists, and thinkers continue to push the boundaries of human knowledge and creativity, challenging existing paradigms and opening up new possibilities for the future. Exploration, in all its forms, is a testament to the boundless curiosity and determination of the human spirit."
    },
    {
      title: "Perseverance",
      text: "Perseverance is the steadfastness in doing something despite difficulty or delay in achieving success. It is a trait that has been admired and valued across cultures and throughout history, as it represents the ability to continue striving toward a goal despite obstacles. Perseverance is not about blind determination or stubbornness; rather, it is about recognizing the challenges that lie ahead and deciding to push forward with determination, resilience, and adaptability. Those who demonstrate perseverance often achieve great things because they are not easily discouraged by failure or setbacks. Instead, they view these as opportunities to learn, grow, and improve. In a world that often prioritizes instant gratification, perseverance reminds us of the value of patience and hard work. It teaches us that success is not always immediate, but it is attainable through consistent effort and dedication. Whether it's mastering a new skill, building a career, or overcoming personal challenges, perseverance is a key factor in achieving long-term goals. In addition to personal achievements, perseverance also plays a crucial role in social and scientific progress. Many of the world’s greatest discoveries and innovations were the result of years, or even decades, of persistent effort. The journey of perseverance is often filled with challenges, but it is also marked by moments of triumph and personal growth."
    },
    {
      title: "Curiosity",
      text: "Curiosity is the desire to learn, explore, and understand. It is a fundamental characteristic of human nature and one of the driving forces behind discovery and innovation. From early childhood, curiosity manifests as a sense of wonder and a desire to ask questions about the world around us. This innate desire to learn is what has propelled humanity to make groundbreaking discoveries in fields ranging from science and technology to art and philosophy. Curiosity is not just about acquiring knowledge; it is about the joy of exploration and the thrill of uncovering something new. It drives people to challenge existing ideas, ask probing questions, and seek out new perspectives. Curiosity also fosters creativity by encouraging individuals to think outside the box and consider unconventional solutions to problems. In education, fostering curiosity is essential for promoting lifelong learning. When individuals are curious, they are more likely to engage deeply with material, seek out additional resources, and pursue their interests with passion. Curiosity is also a critical trait in leadership and innovation. Leaders who are curious are more open to new ideas and are better equipped to navigate complex challenges by considering a wide range of possibilities. Ultimately, curiosity is about embracing uncertainty and being willing to explore the unknown in pursuit of understanding. It is what keeps us moving forward, both as individuals and as a society."
    },
    {
      title: "Testing",
      text: "Hello"
    }
  ])
  const [currentTextIndex,setCurrentTextIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [invalidKeys, setInvalidKeys] = useState(['Shift','Control','Alt','CapsLock','Backspace','Tab'])
  async function syncResults(res) {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/users/addresult', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include"
        ,
        body: JSON.stringify(res)
      }).then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          showAlert(data.message)
          if (data.success) {
            showAlert("Results Synchronized");
          }
        });
    } catch (e) {
      console.log(e)
    }
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
        newResult = [{gross: grossSpeed, net: netSpeed, timeTaken: timeElapsed, title: allTexts[currentTextIndex].title}]
      } else {
        newResult = [...results,{gross: grossSpeed, net: netSpeed, timeTaken: timeElapsed, title: allTexts[currentTextIndex].title}]
      }
      if(userInfo.isAuth){
        syncResults({gross: grossSpeed, net: netSpeed, timeTaken: timeElapsed, title: allTexts[currentTextIndex].title})
        .then(()=>{
          getResults()
        }
        )
      }else{
        setResults(newResult);
      }
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
  

  return (
      <div className="col-span-4 flex flex-col row-span-9 justify-center items-center">
        <TopBar currentTextIndex={currentTextIndex} setCurrentTextIndex={setCurrentTextIndex} allTexts={allTexts} prevPara={prevPara} nextPara={nextPara} typedText={typedText} timeElapsed={timeElapsed} resetEverything={resetEverything}></TopBar>
        <TextDisplay givenText={allTexts[currentTextIndex].text} chunkIndex={chunkIndex} chunkSize={chunkSize} typedText={typedText} resetEverything={resetEverything} keyDownHandler={keyDownHandler} keyUpHandler={keyUpHandler}></TextDisplay>
      </div>
  )
}
