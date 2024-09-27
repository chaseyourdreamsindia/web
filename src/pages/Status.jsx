import React from 'react'
import { useParams } from 'react-router-dom';
import successimg from '../Assets/success.png';

const Status = () => {

    const { type,success,tid } = useParams();

  return (
    <div>
        {
            (type && success && tid) && <div className='flex flex-col items-center gap-3 pt-10'>
                <img src={successimg} className='w-20'/>
                <h1 className=''>{type==="mbr" ? "Membership Added !" : "Appointment Booked !"}</h1>
                <h1 >{type !== "mbr" ? "Please kindly check your mail for invite link." : "Credits has been credited to your account !"}</h1>
                <a href="/"><button className='p-2 bg-violet-700 text-white rounded-lg text-xs'>Home</button></a>
            </div>
        }
    </div>
  )
}

export default Status;