import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userToken } from "../Context/UserToken";
import { UserName } from "../Context/UserName";
import { UserRole } from "../Context/UserRole";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import { useTranslation } from 'react-i18next';
import Loading from './Loading'

export default function Register() {
  const { t } = useTranslation("global");

  let { setLogin } = useContext(userToken);
  let { setUser } = useContext(UserName);
  let { setIsRole } = useContext(UserRole);

  let navigate = useNavigate();

  let [errMsg, setErrMsg] = useState(null);
  let [loading, setLoading] = useState(false);
  async function handleRegister(values) {
    setLoading(true);
    try {
      let { data } = await axios.post("http://dr-home.runasp.net/api/Auth/register", values);
      setLoading(false);
      if (data.message === "Register Is Done Successfully") {
        console.log("data",data)
        localStorage.setItem("name", data.user?.name || values.fullName);
        localStorage.setItem("role", data.user?.role || values.role);
        localStorage.setItem("token", data.token);
        setUser(data.name);
        setLogin(data.token);
        setIsRole(data.role);
        navigate("/login");
        window.location.reload();
      }
    } catch (error) {
      setErrMsg(t("re_errors.emailInUse"));
      setLoading(false);
    }
  }

  let ValidationSchema = Yup.object().shape({
    fullName: Yup.string().required(t("re_errors.requiredField")),
    email: Yup.string().required(t("re_validation.emailRequired")).email(t("re_validation.emailInvalid")).matches(/\.com$/, "Email must contain '.com'"),
    phoneNumber: Yup.string().required(t("re_validation.phoneRequired")).matches(/^(01)[0-25][0-9]{8}$/, t("re_errors.invalidPhone")),
    dateOfBirth: Yup.date().required(t("re_validation.dateOfBirthRequired")).max(new Date(), t("re_errors.invalidDate")),
    gender: Yup.string().required(t("re_validation.genderRequired")),
    password: Yup.string().required(t("re_validation.passwordRequired")),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")], t("re_errors.passwordMismatch")).required(t("re_validation.confirmPasswordRequired")),
  });

  let formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: handleRegister,
  });

  useEffect(() => {
    if (errMsg) {
      toast.error(errMsg, { position: "top-center", autoClose: 5000 });
      setErrMsg("");
    }
  }, [errMsg]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="container">
      <Helmet>
        <title>{t("text.Register")}</title>
      </Helmet>

      <ToastContainer />

      {errMsg && (
        <div className="flex justify-center w-full my-4">
          <div className="text-lg text-red-800 bg-red-50 rounded-lg shadow-xl p-4 text-center max-w-md w-full">
            <span className="font-medium">{errMsg}</span>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mt-20">
        <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-[#199ED3]">
          {t("re_text.register")}
        </h2>
      </div>

      <form className="max-w-md mx-auto mb-10 shadow-2xl shadow-gray-300 p-5" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 py-0 w-full mb-5 group">
          <input
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            id="fullName"
            className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-[#199ED3] focus:outline-none"
            placeholder={t("re_placeholders.fullName")}
          />
          {formik.errors.fullName && formik.touched.fullName ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.fullName}</span>
            </div>
            : ''}
        </div>

        <div className="relative z-0 py-0 w-full mb-5 group">
          <input
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="email"
            className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-[#199ED3] focus:outline-none"
            placeholder={t("re_placeholders.email")}
          />
          {formik.errors.email && formik.touched.email ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div> : ''}
        </div>

        <div className="relative z-0 py-0 w-full mb-5 group">
          <select
            id="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-[#199ED3] focus:outline-none"
          >
            <option value="" disabled>{t("re_text.gender")}</option>
            <option value="male">{t("re_text.male")}</option>
            <option value="female">{t("re_text.female")}</option>
          </select>
          {formik.errors.gender && formik.touched.gender ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.gender}</span>
            </div> : ''}
        </div>

        <div className="relative z-0 py-0 w-full mb-5 group">
          <input
            type="tel"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="phoneNumber"
            className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-[#199ED3] focus:outline-none"
            placeholder={t("re_placeholders.phoneNumber")}
          />
          {formik.errors.phoneNumber && formik.touched.phoneNumber ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.phoneNumber}</span>
            </div> : ''}
        </div>

        <div className="flex space-x-4 mb-5">
          <div className="relative z-0 py-0 w-1/2 group">
            <input
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="password"
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-[#199ED3] focus:outline-none"
              placeholder={t("re_placeholders.password")}
            />
            {formik.errors.password && formik.touched.password ?
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">{formik.errors.password}</span>
              </div> : ''}
          </div>

          <div className="relative z-0 py-0 w-1/2 group">
            <input
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="confirmPassword"
              className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-[#199ED3] focus:outline-none"
              placeholder={t("re_placeholders.confirmPassword")}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ?
              <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">{formik.errors.confirmPassword}</span>
              </div> : ''}
          </div>
        </div>

        <div className="relative z-0 py-0 w-full mb-5 group">
          <label htmlFor="dateOfBirth" className="block text-sm text-gray-700 mb-1">
            {t("re_text.dateOfBirth")}
          </label>
          <input
            type="date"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="dateOfBirth"
            className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-[#199ED3] focus:outline-none"
          />
          {formik.errors.dateOfBirth && formik.touched.dateOfBirth ?
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
              <span className="font-medium">{formik.errors.dateOfBirth}</span>
            </div> : ''}
        </div>

        <button
          type="submit"
          className="flex justify-center items-center text-lg font-medium text-white bg-red-500 hover:bg-red-700 focus:ring-4 rounded-lg w-full py-1"
        >
          {loading ? (
            <i className="fa-solid fa-rotate-right animate-spin text-white"></i>
          ) : (
            t("re_buttons.register")
          )}
        </button>
      </form>
    </div>
  );
}
