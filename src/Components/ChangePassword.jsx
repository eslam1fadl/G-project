import axios from "axios";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';import { useFormik } from "formik";
import { Helmet } from "react-helmet-async";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [Msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false); 
  
    const { t } = useTranslation("global");
  
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const ValidationSchema = Yup.object().shape({
    NewPassword: Yup.string().required("Password is required"),
    ConfirmNewPassword: Yup.string()
      .oneOf([Yup.ref("NewPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      NewPassword: "",
      ConfirmNewPassword: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await axios.put(`http://dr-home.runasp.net/api/Auth/ChangePassword`, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMsg("Password updated successfully");
      } catch (error) {
        setMsg("Failed to update password");
      } finally {
        setLoading(false);
      }
    },
  });
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100">
      <Helmet>
        <title>{t("ProfileDoctor.Changepassword")}</title>
      </Helmet>
      <div className="container bg-white">
        <div className="flex justify-center items-center mt-20">
          <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-[#199ED3]">
          {t("ProfileDoctor.Changepassword")}
          </h2>
        </div>

        {Msg && (
          <div
            className={`p-4 mb-4 text-sm max-w-md mx-auto ${
              Msg.includes("successfully")
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            } rounded-lg`}
          >
            {Msg}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center p-5">
            <i className="fa-solid fa-rotate-right animate-spin text-[#199ED3] text-2xl"></i>
          </div>
        ) : (
          <form
            className="max-w-md mx-auto shadow-2xl shadow-gray-300 p-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="relative z-0 py-0 w-full mb-5 group">
              <input
                type="password"
                id="NewPassword"
                name="NewPassword"
                value={formik.values.NewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("ProfileDoctor.NewPassword")}
                className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
                />
              {formik.touched.NewPassword && formik.errors.NewPassword && (
                <p className="text-red-600">{formik.errors.NewPassword}</p>
              )}
            </div>
            <div className="relative z-0 py-0 w-full mb-5 group">
              <input
                type="password"
                id="ConfirmNewPassword"
                name="ConfirmNewPassword"
                value={formik.values.ConfirmNewPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder={t("ProfileDoctor.ConfirmNewPassword")}
                className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
                />
              {formik.touched.ConfirmNewPassword && formik.errors.ConfirmNewPassword && (
                <p className="text-red-600">{formik.errors.ConfirmNewPassword}</p>
              )}
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
                onClick={() => navigate("/")}
                className="flex justify-center items-center text-lg font-medium text-black bg-gray-200 hover:bg-gray-300 focus:ring-4 rounded-lg w-[40%] py-1"
              >
               {t("ProfileDoctor.Cancel")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}