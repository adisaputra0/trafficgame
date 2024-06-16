import './App.css';
import AboutGame from './components/AboutGame'
import InstructionGame from './components/InstructionGame'
import MenuGame from './components/MenuGame'
import PlayGame from './components/PlayGame'
import Warning from './components/Warning'
import { useState, useEffect, useRef } from 'react';

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
