import React from 'react';
import facebook from '../Assets/icons/facebook.png';
import insta from '../Assets/icons/instagram.png';
import x from '../Assets/icons/twitter.png';
import yt from '../Assets/icons/youtube.png';
import lnk from '../Assets/icons/linkedin.png';


const Contact = () => {
  return (
    <div>
      <div class="mt-6">
        <div class="grid sm:grid-cols-2 items-start gap-14 p-8 mx-auto max-w-4xl bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md font-[sans-serif]">
          <div>
            <h1 class="text-3xl font-bold playfair-italic text-pink-700">How can we help?
            </h1>
            <p class="text-sm text-gray-500 mt-4">Get in touch with us via the form below and we’ll get back to you as soon as possible!</p>

            {/* <div class="mt-12">
              <h2 class="text-gray-800 text-base font-bold">Email</h2>
              <ul class="mt-4">
                <li class="flex items-center">
                  <div class="bg-[#e6e6e6cf] h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill='#007bff'
                      viewBox="0 0 479.058 479.058">
                      <path
                        d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                        data-original="#000000" />
                    </svg>
                  </div>
                  <a href="javascript:void(0)" class="text-violet-700 text-sm ml-4">
                    <small class="block">Mail</small>
                    <strong>info@chaseyourdreamsindia.com</strong>
                  </a>
                </li>
              </ul>
            </div> */}


            <div class="mt-12">
              <h2 class="text-gray-800 text-base font-bold">Address</h2>
              <h1 className='playfair-italic'>Chase Your Dreams India Pvt Ltd</h1>
              <h1 className='font-bold'>WeWork RMZ Spire,</h1>
              <h1>Hitec City, Hyderabad.</h1>
              <h1>Telangana-500081.</h1>
            </div>
            <div class="mt-12">
              <h2 class="text-gray-800 text-base font-bold">Registered Office</h2>
              <h1 className='playfair-italic'>Chase Your Dreams India Pvt Ltd</h1>
              <h1 className='font-bold'>CIN : U74999TG2020PTC144354</h1>
              <h1>12-7-124/6, G2, Sai Bhanu Enclave, New Mettuguda, Secunderabad, 500017.</h1>
            </div>


            <div className='mt-12'>
              <h1 className='font-bold text-pink-600 text-3xl playfair-italic'>Contact Details</h1>
              <h1 className='mt-6'><i class="fa fa-phone text-violet-700" aria-hidden="true"></i> &nbsp;
                +91 7799777013 | +91 7799777014</h1>
              <h1 className=''><i class="fa fa-envelope text-violet-700" aria-hidden="true"></i>&nbsp;&nbsp;
                info@chaseyourdreamsindia.com <br />
                <i class="fa fa-envelope text-violet-700" aria-hidden="true"></i> &nbsp;
                shravankaipa@chaseyourdreamsindia.com</h1>
            </div>
            <div class="mt-12">
              <h2 class="text-gray-800 text-base font-bold">Socials</h2>
              <h1 className='text-gray-500'>Your engagement matters! Follow us on socials for more.</h1>
              <div className="flex gap-4 mt-6">
                <a href="https://facebook.com/chaseyourdreamsindia">
                  <img src={facebook} alt="" srcset="" className='w-10 h-10' />
                </a>
                <a href="https://instagram.com/chaseyourdreamsindia">
                  <img src={insta} alt="" srcset="" className='w-10 h-10' />
                </a>
                <a href="https://www.linkedin.com/posts/chaseyourdreamsindia_happyholi-innerpeace-resilience-activity-7177979916091625472--BLp?utm_source=share&utm_medium=member_android">
                  <img src={lnk} alt="" srcset="" className='w-10 h-10' />
                </a>
                <a href="https://twitter.com/cydipl_official">
                  <img src={x} alt="" srcset="" className='w-10 h-10' />
                </a>
                <a href="https://www.youtube.com/@chaseyourdreamsindia">
                  <img src={yt} alt="" srcset="" className='w-10 h-10' />
                </a>
              </div>
            </div>
          </div>

          <form class="ml-auo space-y-4">
            <input type='text' placeholder='Name'
              class="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500" />
            <input type='email' placeholder='Email'
              class="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500" />
            <input type='text' placeholder='Subject'
              class="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-blue-500" />
            <textarea placeholder='Message' rows="6"
              class="w-full text-gray-800 rounded-md px-4 border text-sm pt-2.5 outline-blue-500"></textarea>
            <button type='button'
              class="text-white bg-violet-500 hover:bg-blue-600 rounded-md text-sm px-4 py-3 w-full !mt-6">Send</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact;