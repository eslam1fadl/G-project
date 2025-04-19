import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { userToken } from '../Context/UserToken';
import { DoctorId } from '../Context/DoctorId';
import { toast, ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { UserRole } from "../Context/UserRole";
import Loading from './Loading'

export default function Login() {
    const { t } = useTranslation("global");
    let { setLogin } = useContext(userToken);
    let { setIsRole } = useContext(UserRole);
    let { setDoctorId } = useContext(DoctorId);
    let navigate = useNavigate();

    let [errMsg, setErrMsg] = useState('');
    let [loginLoading, setLoginLoading] = useState(false);
    let [forgetPasswordLoading, setForgetPasswordLoading] = useState(false);

    async function handleLogin(values) {
        setLoginLoading(true);
        try {
            let { data } = await axios.post('http://dr-home.runasp.net/api/auth/login', values);
            if (data.message === 'User Signed In Successfully') {
                setLogin(data.token);
                localStorage.setItem('token', data.token);
                setDoctorId(data.userId);
                localStorage.setItem('id', data.userId);
                setIsRole(data.role);
                localStorage.setItem('role', data.role);
                navigate('/');
                window.location.reload()
            
            }
        } catch (error) {
            setErrMsg(t("errors.loginFailed"));
        } finally {
            setLoginLoading(false);
        }
    }

    let ValidationSchema = Yup.object().shape({
        email: Yup.string().required(t("validation.emailRequired")).email(t("validation.emailInvalid")),
        password: Yup.string().required(t("validation.passwordRequired")),
    });

    let formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: ValidationSchema,
        onSubmit: handleLogin,
    });

    useEffect(() => {
        if (errMsg) {
            toast.error(errMsg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            setErrMsg("");
        }
    }, [errMsg]);
    if (loginLoading) {
        return <Loading />;
      }
    return (
        <div className="container md:p-16 p-4">
            <Helmet>
                <title>{t("text.Login")}</title>
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
                    {t("text_login.Login")}
                </h2>
            </div>

            <form className="max-w-md w-full mx-auto shadow-2xl shadow-gray-300 p-6 flex flex-col gap-4" onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full group">
                    <input
                        type="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="email"
                        className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
                        placeholder={t("placeholders.email")}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="p-2 text-sm text-red-800 rounded-md bg-red-50">
                            {formik.errors.email}
                        </div>
                    )}
                </div>

                <div className="relative z-0 w-full group">
                    <input
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="password"
                        className="block py-2 px-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none"
                        placeholder={t("placeholders.password")}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className="p-2 text-sm text-red-800 rounded-md bg-red-50">
                            {formik.errors.password}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="flex justify-center items-center font-medium text-lg text-white bg-red-500 hover:bg-red-700 focus:ring-4 rounded-lg w-full py-1"
                    disabled={loginLoading}
                >
                    {loginLoading ? (
                        <i className="fa-solid fa-rotate-right animate-spin text-white"></i>
                    ) : (
                        t("buttons.login")
                    )}
                </button>
            </form>

            <button
                type="button"
                onClick={() => {
                    setForgetPasswordLoading(true);
                    navigate("/ForgetPassword");
                }}
                disabled={forgetPasswordLoading}
                className="flex justify-center items-center mx-auto mt-5 max-w-md text-lg py-1 text-white bg-[#087fae] hover:bg-[#056789] focus:ring-4 rounded-lg w-full"
            >
                {forgetPasswordLoading ? (
                    <i className="fa-solid fa-rotate-right animate-spin text-white"></i>
                ) : (
                    t("buttons.forgetPassword")
                )}
            </button>
        </div>
    );
}
