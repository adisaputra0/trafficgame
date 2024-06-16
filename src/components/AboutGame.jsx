import person from '../asset/person.png';
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

export default AboutGame;