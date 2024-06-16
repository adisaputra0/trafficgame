import logo from './logo.svg';
import logoGame from './asset/traffic-lights.png';
import person from './asset/person.png';
import './App.css';
import car1 from './asset/WhiteStrip.png';
import car2 from './asset/BlueStrip.png';
import car3 from './asset/GreenStrip.png';
import car4 from './asset/RedStrip.png';
import sound from './asset/soundeffect.mp3';
import soundscore from './asset/soundeffect_score.mp3';
import { useState, useEffect, useRef } from 'react';

// Menu Game
function MenuGame({classText, actionPlay, actionInstruction, actionAbout}){
  return(
    <>
      <div className={`${classText} div-center flex-row`}>
        <img src={logoGame} className="Game-logo" alt="logo" />
        <div className='div-center w-max'>
          <h1>Welcome to Traffic Game</h1>
          <button onClick={actionPlay}>Play</button>
          <button onClick={actionInstruction}>Instruction</button>
          <button onClick={actionAbout}>About</button>
        </div>
      </div>      
    </>
  );
}
function PlayGame({classText, condition}){
  const printVerticalWhiteLine = [];
  const printHorizontalWhiteLine = [];
  const totalWhiteLine = 8;
  const gapWhiteLine = 50;

  let gap = 0;
  for(let i = 1; i <= totalWhiteLine; i++){
    let styleWhiteLine = {
      top: gap + "px"
    }
    printVerticalWhiteLine.push(<div key={i} className='vertical-white-line' style={styleWhiteLine}></div>);
    gap += 60 + gapWhiteLine;
  }

  gap = 0;
  for(let i = 1; i <= totalWhiteLine; i++){
    let styleWhiteLine = {
      left: gap + "px"
    }
    printHorizontalWhiteLine.push(<div key={i} className='horizontal-white-line' style={styleWhiteLine}></div>);
    gap += 60 + gapWhiteLine;
  }

  // Let's to learn about useEffect
  // useEffect(() => {
  //   let number = 0;
  //   const interval = setInterval(() => {
  //     console.log(number++);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // });

  // Move Car
  const [positionlr, changePositionlr] = useState(0);
  const [positionrl, changePositionrl] = useState(0);
  const [positionbt, changePositionbt] = useState(0);
  const [positiontb, changePositiontb] = useState(0);
  
  const [conditionlr, changeConditionlr] = useState(false);
  const [conditionrl, changeConditionrl] = useState(false);
  const [conditionbt, changeConditionbt] = useState(false);
  const [conditiontb, changeConditiontb] = useState(false);
  
  const [trafficColor, changeTrafficColor] = useState("red");
  const [trafficColor2, changeTrafficColor2] = useState("red");
  const [trafficColor3, changeTrafficColor3] = useState("red");
  const [trafficColor4, changeTrafficColor4] = useState("red");

  const [point, setPoint] = useState(0);
  const [time, setTime] = useState(30);

  function resetGame(){
    changePositionlr(0);
    changePositionrl(850);

    changePositionbt(0);
    changePositiontb(550);

    changeConditionlr(false);
    changeConditionrl(false);
    changeConditionbt(false);
    changeConditiontb(false);

    changeTrafficColor("red");
    changeTrafficColor2("red");
    changeTrafficColor3("red");
    changeTrafficColor4("red");
  }

  function crash(){
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    resetGame();
    setTime(0);
  }

  function getScore(){
    scoreRef.current.currentTime = 0;
    scoreRef.current.play();
    setPoint(point+1);
  }

  const audioRef = useRef(null);
  const scoreRef = useRef(null);
  useEffect(() => {
    if(condition){
      const interval = setInterval(() => {
        if(time <= 0){
          changeClassGameOver("d-flex");
        }else{
          if(time > 0){
            setTime(prevTime => {
              let newTime = prevTime - 0.005;
              return newTime;
            });
          }
          //Crash
          if(positionlr >= 290 && positionlr <= 380 && positionbt >= 220 && positionbt <= 300){
            crash();
          }else if(positionlr >= 380 && positionlr <= 460 && positiontb >= 220 && positiontb <= 300){
            crash();
          }else if(positionrl >= 290 && positionrl <= 380 && positionbt >= 140 && positionbt <= 210){
            crash();
          }else if(positionrl >= 380 && positionrl <= 460 && positiontb >= 140 && positiontb <= 210){
            crash();
          }else{
            if(conditionlr){
              changePositionlr(prevPosition => {
                let newPosition = prevPosition >= 850? -150 : prevPosition + 2;
                if(newPosition == 850){
                  getScore();
                }
                return newPosition;
              });
            }else{
              changePositionlr(prevPosition => {
                let newPosition = prevPosition == 250? 250 : prevPosition + 2;
                if(newPosition == 850){
                  getScore();
                }
                newPosition = newPosition >= 850? -150 : newPosition;
                return newPosition;
              });
            }
    
            if(conditionrl){
              changePositionrl(prevPosition => {
                let newPosition = prevPosition <= -50? 850 : prevPosition - 2;
                if(newPosition == -50){
                  getScore();
                }
                return newPosition;
              });
            }else{
              changePositionrl(prevPosition => {
                let newPosition = prevPosition == 500? 500 : prevPosition - 2;
                if(newPosition == -50){
                  getScore();
                }
                newPosition = newPosition <= -50? 850 : newPosition;
                return newPosition;
              });
            }
    
            if(conditionbt){
              changePositionbt(prevPosition => {
                let newPosition = prevPosition >= 550? -150 : prevPosition + 2;
                if(newPosition == 550){
                  getScore();
                }
                return newPosition;
              });
            }else{
              changePositionbt(prevPosition => {
                let newPosition = prevPosition == 100? 100 : prevPosition + 2;
                if(newPosition == 550){
                  getScore();
                }
                newPosition = newPosition >= 550? -150 : newPosition;
                return newPosition;
              });
            }
            
            if(conditiontb){
              changePositiontb(prevPosition => {
                let newPosition = prevPosition <= -50? 550 : prevPosition - 2;
                if(newPosition == -50){
                  getScore();
                }
                return newPosition;
              });
            }else{
              changePositiontb(prevPosition => {
                let newPosition = prevPosition == 340? 340 : prevPosition - 2;
                if(newPosition == -50){
                  getScore();
                }
                newPosition = newPosition <= -50? 550 : newPosition;
                return newPosition;
              });
            }
          }
        }
      }, 5);
      
      // const intervalTime = setInterval(() => {
      //   if(time > 0){
      //     setTime(time-1);
      //   }
      // }, 1000);
      
      return () => {
        clearInterval(interval); 
        // clearInterval(intervalTime);
      };
    }else{
      resetGame();
      
      changeClassGameOver("d-none");
      setTime(30);
      setPoint(0);
    }
  }, [condition, conditionlr, conditionrl, conditionbt, conditiontb, time, point, positionlr, positionbt, positionrl, positiontb]);

  // Traffic Condition
  const clickTrafficLight = (changeTrafficColor, condition, changeCondition) => {
    if(condition){
      changeCondition(false);
      changeTrafficColor("red");
    }else{
      changeCondition(true);
      changeTrafficColor("lime");
    }
  }

  const [classGameOver, changeClassGameOver] = useState("d-none");
  function GameOver({classText}){
    return(
      <>
        <div className={`${classText} div-center game-over`}>
          <h1>Game Over</h1>
          <h3>Your Point : {point}</h3>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={`${classText} point-time`}>
        <h3>Point : {point}</h3>
        <h3>Time : {parseInt(time)}</h3>
      </div>
      <div className={`${classText} traffic_light`} style={{ backgroundColor: trafficColor, boxShadow: `0px 0px 40px ${trafficColor}` }} onClick={() => clickTrafficLight(changeTrafficColor, conditionbt, changeConditionbt)}></div>
      <div className={`${classText} traffic_light2`} style={{ backgroundColor: trafficColor2, boxShadow: `0px 0px 40px ${trafficColor2}` }} onClick={() => clickTrafficLight(changeTrafficColor2, conditiontb, changeConditiontb)}></div>
      <div className={`${classText} traffic_light3`} style={{ backgroundColor: trafficColor3, boxShadow: `0px 0px 40px ${trafficColor3}` }} onClick={() => clickTrafficLight(changeTrafficColor3, conditionrl, changeConditionrl)}></div>
      <div className={`${classText} traffic_light4`} style={{ backgroundColor: trafficColor4, boxShadow: `0px 0px 40px ${trafficColor4}` }} onClick={() => clickTrafficLight(changeTrafficColor4, conditionlr, changeConditionlr)}></div>
      <div className={`${classText} div-center`}>
        <div className='vertical-way'>
          {printVerticalWhiteLine}
          <img src={car1} className='vertical-car' style={{ bottom: positionbt }} />
          <img src={car2} className='vertical-car2' style={{ bottom: positiontb }} />
        </div>
        <div className='horizontal-way'>
          {printHorizontalWhiteLine}
          <img src={car3} className='horizontal-car' style={{ left: positionlr }} />
          <img src={car4} className='horizontal-car2' style={{ left: positionrl }} />
        </div>
      </div>
      <GameOver classText={`${classGameOver} ${classText}`}/>
      <audio ref={audioRef} src={sound}/>
      <audio ref={scoreRef} src={soundscore}/>
    </>
  );
}
function InstructionGame({classText}){
  return(
    <>
      <div className={`${classText} div-center`}>
        <h1>Instruction</h1>
        <hr className='w-90' />
        <ul>
            <li>You can go to the game after click the "Play" button</li>
            <li>You must avoid existing accidents</li>
            <li>You can press <b>the traffic light</b> to change the color of the traffic light</li>
            <li>That's it, Have fun!!</li>
        </ul>
      </div>
    </>
  );
}
function AboutGame({classText}){
  function goMyPortfolio(){
    window.open("https://adisaputra.vercel.app/");
  }
  return(
    <>
      <div className={`${classText} div-center`}>
        <h1>About</h1>
        <hr className='w-90' />
        <div className='d-flex'>
          <div className='w-50'>
            <p className='p-5 text-justify w-100'>
              Hello, my name is I Putu Adi Saputra, I am the developer of this game, I just learned React.js and now I want to create a program using this library. I made this game because I was challenged by my friend to make a simple game called "Traffic Game". if you are curious about me, you can click the button below to see my portfolio. Thank you :)
            </p>
            <button className='m-5 w-100' onClick={goMyPortfolio}>My Portfolio</button>
          </div>
          <img src={person} className="Game-logo m-auto" alt="logo" />
        </div>
      </div>
    </>
  );
}
function Warning(){
  return(
    <>
      <div className={`warning div-center`}>
        <h1>Dear User</h1>
        <hr className='w-90' />
        <p className='p-5'>
          We regret to inform you that your current device is not compatible with this game. For the best experience, please use a device with a minimum screen resolution of 800 pixels in width and 500 pixels in height. We recommend using a tablet or a PC to enjoy the game fully.
          Thank you for your understanding.
        </p>
      </div>
    </>
  );
}

