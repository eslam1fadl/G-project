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
import { useTranslation } from "react-i18next";
export default function Ask() {
  const { t } = useTranslation("global");
  const language =localStorage.getItem("language")
  return (
    <div className="container">
      <h1 className="text-left text-2xl lg:text-4xl text-gray-500 font-semibold my-5">
        {t("ask.slogan")}
      </h1>

      <div className="ask bg-gray-50 text-gray-600 rounded-2xl flex flex-col lg:flex-row items-center h-auto lg:h-[280px] lg:p-10 gap-6 my-20">
        {/* {(language == 'en'?
        <div className="w-full lg:w-1/2 text-center lg:text-left my-5">
          <h1 className="text-2xl font-semibold"> {t("ask.haveQuestion")}</h1>
          <p className="mt-2 text-lg">{t("ask.sendToDoctor")}</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 transition px-5 py-2 w-[94%] lg:w-[30%] text-white rounded-xl shadow-md">
        {t("ask.yourQuestion")}
          </button>
        </div>:
        <div className="w-full lg:w-1/2 text-center lg:text-right my-5">
        <h1 className="text-2xl font-semibold"> {t("ask.haveQuestion")}</h1>
        <p className="mt-2 text-lg">{t("ask.sendToDoctor")}</p>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 transition px-5 py-2 w-[94%] lg:w-[30%] text-white rounded-xl shadow-md">
      {t("ask.yourQuestion")}
        </button>
      </div>
      
      )} */}
      <div className="w-full lg:w-1/2 text-center lg:text-left my-5">
          <h1 className="text-2xl font-semibold"> {t("ask.haveQuestion")}</h1>
          <p className="mt-2 text-lg">{t("ask.sendToDoctor")}</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-600 transition px-5 py-2 w-[94%] lg:w-[30%] text-white rounded-xl shadow-md">
        {t("ask.yourQuestion")}
          </button>
        </div>

        <div className="w-full lg:w-1/2">
          <img
            src={ask}
            className="w-full h-[100%] lg:h-[280px] object-cover ml-0 lg:ml-10 rounded-xl"
            alt="Medical Question"
          />
        </div>
      </div>
<div className='my-30'>
      <Swiper 
  navigation={true} 
  modules={[Navigation]} 
  slidesPerView="auto" 
  spaceBetween={20} 
  className="mySwiper"
>
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg shadow-sm">
      <a href="#">
        <img className="rounded-t-lg w-full h-[150px] object-cover" src={img1} alt="" />
      </a>
      <div className="p-4">
       <p className="mb-1 font-normal">{t("services.teethCleaning")}</p>
<p className="mb-1 font-normal text-blue-500">1200 {t("currency.EGP")}</p>
<p className="mb-1 font-normal">50 {t("services.offers")}</p>
<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#199ED3] rounded-lg hover:bg-[#199ed3d3]">
  {t("services.readMore")}
</a>

      </div>
    </div>
  </SwiperSlide>

  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg shadow-sm">
      <a href="#">
        <img className="rounded-t-lg w-full h-[150px] object-cover" src={img2} alt="" />
      </a>
      <div className="p-4">
       <p className="mb-1 font-normal">{t("services.teethCleaning")}</p>
<p className="mb-1 font-normal text-blue-500">1200 {t("currency.EGP")}</p>
<p className="mb-1 font-normal">50 {t("services.offers")}</p>
<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#199ED3] rounded-lg hover:bg-[#199ed3d3]">
  {t("services.readMore")}
</a>

      </div>
    </div>
  </SwiperSlide>

  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg shadow-sm">
      <a href="#">
        <img className="rounded-t-lg w-full h-[150px] object-cover" src={img3} alt="" />
      </a>
      <div className="p-4">
       <p className="mb-1 font-normal">{t("services.teethCleaning")}</p>
<p className="mb-1 font-normal text-blue-500">1200 {t("currency.EGP")}</p>
<p className="mb-1 font-normal">50 {t("services.offers")}</p>
<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#199ED3] rounded-lg hover:bg-[#199ed3d3]">
  {t("services.readMore")}
</a>
      </div>
    </div>
  </SwiperSlide>

  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg shadow-sm">
      <a href="#">
        <img className="rounded-t-lg w-full h-[150px] object-cover" src={img4} alt="" />
      </a>
      <div className="p-4">
       <p className="mb-1 font-normal">{t("services.teethCleaning")}</p>
<p className="mb-1 font-normal text-blue-500">1200 {t("currency.EGP")}</p>
<p className="mb-1 font-normal">50 {t("services.offers")}</p>
<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#199ED3] rounded-lg hover:bg-[#199ed3d3]">
  {t("services.readMore")}
</a>

      </div>
    </div>
  </SwiperSlide>
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg shadow-sm">
      <a href="#">
        <img className="rounded-t-lg w-full h-[150px] object-cover" src={img5} alt="" />
      </a>
      <div className="p-4">
       <p className="mb-1 font-normal">{t("services.teethCleaning")}</p>
<p className="mb-1 font-normal text-blue-500">1200 {t("currency.EGP")}</p>
<p className="mb-1 font-normal">50 {t("services.offers")}</p>
<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#199ED3] rounded-lg hover:bg-[#199ed3d3]">
  {t("services.readMore")}
</a>

      </div>
    </div>
  </SwiperSlide>
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg shadow-sm">
      <a href="#">
        <img className="rounded-t-lg w-full h-[150px] object-cover" src={img6} alt="" />
      </a>
      <div className="p-4">
       <p className="mb-1 font-normal">{t("services.teethCleaning")}</p>
<p className="mb-1 font-normal text-blue-500">1200 {t("currency.EGP")}</p>
<p className="mb-1 font-normal">50 {t("services.offers")}</p>
<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#199ED3] rounded-lg hover:bg-[#199ed3d3]">
  {t("services.readMore")}
</a>

      </div>
    </div>
  </SwiperSlide>
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg shadow-sm">
      <a href="#">
        <img className="rounded-t-lg w-full h-[150px] object-cover" src={img7} alt="" />
      </a>
      <div className="p-4">
       <p className="mb-1 font-normal">{t("services.teethCleaning")}</p>
<p className="mb-1 font-normal text-blue-500">1200 {t("currency.EGP")}</p>
<p className="mb-1 font-normal">50 {t("services.offers")}</p>
<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#199ED3] rounded-lg hover:bg-[#199ed3d3]">
  {t("services.readMore")}
</a>

      </div>
    </div>
  </SwiperSlide>
  <SwiperSlide className="!w-[300px] gap-5">
    <div className="w-full bg-white border text-gray-500 border-gray-100 rounded-lg shadow-sm">
      <a href="#">
        <img className="rounded-t-lg w-full h-[150px] object-cover object-cover" src={img8} alt="" />
      </a>
      <div className="p-4">
       <p className="mb-1 font-normal">{t("services.teethCleaning")}</p>
<p className="mb-1 font-normal text-blue-500">1200 {t("currency.EGP")}</p>
<p className="mb-1 font-normal">50 {t("services.offers")}</p>
<a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#199ED3] rounded-lg hover:bg-[#199ed3d3]">
  {t("services.readMore")}
</a>

      </div>
    </div>
  </SwiperSlide>
</Swiper>


</div>

    </div>
  );
}
