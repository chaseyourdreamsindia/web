import React from 'react';
import call from '../Assets/call.png';
import fb from '../Assets/fb.jpg';
import insta from '../Assets/insta.png';
import linkedin from '../Assets/linkedin.png';
import mail from '../Assets/mail.png';
import whatsapp from '../Assets/whatsapp.png';

const Socials = () => {
  return (
    <div className='flex flex-col items-center justify-center fixed right-0 mt-10'>
        <img src={fb} alt="facebook" className='w-10'/>
        <img src={linkedin} alt="linkedin" className='w-8'/>
        <img src={insta} alt="instagram" className='w-8'/>
        <img src={mail} alt="mail" className='w-8'/>
        <img src={call} alt="call" className='w-8'/>
        <img src={whatsapp} alt="whatsapp" className='w-8'/>
    </div>
  )
}

export default Socials;