function App() {
  const [classMenuGame, changeClassMenuGame] = useState("d-flex");
  const [classPlayGame, changeClassPlayGame] = useState("d-none");
  const [conditionPlay, changeConditionPlay] = useState(false);
  const [classInstructionGame, changeClassInstructionGame] = useState("d-none");
  const [classAboutGame, changeClassAboutGame] = useState("d-none");
  const [classClose, changeClassClose] = useState("d-none");
  
  function clickPlay(){
    changeClassMenuGame("d-none");
    changeClassPlayGame("d-flex");
    changeConditionPlay(true);
    changeClassClose("d-flex");
  }
  function clickInstruction(){
    changeClassMenuGame("d-none");
    changeClassInstructionGame("d-flex");
    changeClassClose("d-flex");
  }
  function clickAbout(){
    changeClassMenuGame("d-none");
    changeClassAboutGame("d-flex");
    changeClassClose("d-flex");
  }
  function clickClose(){
    changeClassMenuGame("d-flex");
    changeClassPlayGame("d-none");
    changeClassInstructionGame("d-none");
    changeClassAboutGame("d-none");
    changeClassClose("d-none");
    changeConditionPlay(false);
  }
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <>
      <div className='gameBoard position-relative'>
        <MenuGame classText={classMenuGame} actionPlay={clickPlay} actionInstruction={clickInstruction} actionAbout={clickAbout}/>
        <PlayGame classText={classPlayGame} condition={conditionPlay}/>
        <InstructionGame classText={classInstructionGame}/>
        <AboutGame classText={classAboutGame}/>
        <button className={`${classClose} position-absolute top-10 right-10 w-max close`} onClick={clickClose}>X</button>
      </div>
      <Warning />
    </>
  );
}

export default App;
