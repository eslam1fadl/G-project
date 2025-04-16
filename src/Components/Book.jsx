import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ask from '../assets/images/كيف-تختار-الطبيب-المناسب.png';
import img1 from '../assets/images/rhinoplasty-1.jpg';
import img2 from '../assets/images/tblarticle_article_37263_039fac2d7-1ed8-4726-a770-d5186278f53a.jpg';
import img3 from '../assets/images/tblarticle_article_37261_939495fa740-f2ec-4bfd-984a-92d9c95ab93f.png';
import img4 from '../assets/images/general-health.jpg';
import img5 from '../assets/images/tblarticle_article_37265_64451740f11-8532-4b98-a7dc-99d92c70c23d.jpg';
import img6 from '../assets/images/tblarticle_article_37257_4243d685a55-db4e-4755-8d33-f6a11975db88.jpg';
import img7 from '../assets/images/tbl_articles_article_36657_8571cf24c5f-2780-4367-9862-2094a7411ddc.jpg';
import img8 from '../assets/images/slideshow_slideshow_2390_585a1518034-d389-4cbf-b18d-99b4b5933f4f.jpg';
import img9 from '../assets/images/slideshow_slideshow_2390_585a1518034-d389-4cbf-b18d-99b4b5933f4f.jpg';
import img10 from '../assets/images/tblarticle_article_37255_67348776153-1fa8-4489-876c-2bb6df0bc0da.png';
import img11 from '../assets/images/tbl_articles_article_36353_4038f015451-313a-456c-81d3-c2681e5899d9.jpg';
import img12 from '../assets/images/tblarticle_article_37205_15540c9d4e6-b2de-48f3-9d21-460a99394279.png';
import img13 from '../assets/images/slideshow_slideshow_2390_585a1518034-d389-4cbf-b18d-99b4b5933f4f.jpg';
import { useTranslation } from "react-i18next";


export default function Book() {
  const { t } = useTranslation("global");
  return (
    <div>
    <div className="container bg-[#199ED3]  ">
      <h1 className="text-left text-2xl lg:text-4xl text-white font-semibold mb-5">
      {t("book.title")}
      </h1>
      
<div className='mt-5'>
      <Swiper 
  navigation={true} 
  modules={[Navigation]} 
  slidesPerView="auto" 
  spaceBetween={20} 
  className="mySwiper"
>
  
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg">
      <a href="#">
      <div className="overflow-hidden rounded">
        <img className="rounded-t-lg w-full h-[180px] object-cover transition-transform duration-1000 hover:scale-125"
         src={img9} alt="" />
         </div>
      </a>
      <div className="p-2">
        <p className="mb-1 font-normal">{t("book.teeth")}</p>
      </div>
    </div>
  </SwiperSlide>
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg">
      <a href="#">
      <div className="overflow-hidden rounded">
        <img className="rounded-t-lg w-full h-[180px] object-cover transition-transform duration-1000 hover:scale-125"
        src={img10} alt="" />
                 </div>
      </a>
      <div className="p-2">
        <p className="mb-1 font-normal">{t("book.child")}</p>
      </div>
    </div>
  </SwiperSlide>
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg">
      <a href="#">
      <div className="overflow-hidden rounded">
        <img className="rounded-t-lg w-full h-[180px] object-cover transition-transform duration-1000 hover:scale-125"
        src={img11} alt="" />
                 </div>      </a>
      <div className="p-2">
        <p className="mb-1 font-normal">{t("book.skin")}</p>
      </div>
    </div>
  </SwiperSlide>
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg">
      <a href="#">
      <div className="overflow-hidden rounded">
        <img className="rounded-t-lg w-full h-[180px] object-cover transition-transform duration-1000 hover:scale-125"
        src={img12} alt="" />
                 </div>      </a>
      <div className="p-2">
        <p className="mb-1 font-normal">{t("book.skin")}</p>
      </div>
    </div>
  </SwiperSlide>
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg">
      <a href="#">
      <div className="overflow-hidden rounded">
        <img className="rounded-t-lg w-full h-[180px] object-cover transition-transform duration-1000 hover:scale-125"
        src={img13} alt="" />
                 </div>      </a>
      <div className="p-2">
        <p className="mb-1 font-normal">{t("book.skin")}</p>
      </div>
    </div>
  </SwiperSlide>


  
</Swiper>


</div>

    </div>

    <div className="bg-gray-100 py-12 my-30">
      <div className="max-w-6xl mx-auto px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <div className="bg-white p-8 rounded-xl flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#199ED3]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="w-10 h-1 bg-[#199ED3] mb-4"></div>
          <h3 className="text-gray-700 font-medium text-lg mb-2">{t("features.healthcareNeedsTitle")}</h3>
          <p className="text-gray-500 text-sm">{t("features.healthcareNeedsDescription")}</p>
        </div>

        <div className="bg-white p-8 rounded-xl flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#199ED3]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z" />
            </svg>
          </div>
          <div className="w-10 h-1 bg-[#199ED3] mb-4"></div>
          <h3 className="text-gray-700 font-medium text-lg mb-2">{t("features.verifiedReviewsTitle")}</h3>
          <p className="text-gray-500 text-sm">{t("features.verifiedReviewsDescription")}</p>
        </div>

        <div className="bg-white p-8 rounded-xl flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#199ED3]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </div>
          <div className="w-10 h-1 bg-[#199ED3] mb-4"></div>
          <h3 className="text-gray-700 font-medium text-lg mb-2">{t("features.bookingConfirmedTitle")}</h3>
          <p className="text-gray-500 text-sm">{t("features.bookingConfirmedDescription")}</p>
        </div>

        <div className="bg-white p-8 rounded-xl flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#199ED3]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
            </svg>
          </div>
          <div className="w-10 h-1 bg-[#199ED3] mb-4"></div>
          <h3 className="text-gray-700 font-medium text-lg mb-2">{t("features.bookFreeTitle")}</h3>
          <p className="text-gray-500 text-sm">{t("features.bookFreeDescription")}</p>
        </div>

      </div>
    </div>
    </div>
  );
}
