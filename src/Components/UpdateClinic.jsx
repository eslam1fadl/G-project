import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

export default function Addclinic() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { t } = useTranslation("global");
  const [city, setCity] = useState([]);
  const [region, setRegion] = useState([]);
  const [clinic, setClinic] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const doctorId = localStorage.getItem("id");
  const clinicId = localStorage.getItem("clinicId");
  console.log("clinicId from localStorage:", clinicId);

  const validationSchema = Yup.object().shape({
    clinicName: Yup.string().optional(),
    phoneNumber: Yup.string().optional(),
    city: Yup.string().optional(),
    region: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      clinicName: '',
      phoneNumber: '',
      city: '',
      region: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => UpdateClinic(clinicId, values)
  });

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
  async function getMyClinic(doctorId) {
    if (!doctorId) {
      setError("لم يتم العثور على معرف العيادة");
      setInitialLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(`http://dr-home.runasp.net/api/Clinics/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const clinicData = Array.isArray(data.data) ? data.data[0] : data.data;

      if (!clinicData) {
        throw new Error("No clinic data found");
      }

      setClinic(clinicData);
      formik.setValues({
        clinicName: clinicData.clinicName || "",
        phoneNumber: clinicData.phoneNumber || "",
        city: clinicData.city || "",
        region: clinicData.region || "",
      });
    } catch (error) {
      console.error("Error fetching clinic data:", error);
      toast.error("فشل في تحميل بيانات العيادة");
      setError("فشل في تحميل بيانات العيادة");
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }

  // function handleClinicSubmit(values) {
  //   if (!Id) {
  //     toast.error("لم يتم العثور على معرف العيادة");
  //     return;
  //   }
  //   UpdateClinic(Id, values);
  // }

  // async function UpdateClinic(Id, values) {
  //   setLoading(true);
  //   try {
  //     console.log("Updating clinic with data:", values);
  //     await axios.put(`http://dr-home.runasp.net/api/Clinics/${Id}`, values, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     });
  //     toast.success("تم تعديل بيانات العيادة بنجاح");
  //   } catch (error) {
  //     console.error("Error updating clinic:", error);
  //     const errorMessage = error.response?.data?.message || "حدث خطأ أثناء التعديل";
  //     toast.error(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // }
  
  async function UpdateClinic(clinicId, values) {
    try {
      const dataToSend = {
        ...values,
        doctorId: doctorId,
      };
      setLoading(true);
      await axios.put(`http://dr-home.runasp.net/api/Clinics/${clinicId}`, dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("تم تعديل بيانات العيادة بنجاح");
     
    }
     catch (error) {
      console.error("Error updating clinic:", error);
      const errorMessage = error.response?.data?.message || "حدث خطأ أثناء التعديل";
      toast.error(errorMessage);
        } finally {
          setLoading(false);
    }
  }



  useEffect(() => {
    Promise.all([getregion(), getcity()])
      .then(() => getMyClinic(doctorId))
      .catch(err => {
        console.error("Error in initial data loading:", err);
        setInitialLoading(false);
      });
  }, [doctorId]);

  if (initialLoading) return <Loading />;

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center p-5 bg-red-50 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button 
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => window.location.reload()}
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

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
          <div className="w-full mb-3 sm:mb-0">
            <label htmlFor="clinicName" className="block mb-1 text-sm font-medium text-gray-700">
              {t("Myclinic.ClinicName")}
            </label>
            <input
              type="text"
              id="clinicName"
              name="clinicName"
              value={formik.values.clinicName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-3 w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            />
            {formik.errors.clinicName && formik.touched.clinicName && (
              <div className="p-2 text-sm text-red-800 bg-red-50 rounded-md">
                {formik.errors.clinicName}
              </div>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="phoneNumber" className="block mb-1 text-sm font-medium text-gray-700">
              {t("Myclinic.phoneNumber")}
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-3 w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <div className="p-2 text-sm text-red-800 bg-red-50 rounded-md">
                {formik.errors.phoneNumber}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 w-full mb-3">
          <div className="w-full mb-3 sm:mb-0">
            <label htmlFor="region" className="block mb-1 text-sm font-medium text-gray-700">
              {t("Myclinic.SelectRegion")}
            </label>
            <select
              id="region"
              name="region"
              value={formik.values.region}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-3 w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            >
              <option value="">{t("Myclinic.SelectRegion")}</option>
              {region.map((region) => (
                <option key={region.id} value={region.name}>{region.name}</option>
              ))}
            </select>
            {formik.errors.region && formik.touched.region && (
              <div className="p-2 text-sm text-red-800 bg-red-50 rounded-md">
                {formik.errors.region}
              </div>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="city" className="block mb-1 text-sm font-medium text-gray-700">
              {t("Myclinic.SelectCity")}
            </label>
            <select
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-3 w-full border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            >
              <option value="">{t("Myclinic.SelectCity")}</option>
              {city.map((city) => (
                <option key={city.id} value={city.name}>{city.name}</option>
              ))}
            </select>
            {formik.errors.city && formik.touched.city && (
              <div className="p-2 text-sm text-red-800 bg-red-50 rounded-md">
                {formik.errors.city}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center items-center text-lg font-medium text-white bg-red-600 hover:bg-red-800 rounded-lg w-[40%] py-2"
          >
            {loading ? (
              <i className="fa-solid fa-rotate-right animate-spin text-white"></i>
            ) : (
              t("ProfileDoctor.Save")
            )}
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex justify-center items-center text-lg font-medium text-white bg-[#199ED3] hover:bg-[#199ed3e0] rounded-lg w-[40%] py-2"
          >
            {t("ProfileDoctor.Cancel")}
          </button>
        </div>
      </form>
    </div>
  );
}
