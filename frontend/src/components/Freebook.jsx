import React, { useEffect, useState } from 'react';

import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Cards from './Cards'; 

export default function Freebook() {
const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        const filterdata=res.data.filter((data)=>{
     return data.category==="free";
})
console.log(filterdata);
        
        setBook(filterdata);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
 





  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mb-6">

  {/* Heading with offer badge */}
  <div className="flex items-center gap-3">
    
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
      Free Offered Courses
    </h1>

    {/* Offer Badge */}
    <span className="bg-pink-500 text-white text-sm px-3 py-1 rounded-full animate-pulse">
      🔥 FREE
    </span>

  </div>

  {/* Subtitle */}
  <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
    Grab these amazing courses at zero cost. Limited time offer — start learning today and boost your skills!
  </p>

  {/* Divider */}
  <div className="w-20 h-1 bg-pink-500 mt-3 rounded"></div>

</div>
        <div>
          <div>
           <Swiper
  spaceBetween={20}
  breakpoints={{
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  }}
>
  {book.map((item) => (
    <SwiperSlide key={item.id}>
      <Cards item={item} />
    </SwiperSlide>
  ))}
</Swiper>
        </div>
        </div>
      </div>
    </>
  );
}