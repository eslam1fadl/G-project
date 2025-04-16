import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from 'react-i18next';
import Loading from '../Loading'

export default function Addcity() {
  const { t } = useTranslation("global");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  async function addCity(values) {
    setLoading(true);
    try {
      console.log("city:",values)
      await axios.post(`http://dr-home.runasp.net/api/Cities`, 
        { name: values.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      toast.success("تمت إضافة المدينة بنجاح");
      cityFormik.resetForm();
    } catch (error) {
      console.error("خطأ إضافة المدينة:", error.response?.data || error.message);
      console.log("تفاصيل الخطأ:", error.response?.data?.errors);
      toast.error("حدث خطأ أثناء إضافة المدينة");
    } finally {
      setLoading(false);
    }
  }
  


  async function addRegion(values) {
    setLoading(true);
    try {
      console.log("Region:",values)
      await axios.post(`http://dr-home.runasp.net/api/Regions`, 
        { name: values.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      toast.success("تمت إضافة المنطقة بنجاح");
      regionFormik.resetForm();
    } catch (error) {
      console.error("خطأ إضافة المنطقة:", error.response?.data || error.message);
console.log("تفاصيل الخطأ:", error.response?.data?.errors);

      toast.error("حدث خطأ أثناء إضافة المنطقة");
    } finally {
      setLoading(false);
    }
  }
  



  const cityFormik = useFormik({
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string().required(t("addcity.required")),
    }),
    onSubmit: (values) => {
      addCity(values);
    },
  });

  const regionFormik = useFormik({
    initialValues: { name: "" },
    validationSchema: Yup.object({
      name: Yup.string().required(t("addcity.required")),
    }),
    onSubmit: (values) => {
      addRegion(values);
    },
  });


  return (
    <div className="flex md:flex-row flex-col justify-center gap-5 p-5">
      <ToastContainer />
      <div className="flex justify-center items-center w-full md:w-[60%] h-[55%] overflow-scroll mt-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111113.94470786733!2d30.67974495!3d28.0913699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14486134b3a5e7ff%3A0x8d8bb1a87c53cbbc!2sMinya%20Governorate!5e0!3m2!1sen!2seg!4v1687369221545!5m2!1sen!2seg"
          width="100%"
          height="600"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>


      <div className="flex flex-col w-full md:max-w-md mt-20">
        <form onSubmit={cityFormik.handleSubmit} className="p-5 text-[#199ED3] space-y-4 w-full shadow-sm shadow-gray-400 rounded-md">
          <h2 className="text-xl font-semibold text-center">إضافة مدينة</h2>
          <input
            type="text"
            name="name"
            value={cityFormik.values.name}
            onChange={cityFormik.handleChange}
            onBlur={cityFormik.handleBlur}
            placeholder="ادخل اسم المدينة"
            className="block w-full p-2 border rounded-md text-gray-800"
          />
          {cityFormik.touched.name && cityFormik.errors.name && (
            <div className="text-red-500 text-sm">{cityFormik.errors.name}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#199ED3] text-white rounded-md hover:bg-[#199ed3d4]"
          >
            إضافة المدينة
          </button>
        </form>

        <form onSubmit={regionFormik.handleSubmit} className="p-5 mt-5 text-[#199ED3] space-y-4 shadow-sm w-full shadow-gray-400 rounded-md">
          <h2 className="text-xl font-semibold text-center">إضافة منطقة</h2>
          <input
            type="text"
            name="name"
            value={regionFormik.values.name}
            onChange={regionFormik.handleChange}
            onBlur={regionFormik.handleBlur}
            placeholder="ادخل اسم المنطقة"
            className="block w-full p-2 border rounded-md text-gray-800"
          />
          {regionFormik.touched.name && regionFormik.errors.name && (
            <div className="text-red-500 text-sm">{regionFormik.errors.name}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#199ED3] text-white rounded-md hover:bg-[#199ed3d4]"
          >
            إضافة المنطقة
          </button>
        </form>
      </div>
    </div>
  );
}
