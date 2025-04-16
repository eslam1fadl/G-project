import axios from "axios";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";
import Loading from './Loading'
export default function ProfileUser() {
  const navigate = useNavigate();
  const [Msg, setMsg] = useState(null);
  let [city, setCity] = useState([]);
  let [region, setRegion] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const token = localStorage.getItem("token");
// const [cities] = useState([
//     "القاهرة", "الجيزة", "الإسكندرية", "الشرقية", "الدقهلية", "البحيرة",
//     "القليوبية", "المنيا", "الغربية", "سوهاج", "أسيوط", "المنوفية",
//     "الفيوم", "قنا", "بني سويف", "كفر الشيخ", "أسوان", "دمياط",
//     "الإسماعيلية", "الأقصر", "بورسعيد", "السويس", "مطروح",
//     "شمال سيناء", "البحر الأحمر", "الوادي الجديد", "جنوب سيناء"
//   ]);
  
//   const [regions] = useState([
//     "العدوه", " مغاغه", "مطاي", "سمالوط", "بني مزار", 
//     "الزمالك", "المنصورة", "ديرمواس", "ابو القرقاص", , "ملوي", 
//     "المحلة الكبرى", "جرجا", "البداري", "شبين الكوم", "الزقازيق", 
//     "نجع حمادي", "الفشن","دمياط", 
//     , "بورفؤاد", 
//     "رفح", "الغردقة", "الخارجة", "شرم الشيخ"
//   ]);

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
  const ValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("This field is required"),
    email: Yup.string()
      .required("Email is required")
      .email("Email not valid")
      .matches(/\.com$/, "Email must contain '.com'"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^(01)[0-25][0-9]{8}$/, "Invalid phone number"),
    dateOfBirth: Yup.date()
      .required("Date of birth is required")
      .max(new Date(), "Invalid date of birth"),
    gender: Yup.string().required("Gender is required"),
    city: Yup.string().required("City is required"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      city: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      try {
        setProfileLoading(true);
        await axios.put("http://dr-home.runasp.net/api/auth/UpdateProfile", values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMsg("Profile updated successfully");
        localStorage.setItem("userData", JSON.stringify(values));
        localStorage.setItem("name", values.fullName);
       
      }
       catch (error) {
        console.error("Error updating profile:", error);
        setMsg("Failed to update profile data");
      } finally {
        setProfileLoading(false);
      }
    },
  });

  async function handleProfile() {
    try {
      setProfileLoading(true);
      const response = await axios.get("http://dr-home.runasp.net/api/auth/Profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        const userData = response.data.data;
        console.log("User data to be set:", userData);

        const formattedDate = userData.dateOfBirth
          ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
          : "";

        formik.setValues({
          fullName: userData.fullName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          dateOfBirth: formattedDate,
          gender: userData.gender || "",
          city: userData.region || userData.city || "",
        });
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("name", userData.fullName);
       
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMsg("Failed to fetch profile data");
    } finally {
      setProfileLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      handleProfile();
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getcity();
    }, []);
    useEffect(() => {
      getregion();
      }, []);

  if (profileLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>ProfileUser</title>
      </Helmet>
      <div className="container bg-white">
        <div className="flex justify-center items-center mt-20">
          <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-[#199ED3]">
            Update profile
          </h2>
        </div>

        {Msg && (
          <div
            className={`p-4 mb-4 text-sm max-w-md mx-auto ${Msg.includes("successfully")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
              } rounded-lg`}
          >
            {Msg}
          </div>
        )}

        <form
          className="max-w-md mx-auto shadow-2xl shadow-gray-300 p-5"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative z-0 py-0 w-full mb-5 group">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Full Name"
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="text-red-600">{formik.errors.fullName}</p>
            )}
          </div>

          <div className="relative z-0 py-0 w-full mb-5 group">
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Email"
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-600">{formik.errors.email}</p>
            )}
          </div>

          <div className="relative z-0 py-0 w-full mb-5 group">
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Phone Number"
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <p className="text-red-600">{formik.errors.phoneNumber}</p>
            )}
          </div>

          <div className="relative z-0 py-0 w-full mb-5 group">
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            />
            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
              <p className="text-red-600">{formik.errors.dateOfBirth}</p>
            )}
          </div>

          <div className="relative z-0 py-0 w-full mb-5 group">
            <select
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-600">{formik.errors.gender}</p>
            )}
          </div>
          

          <div className="relative z-0 py-0 w-full mb-5 group">
            <select
              id="city"
              name="city"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
            >
              <option value="">Choose the city</option>
              {city.map(city => <option key={city.id} value={city.name}>{city.name}</option>)}

            </select>
            {formik.touched.city && formik.errors.city && (
              <p className="text-red-600">{formik.errors.city}</p>
            )}
          </div>

          <div className="flex justify-between mt-2">
            <button
              type="submit"
              disabled={profileLoading}
              className="flex justify-center items-center text-lg font-medium text-white bg-red-600 hover:bg-red-800 focus:ring-4 rounded-lg w-[40%] py-1"
            >
              {profileLoading ? (
                <i className="fa-solid fa-rotate-right animate-spin text-white"></i>
              ) : (
                "Save"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex justify-center items-center text-lg font-medium text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 rounded-lg w-[40%] py-1"
            >
              Cancel
            </button>
          </div>
        </form>

        <button
          type="button"
          onClick={() => {
            navigate("/changepassword");
          }}
          disabled={changePasswordLoading}
          className="flex justify-center items-center mx-auto mt-5 max-w-md text-lg py-1 text-white bg-[#087fae] hover:bg-[#056789] focus:ring-4 rounded-lg w-full"
        >
          {changePasswordLoading ? <i className="fa-solid fa-rotate-right animate-spin text-white"></i> : "Change password"}
        </button>
      </div>
    </div>
  );
}
