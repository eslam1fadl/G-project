import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import Loading from '../Loading'

export default function AddDoctors() {
  const { t } = useTranslation("global");
  const navigate = useNavigate();
  let [errMsg, seterrtMsg] = useState('');
  let [sucMsg, setsucMsg] = useState('');
  let [city, setCity] = useState([]);
let [region, setRegion] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  
  // const [cities] = useState([
  //   "القاهرة", "الجيزة", "الإسكندرية", "الشرقية", "الدقهلية", "البحيرة",
  //   "القليوبية", "المنيا", "الغربية", "سوهاج", "أسيوط", "المنوفية",
  //   "الفيوم", "قنا", "بني سويف", "كفر الشيخ", "أسوان", "دمياط",
  //   "الإسماعيلية", "الأقصر", "بورسعيد", "السويس", "مطروح",
  //   "شمال سيناء", "البحر الأحمر", "الوادي الجديد", "جنوب سيناء"
  // ]);
  // const [regions] = useState([
  //   "العدوه", " مغاغه", "مطاي", "سمالوط", "بني مزار",
  //   "الزمالك", "المنصورة", "ديرمواس", "ابو القرقاص", , "ملوي",
  //   "المحلة الكبرى", "سوهاج", "أسيوط", "شبين الكوم", "الفيوم",
  //   "نجع حمادي", "بني سويف", "كفر الشيخ", "أسوان", "دمياط",
  //   "الإسماعيلية", "الأقصر", "بورسعيد", "السويس", "مرسى مطروح",
  //   "العريش", "الغردقة", "الخارجة", "شرم الشيخ"
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
  

  const handleDoctor = async (values) => {
    setLoading(true);
    try {
      if (!token) {
        setMsg("Unauthorized: Token is missing");
        setLoading(false);
        return;
      }
      //   console.log("Sending Data:", values);
      // console.log("Token:", token);
      const response = await axios.post("http://dr-home.runasp.net/api/Doctors", values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.message.message === "The Doctor Added Successfully") {
        toast.success("The Doctor Added Successfully", { position: "top-center" });
      }

      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong", { position: "top-center" });
      setLoading(false);
    }
  };


  const validationSchema = Yup.object({
    fullName: Yup.string().required(t("re_errors.requiredField")),
    email: Yup.string()
      .required(t("re_validation.emailRequired"))
      .email(t("re_validation.emailInvalid"))
      .matches(/\.com$/, "Email must contain '.com'"),
    phoneNumber: Yup.string()
      .required(t("re_validation.phoneRequired"))
      .matches(/^(01)[0-25][0-9]{8}$/, t("re_errors.invalidPhone")),
    gender: Yup.string().required(t("re_validation.genderRequired")),
    password: Yup.string().required(t("re_validation.passwordRequired")),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], t("re_errors.passwordMismatch"))
      .required(t("re_validation.confirmPasswordRequired")),
    city: Yup.string().required(t("re_validation.cityRequired")),
    region: Yup.string().required(t("re_validation.regionRequired")),
    specializationId: Yup.string().required(t("re_validation.specializationId")),

  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      gender: "",
      email: "",
      phoneNumber: "",
      city: "",
      region: "",
      password: "",
      confirmPassword: "",
      specializationId:"",
    },
    validationSchema,
    onSubmit: handleDoctor,
  });
  const inputStyle = {
    color: "#cbd5e0",
    WebkitTextFillColor: "#cbd5e0",
    caretColor: "#cbd5e0"
  };
  useEffect(() => {
    getcity();
    }, []);
    useEffect(() => {
      getregion();
      }, []);
  
    useEffect(() => {
      if (errMsg) {
        toast.error(errMsg, { position: "top-center", autoClose: 5000 });
        seterrtMsg("");
      }
      else if (sucMsg) {
        toast.success(sucMsg, { position: "top-center", autoClose: 5000 });
        setsucMsg("");
      }
    }, [errMsg, sucMsg]);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>{t("text.adddoctor")}</title>
      </Helmet>
      <ToastContainer />

      {errMsg && (
        <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-red-600">
          {errMsg}
        </h2>
      )}
      {sucMsg && (
        <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-green-600">
          {sucMsg}
        </h2>
      )}
<div>
    
