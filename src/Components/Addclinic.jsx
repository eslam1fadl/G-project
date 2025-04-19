import React, { useState, useContext, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import { DoctorId } from "../Context/DoctorId";
import Loading from './Loading';

export default function Addclinic() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("global");
  let [city, setCity] = useState([]);
let [region, setRegion] = useState([]);
  // const { isDoctorId } = useContext(DoctorId);
  const token = localStorage.getItem("token");

  // const [cities] = useState([
  //   "القاهرة", "الجيزة", "الإسكندرية", "الشرقية", "الدقهلية", "البحيرة",
  //   "القليوبية", "المنيا", "الغربية", "سوهاج", "أسيوط", "المنوفية",
  //   "الفيوم", "قنا", "بني سويف", "كفر الشيخ", "أسوان", "دمياط",
  //   "الإسماعيلية", "الأقصر", "بورسعيد", "السويس", "مطروح",
  //   "شمال سيناء", "البحر الأحمر", "الوادي الجديد", "جنوب سيناء"
  // ]);

  // const [regions] = useState([
  //   "العدوه", "مغاغه", "مطاي", "سمالوط", "بني مزار",
  //   "الزمالك", "المنصورة", "ديرمواس", "ابو القرقاص", "ملوي",
  //   "المحلة الكبرى", "اشمون", "البداري", "شبين الكوم",
  //   "نجع حمادي", "الفشن", "كومبو", "بورفؤاد",
  //   "رفح", "الغردقة", "الخارجة", "شرم الشيخ"
  // ]);

  async function getcity() {
    try{
      let response= await axios.get('http://dr-home.runasp.net/api/Cities')
      setCity(response.data.data || []);

    }
    catch(error){
      console.log(error);
    }
    
  }

  async function getregion() {
    try{
      let response= await axios.get('http://dr-home.runasp.net/api/Regions')
      setRegion(response.data.data || []);

    }
    catch(error){
      console.log(error);
    }
    
  }
  async function handleClinic(values) {
    setLoading(true);
    const doctorId = localStorage.getItem("id"); 

    const dataToSend = {
      ...values,
      doctorId: doctorId,
    };

    try {
      let { data } = await axios.post("http://dr-home.runasp.net/api/Clinics", dataToSend, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      setLoading(false);
      localStorage.setItem('clinicId',data.data.id);
      console.log(data.data.id)
      toast.success(`${t("addClinic.msg1")}`, {
        position: "top-center",
        autoClose: 3000,
      });
    } catch (error) {
      setLoading(false);
      console.error("API Error:", error.response?.data);
      toast.error(`${t("addClinic.msg2")}`, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }

  let validationSchema = Yup.object().shape({
    clinicName: Yup.string().required(t("re_validation.clinicName")),
    phoneNumber: Yup.string().required(t("re_validation.emailRequired")),
    city: Yup.string().required(t("re_validation.cityRequired")),
    region: Yup.string().required(t("re_validation.regionRequired"))
  });

  let formik = useFormik({
    initialValues: {
      clinicName: '',
      phoneNumber: '',
      city: '',
      region: ''
    },
    validationSchema: validationSchema,
    onSubmit: handleClinic
  });
  useEffect(() => {
      getcity();
      }, []);
      useEffect(() => {
        getregion();
        }, []);
      if (loading) return <Loading />;
  

  return (
    <div className='mt-30'>
      <div className="flex justify-center items-center mt-4 lg:mt-10 mb-4">
        <h2 className="clinic-title log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-4xl bg-[#58916e]">
          {t("Myclinic.title")}
        </h2>
      </div>
      <ToastContainer />
      <form onSubmit={formik.handleSubmit} className="w-full max-w-4xl mx-auto shadow-2xl shadow-gray-300 p-4 md:p-5">
        <div className="flex flex-col sm:flex-row sm:space-x-4 w-full mb-3">
          <div className="relative z-0 py-0 w-full mb-3 sm:mb-0 group">
            <input
              type="text"
              id="clinicName"
              name="clinicName"
              value={formik.values.clinicName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("Myclinic.ClinicName")}
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            />
            {formik.errors.clinicName && formik.touched.clinicName && (
              <div className="p-2 text-sm text-red-800 rounded-md bg-red-50">
                {formik.errors.clinicName}
              </div>
            )}
          </div>

          <div className="relative z-0 py-0 w-full group">
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={t("Myclinic.phoneNumber")}
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <div className="p-2 text-sm text-red-800 rounded-md bg-red-50">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 w-full mb-3">
          <div className="relative z-0 py-0 w-full mb-3 sm:mb-0 group">
            <select
              id="region"
              name="region"
              value={formik.values.region}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-3 w-full text-sm text-black bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            >
              <option className='text-black' value="">{t("Myclinic.SelectRegion")}</option>
              {region.map(region => <option key={region.id} value={region.name}>{region.name}</option>)}

            </select>
            {formik.errors.region && formik.touched.region && (
              <div className="p-2 text-sm text-red-800 rounded-md bg-red-50">
                {formik.errors.region}
              </div>
            )}
          </div>

          <div className="relative z-0 py-0 w-full group">
            <select
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            >
              <option value="">{t("Myclinic.SelectCity")}</option>
              {city.map(city => <option key={city.id} value={city.name}>{city.name}</option>)}

            </select>
            {formik.errors.city && formik.touched.city && (
              <div className="p-2 text-sm text-red-800 rounded-md bg-red-50">
                {formik.errors.city}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center text-lg font-medium text-white bg-red-600 hover:bg-red-800 focus:ring-4 rounded-lg w-[40%] py-1"
          >
            {loading ? (
              <i className="fa-solid fa-rotate-right animate-spin text-white"></i>
            ) : (
              `${t("ProfileDoctor.Save")}`
            )}
          </button>
          <button
            type="button"
            className="flex justify-center items-center text-lg font-medium text-white bg-[#199ED3] hover:bg-[#199ed3e0] focus:ring-4 rounded-lg w-[40%] py-1"
          >
            {t("ProfileDoctor.Cancel")}
          </button>
        </div>
      </form>
    </div>
  )
}
