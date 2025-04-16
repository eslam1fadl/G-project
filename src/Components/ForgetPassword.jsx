import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import Loading from './Loading'


export default function ForgetPassword() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });

    const handleReset = async (values) => {
        setMessage("");
        setError("");
        setLoading(true);
        try {
            const { data } = await axios.get("http://dr-home.runasp.net/api/auth/forgetpassword", {
                email: values.email
            });
                navigate("/ChangePassword");
        }
        catch (error) {
            setError("Email not found");
        }
    };

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema,
        onSubmit: handleReset,
    });

    if (loading) {
        return <Loading />;
      }
    return (
        <div className="container">
            <Helmet>
                <title>Forget password</title>
            </Helmet>
            < div className="flex justify-center items-center mt-20">
                <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-[#199ED3]">
                    Forget password
                </h2>
            </div>
            <form onSubmit={formik.handleSubmit}
                className="max-w-md w-full mx-auto  shadow-2xl shadow-gray-300 p-6 flex flex-col gap-4">

                <div className="relative z-0 py-0 w-full group">

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        className="black px-2 py-3 w-full text-sm text-gray-700 bg-transparent border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-[#199ED3] focus:outline-none "
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {/* {formik.touched.email && formik.errors.email && (
                        <div className="text-red-500 text-sm">{formik.errors.email}</div>
                    )} */}

                    {message && <div className="text-green-500 text-sm mt-2">{message}</div>}
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                </div>
                <button type="submit"
                    className="flex justify-center items-center font-medium text-lg text-white bg-red-500 hover:bg-red-700 focus:ring-4   rounded-lg w-full py-1"
                    disabled={loading}>
                    {loading ? "Sending..." : " Send the code"}
                </button>

            </form>
        </div>
    );
}
