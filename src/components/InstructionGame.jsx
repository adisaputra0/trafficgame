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
export default InstructionGame;