import React, { useEffect, useRef, useContext } from 'react';
import Typed from 'typed.js';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import { TranslateContext } from "../utils/TranslateContext";
import img0 from '../assets/images/header.jpg';
import img1 from '../assets/images/header1.jpg';
import img2 from '../assets/images/header2.jpg';
import img3 from '../assets/images/header3.jpg';
import img4 from '../assets/images/header4.jpg';

export default function Header() {
  const { t } = useTranslation("global");

  var settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    responsive: [{ breakpoint: 768, settings: { dots: false } }]
  };

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
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 -z-10">
        <Slider {...settings} className="relative h-full">
          <div className="h-screen"><img src={img0} className="w-full h-full object-cover" alt="Header 0" /></div>
          <div className="h-screen"><img src={img1} className="w-full h-full object-cover" alt="Header 1" /></div>
          <div className="h-screen"><img src={img2} className="w-full h-full object-cover" alt="Header 2" /></div>
          <div className="h-screen"><img src={img3} className="w-full h-full object-cover" alt="Header 3" /></div>
          <div className="h-screen"><img src={img4} className="w-full h-full object-cover" alt="Header 4" /></div>
        </Slider>
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}></div>
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