</div>

      <div className="flex justify-center items-center mt-20">
        <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-[#199ED3]">
          {t("Doctros.adddoctor")}
        </h2>
      </div>

      <form className="max-w-md mx-auto p-5 " onSubmit={formik.handleSubmit}>
        <div className="mb-5">
          <input
            type="text"
            id="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            style={inputStyle}

            onBlur={formik.handleBlur}
            className="block text-gray-300  w-full py-2 px-3 text-sm bg-transparent border-2 border-gray-500 rounded-md focus:ring-[#199ED3] focus:outline-none"
            placeholder={t("Doctros.fullName")}
          />
          {formik.errors.fullName && formik.touched.fullName && (
            <div className="p-4 text-sm text-gray-700 rounded-lg bg-gray-100" role="alert">
              <span className="font-medium">{formik.errors.fullName}</span>
            </div>
          )}
        </div>
        <div className="mb-5">
          <input
            type="email"
            id="email"
            value={formik.values.email}
            style={inputStyle}

            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block text-gray-300  w-full py-2 px-3 text-sm bg-transparent border-2 border-gray-500 rounded-md focus:ring-[#199ED3] focus:outline-none"
            placeholder={t("Doctros.email")}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="p-4 text-sm text-gray-700 rounded-lg bg-gray-100" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}
        </div>
      





       
        <div className="flex space-x-4 mb-5">
          <div className="relative z-0 py-0 w-1/2 group">
            <input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              style={inputStyle}

              onBlur={formik.handleBlur}
              id="password"
              className="block py-2 px-3 w-full text-sm text-gray-300 bg-transparent border-2 border-gray-500 rounded-md focus:ring-[#199ED3] focus:outline-none"
              placeholder={t("Doctros.password")}
            />
            {formik.errors.password && formik.touched.password ?
              <div className="p-4 mb-4 text-sm text-gray-700 rounded-lg bg-gray-100" role="alert">
                <span className="font-medium">{formik.errors.password}</span>
              </div> : ''}
          </div>

          <div className="relative z-0 py-0 w-1/2 group">
            <input
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={inputStyle}

              id="confirmPassword"
              className="block py-2 px-3 w-full text-sm text-gray-300 bg-transparent border-2 border-gray-500 rounded-md focus:ring-[#199ED3] focus:outline-none"
              placeholder={t("Doctros.confirmPassword")}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ?
              <div className="p-4 mb-4 text-sm text-gray-700 rounded-lg bg-gray-100" role="alert">
                <span className="font-medium">{formik.errors.confirmPassword}</span>
              </div> : ''}
          </div>
        </div>
        <div className="mb-5">
          <select
            id="gender"
            value={formik.values.gender}
            style={inputStyle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block text-gray-300  w-full py-2 px-3 text-sm bg-transparent border-2 border-gray-500 rounded-md focus:ring-[#199ED3] focus:outline-none">
            <option value="" disabled>{t("Doctros.gender")}</option>
            <option value="Male">{t("Doctros.male")}</option>
            <option value="Female">{t("Doctros.female")}</option>
          </select>
          {formik.errors.gender && formik.touched.gender && (
            <div className="p-4 text-sm text-gray-700 rounded-lg bg-gray-100" role="alert">
              <span className="font-medium">{formik.errors.gender}</span>
            </div>
          )}
        </div>
        <div className="relative z-0 py-0 w-full mb-5 group">
          <input
            type="tel"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            style={inputStyle}

            onBlur={formik.handleBlur}
            id="phoneNumber"
            className="block py-2 px-3 w-full text-sm text-gray-300 bg-transparent border-2 border-gray-500 rounded-md focus:ring-[#199ED3] focus:outline-none"
            placeholder={t("Doctros.phoneNumber")}
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber ?
            <div className="p-4 mb-4 text-sm text-gray-700 rounded-lg bg-gray-100" role="alert">
              <span className="font-medium">{formik.errors.phoneNumber}</span>
            </div> : ''}
        </div>

        <div className="relative z-0 py-0 w-full mb-5 group">
          <input
            type="text"
            value={formik.values.specializationId}
            onChange={formik.handleChange}
            style={inputStyle}

            onBlur={formik.handleBlur}
            id="specializationId"
            className="block py-2 px-3 w-full text-sm text-gray-300 bg-transparent border-2 border-gray-500 rounded-md focus:ring-[#199ED3] focus:outline-none"
            placeholder={t("Doctros.specializationId")}
          />
          {formik.errors.specializationId && formik.touched.specializationId ?
            <div className="p-4 mb-4 text-sm text-gray-700 rounded-lg bg-gray-100" role="alert">
              <span className="font-medium">{formik.errors.specializationId}</span>
            </div> : ''}
        </div>

        <div className="flex space-x-4 mb-5">
          <div className="relative z-0 py-0 w-full group">


            <select
              id="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2 px-3 text-sm bg-transparent border-2 border-gray-500 rounded-md focus:ring-[#199ED3] focus:outline-none">


              <option value="" disabled>{t("Doctros.city")}</option>
              {city.map(city => <option key={city.id} value={city.name}>{city.name}</option>)}
            </select>
          </div>
          <div className="relative z-0 py-0 w-full group">
            <select
              id="region"
              value={formik.values.region}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2 px-3 text-sm bg-transparent border-2 border-gray-500 rounded-md focus:ring-[#199ED3] focus:outline-none">
              <option value="" disabled>{t("Doctros.region")}</option>
              {region.map(region => <option key={region.id} value={region.name}>{region.name}</option>)}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="flex justify-center items-center text-lg font-medium text-white bg-red-700 hover:bg-red-900 rounded-lg w-full py-1"
        >
          {loading ? <i className="fa-solid fa-rotate-right animate-spin text-white"></i> : t("Doctros.adddoctor")}
        </button>
      </form>
    </div>
  );
}
