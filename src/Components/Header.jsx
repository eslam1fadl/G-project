import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { useTranslation } from "react-i18next";
import img0 from '../assets/images/header.jpg';
import img1 from '../assets/images/header1.jpg';
import img2 from '../assets/images/header2.jpg';
import img3 from '../assets/images/header3.jpg';
import img4 from '../assets/images/header4.jpg';

export default function Header() {
  const { t } = useTranslation("global");

  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [t("header.betterLife"), t("header.and"), t("header.betterHealth")],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true
    });

    return () => typed.destroy();
  }, [t]);

  return (
    <section className="relative h-screen w-full" >
      <div className="absolute inset-0 -z-10" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 3000 }}
          speed={2000}
          loop={true}
          dir="rtl"
          className="relative h-full"
        >
        
          <SwiperSlide>
            <div className="relative h-screen">
              <img src={img0} className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out" alt="Header 0" />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-screen">
              <img src={img1} className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out" alt="Header 1" />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-screen">
              <img src={img2} className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out" alt="Header 2" />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-screen">
              <img src={img3} className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out" alt="Header 3" />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-screen">
              <img src={img4} className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out" alt="Header 4" />
              <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t("header.togetherFor")} <span ref={typedRef} className="text-[#199ED3]"></span>
        </h1>
        <p className="text-lg md:text-xl">
          {t("header.platformDescription")}
        </p>
      </div>
    </section>
  );
}
