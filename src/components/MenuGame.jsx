import logoGame from '../asset/traffic-lights.png';
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
export default MenuGame;
