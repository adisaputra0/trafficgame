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

export default Warning;