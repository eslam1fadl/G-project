import axios from "axios";
import * as Yup from "yup";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { DoctorId } from "../Context/DoctorId";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import img3 from "../assets/images/istockphoto-1337144146-612x612 (1).jpg"
import Loading from './Loading'

export default function ProfileDoctor() {
  const navigate = useNavigate();
  const [Msg, setMsg] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);
  const [image, setImage] = useState(null);
  let [city, setCity] = useState([]);
let [region, setRegion] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  let { isDoctorId } = useContext(DoctorId);

  const { t } = useTranslation("global");

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
    try {
      let response = await axios.get('http://dr-home.runasp.net/api/Cities')
      setCity(response.data.data || []);

    }
    catch (error) {
      console.log(error);
    }

  }

  async function getregion() {
    try {
      let response = await axios.get('http://dr-home.runasp.net/api/Regions')
      setRegion(response.data.data || []);

    }
    catch (error) {
      console.log(error);
    }

  }

  const ValidationSchema = Yup.object().shape({
    fullName: Yup.string().required(t("re_validation.fullName")),
    email: Yup.string()
    .email(t("re_validation.emailInvalid"))
    .matches(/\.com$/, t("re_validation.com"))
      .required(t("re_validation.emailRequired")),
    phoneNumber: Yup.string()
    .required(t("re_validation.phoneRequired"))
    .matches(/^(01)[0-25][0-9]{8}$/, t("re_errors.invalidPhone")),
    dateOfBirth: Yup.date()
      .max(new Date(), "re_validation.date")
      .nullable(),
    gender: Yup.string().required(t("re_validation.genderRequired")),
     city: Yup.string().required(t("re_validation.cityRequired")),
        region: Yup.string().required(t("re_validation.regionRequired")),
    summary: Yup.string().nullable(),
    specialization: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      city: "",
      region: "",
      summary: "",
      specialization: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      try {
        setProfileLoading(true);

        const formData = new FormData();
        for (const key in values) {
          formData.append(key, values[key]);
        }

        formData.append("doctorId", isDoctorId || id);

        console.log("Submitting form values:", values);

        const response = await axios.put("http://dr-home.runasp.net/api/Doctors", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
        });

        toast.success(`${t("ProfileDoctor.msg1")}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        localStorage.setItem("userData", JSON.stringify(values));
        localStorage.setItem("name", values.fullName);

      } catch (error) {
        console.error("Full error details:", error);
        const errorMessage = error.response?.data?.message
          || error.response?.data?.errors || `${t("ProfileDoctor.msg2")}`;

        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setProfileLoading(false);
      }
    },
  });

  async function handleProfile(doctorId) {
    try {
      setProfileLoading(true);
      const response = await axios.get(`http://dr-home.runasp.net/api/Doctors/${doctorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data) {
        const userData = response.data.data;

        const formattedDate = userData.dateOfBirth
          ? new Date(userData.dateOfBirth).toISOString().split("T")[0]
          : "";

        formik.setValues({
          fullName: userData.fullName || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          dateOfBirth: formattedDate,
          gender: userData.gender || "",
          city: userData.city || "",
          region: userData.region || "",
          summary: userData.summary || "",
          specialization: userData.specialization || "",
        });

        if (userData.profilePic_Path) {
          setImageUrl(userData.profilePic_Path);
        }

        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("name", userData.fullName);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMsg(`${t("ProfileDoctor.msg3")}`);
    } finally {
      setProfileLoading(false);
    }
  }

  async function UpdateDoctor(doctorId, file) {
    try {
      setProfileLoading(true)
      const formData = new FormData();
      formData.append('DoctorId', doctorId || id);
      formData.append('PersonalPic', file);

      const response = await axios.put(
        'http://dr-home.runasp.net/api/Doctors/updatePicture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data && response.data.data.profilePic_Path) {
        const profilePicUrl = response.data.data.profilePic_Path;
        setImageUrl(profilePicUrl);
        localStorage.setItem("doctorProfileImageUrl", profilePicUrl);

        toast.success(`${t("ProfileDoctor.msg4")}`, {
          position: "top-center",
          autoClose: 3000,
        });
      }
      setProfileLoading(false)

      return response.data;
    } catch (error) {
      console.error('Error updating picture:', error.response?.data || error.message);
      toast.error(`${t("ProfileDoctor.msg5")}`, {
        position: "top-center",
        autoClose: 3000,
      });
      throw error;
    }
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(objectUrl);
      try {await UpdateDoctor(isDoctorId || id, file);}
      
      catch (error) {
        setProfileLoading(false)
        setImage(null);
      }
    }
  };
  useEffect(() => {
    getcity();
  }, []);
  useEffect(() => {
    getregion();
  }, []);

  useEffect(() => {
    const storedImageUrl = localStorage.getItem("doctorProfileImageUrl");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }

    const doctorId = isDoctorId || localStorage.getItem("id");
    if (doctorId) {
      handleProfile(doctorId);
    }
  }, [isDoctorId]);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);
  if (profileLoading) {
    return <Loading />;
  }
  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>{t("ProfileDoctor.ProfileDoctor")}</title>
      </Helmet>
      <div className="container bg-white py-4 flex flex-col items-center lg:flex-row lg:items-start">
        <div className="profile-image-container w-full mt-5 max-w-xs mx-auto md:mx-4 lg:mx-8 mb-6 lg:mb-0">
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto rounded-full overflow-hidden border-2 border-gray-300">
            {image ? (
              <img
                src={image}
                alt="Doctor"
                className="w-full h-full object-cover rounded-full"
              />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Doctor"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={img3}
                  alt="Doctor"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              title="Click to change profile picture"
            />
            <button
              onClick={() => document.querySelector('input[type="file"]').click()}
              className="absolute cursor-pointer bottom-0 left-1/2 transform -translate-x-1/2 bg-[#199ED3] text-white py-2 px-4 rounded-2xl mt-2 w-max text-sm sm:text-base"
            >
              {t("ProfileDoctor.ChangeImage")}
            </button>
          </div>
          <div className="flex justify-center my-5">
            <button onClick={() => navigate('/ShowMyClinic')} className="w-[48%] mx-2 py-3 rounded-xl text-white clinic-btn cursor-pointer">{t("ProfileDoctor.ShowMyclinic")}</button>
            <button onClick={() => navigate('/Addclinic')} className="w-[48%] mx-2  py-3 rounded-xl text-white clinic-btn2 cursor-pointer">{t("ProfileDoctor.Myclinic")}</button>

            {/* <button className="px-5 py-5 text-white bg-[#199ED3]">{t("ProfileDoctor.Myappointments")}</button> */}
          </div>
        </div>


        <div className="form-container w-full lg:flex-1 max-w-lg mx-auto">
          <div className="flex justify-center items-center mt-4 lg:mt-10 mb-4">
            <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-[#199ED3]">
              {t("ProfileDoctor.UpdateDoctor")}
            </h2>
          </div>
          <ToastContainer />
          <form className="w-full max-w-md mx-auto shadow-2xl shadow-gray-300 p-4 md:p-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="relative z-0 py-0 w-full mb-3 group">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("re_placeholders.fullName")}
                className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
              />
              {formik.touched.fullName && formik.errors.fullName && (
                <p className="text-red-600">{formik.errors.fullName}</p>
              )}
            </div>



            <div className="relative z-0 py-0 w-full mb-3 group">
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("ProfileDoctor.email")}
                className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full mb-3">
              <div className="relative z-0 py-0 w-full mb-3 sm:mb-0 group">
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t("ProfileDoctor.phoneNumber")}
                  className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <p className="text-red-600">{formik.errors.phoneNumber}</p>
                )}
              </div>

              <div className="relative z-0 py-0 w-full group">
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
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full mb-3">
              <div className="relative z-0 py-0 w-full mb-3 sm:mb-0 group">
                <select
                  id="region"
                  name="region"
                  value={formik.values.region}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
                >
                  <option value="">{t("Myclinic.SelectRegion")}</option>
                  {region.map(region => <option key={region.id} value={region.name}>{region.name}</option>)}

                </select>
                {formik.touched.region && formik.errors.region && (
                  <p className="text-red-600">{formik.errors.region}</p>
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
                  <option value="">{t("ProfileDoctor.SelectCity")}</option>
                  {city.map(city => <option key={city.id} value={city.name}>{city.name}</option>)}

                </select>
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-600">{formik.errors.city}</p>
                )}
              </div>
            </div>
            <div className="relative z-0 py-0 w-full mb-3 group">
              <input
                type="text"
                id="summary"
                name="summary"
                value={formik.values.summary}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("ProfileDoctor.summary")}

                className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
              />
              {formik.touched.summary && formik.errors.summary && (
                <p className="text-red-600">{formik.errors.summary}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 w-full mb-3">
              <div className="relative z-0 py-0 w-full mb-3 sm:mb-0 group">
                <select
                  id="gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
                >
                  <option value="">{t("ProfileDoctor.SelectGender")}</option>
                  <option value="male">{t("ProfileDoctor.male")}</option>
                  <option value="female">{t("ProfileDoctor.female")}</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <p className="text-red-600">{formik.errors.gender}</p>
                )}
              </div>

              <div className="relative z-0 py-0 w-full group">
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  value={formik.values.specialization}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={t("ProfileDoctor.Specialization")}

                  className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
                />
                {formik.touched.specialization && formik.errors.specialization && (
                  <p className="text-red-600">{formik.errors.specialization}</p>
                )}
              </div>
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
                  `${t("ProfileDoctor.Save")}`
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex justify-center items-center text-lg font-medium text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 rounded-lg w-[40%] py-1"
              >
                {t("ProfileDoctor.Cancel")}
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
            {changePasswordLoading ? <i className="fa-solid fa-rotate-right animate-spin text-white"></i> : `${t("ProfileDoctor.Changepassword")}`}
          </button>
        </div>



      </div>


    </div>
  );
}