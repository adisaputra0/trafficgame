import { useState, useEffect, useRef } from 'react';
import car1 from '../asset/WhiteStrip.png';
import car2 from '../asset/BlueStrip.png';
import car3 from '../asset/GreenStrip.png';
import car4 from '../asset/RedStrip.png';
import sound from '../asset/soundeffect.mp3';
import soundscore from '../asset/soundeffect_score.mp3';
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
export default PlayGame;
