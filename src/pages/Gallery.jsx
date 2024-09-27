import React from 'react';
import img1 from '../Assets/gallery/1.jpeg';
import img2 from '../Assets/gallery/2.jpeg';
import img3 from '../Assets/gallery/3.jpeg';
import img4 from '../Assets/gallery/4.jpeg';
import img5 from '../Assets/gallery/5.jpeg';
import img6 from '../Assets/gallery/6.jpeg';
import img7 from '../Assets/gallery/7.jpeg';
import img8 from '../Assets/gallery/8.jpeg';
import img9 from '../Assets/gallery/9.jpeg';
import img10 from '../Assets/gallery/10.jpeg';
import img11 from '../Assets/gallery/11.jpeg';
import img12 from '../Assets/gallery/12.jpeg';


const Gallery = () => {
    return (
        <div className='pt-20'>
            <div className='w-full md:h-[50vh] h-[30vh] flex flex-row items-center justify-center services-text' style={{
                backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/iccreators-347d7.appspot.com/o/chess.jpg?alt=media&token=f1b32f05-4077-46a9-95a4-91bcf051afa2')",
                backgroundRepeat: "repeat",
                backgroundSize: "cover",
                backgroundColor: "rgba(255,255,255,0.6)",
                backgroundBlendMode: "revert",
                boxShadow: '15px 15px 1000px inset'
            }}>
                <h1 className='playfair-italic text-4xl md:text-5xl xl:text-7xl text-center text-white drop-shadow-2xl font-bold services-text'>Gallery</h1>
            </div>
            <img src="https://firebasestorage.googleapis.com/v0/b/iccreators-347d7.appspot.com/o/page-top-curve.png?alt=media&token=4e88ffa3-9a18-4a47-8940-0ba388b8bce8" alt="" className='xl:-mt-12 -mt-2' />
            <div className='mt-2 grid grid-cols-3 gap-2 p-10'>
                <img src={img1} alt="" className='object-cover'/>
                <img src={img2} alt="" className='object-cover'/>
                <img src={img3} alt="" className='object-cover'/>
                <img src={img4} alt="" className='object-cover'/>
                <img src={img5} alt="" className='object-cover'/>
                <img src={img6} alt="" className='object-cover'/>
                <img src={img7} alt="" className='object-cover'/>
                <img src={img8} alt="" className='object-cover'/>
                <img src={img9} alt="" className='object-cover'/>
                <img src={img10} alt="" className='object-cover'/>
                <img src={img11} alt="" className='object-cover'/>
                <img src={img12} alt="" className='object-cover'/>
            </div>
        </div>
    )
}

export default Gallery;