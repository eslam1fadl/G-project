import React from 'react';
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Schedule() {
  const { t } = useTranslation("global");

  const token = localStorage.getItem("token");
  const clinicId = localStorage.getItem('clinicId');
  const doctorId = localStorage.getItem("id");

  console.log("doctorId:", doctorId);
  console.log("clinicId:", clinicId);

  async function handleAppointments(values) {
    console.log("Form values:", values);

    if (!clinicId || !doctorId || !token) {
      toast.dismiss();
      toast.error("Missing clinic ID, doctor ID, or token", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const formatTime = (time) => (time.length === 5 ? `${time}:00` : time);

    const payload = {
      workDay: values.workDay,
      startTime: formatTime(values.startTime),
      endTime: formatTime(values.endTime),
      AppointmentDurationInMiniutes: values.appointmentDurationInMinutes ? parseInt(values.appointmentDurationInMinutes, 10) : null,
      fee: values.fee ? parseFloat(values.fee) : 0,
    };

    try {
      const { data } = await axios.post(
        `http://dr-home.runasp.net/api/Doctors/${doctorId}/Clinics/${clinicId}/Schedules`,
        JSON.stringify(payload),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", data);

      toast.dismiss();
      toast.success(t("schedule.msg1"), {
        position: "top-center",
        autoClose: 3000,
      });

    } catch (error) {
      console.error("API Error:", error);

      toast.dismiss();
      const errorMessages = error.response?.data?.errors;

      if (error.response?.status === 409) {
        toast.error(t("schedule.msg3"), {
          position: "top-center",
          autoClose: 3000,
        });
      } else if (errorMessages) {
        const firstErrorKey = Object.keys(errorMessages)[0];
        toast.error(errorMessages[firstErrorKey][0], {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        toast.error(t("schedule.msg2"), {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      workDay: '',
      startTime: '',
      endTime: '',
      appointmentDurationInMinutes: '',
      fee: '',
    },
    validationSchema: Yup.object({
      workDay: Yup.date()
        .min(new Date(), `${t("schedule.date")}`)
        .required(`${t("schedule.required")}`),
      startTime: Yup.string().required(`${t("schedule.required")}`),
      endTime: Yup.string().required(`${t("schedule.required")}`),
      appointmentDurationInMinutes: Yup.number()
        .min(5,`${t("schedule.dur")}`)
        .required(`${t("schedule.required")}`),
      fee: Yup.number()
        .min(0, `${t("schedule.feeval")}`)
        .required(`${t("schedule.required")}`),
    }),
    onSubmit: handleAppointments,
  });

  return (
    <div className="mt-40">
      <div className="flex justify-center items-center mt-4 lg:mt-10 mb-4">
        <h2 className="clinic-title log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-4xl bg-[#58916e]">
          {t("schedule.title")}
        </h2>
      </div>

      <ToastContainer />

      <form onSubmit={formik.handleSubmit} className="w-full max-w-4xl mx-auto shadow-2xl shadow-gray-300 p-4 md:p-5 rounded-lg bg-white">
        <div className="flex flex-wrap -mx-2 mb-5">
          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <label htmlFor="workDay" className="block text-sm text-gray-700 mb-1">
              {t("schedule.workDay")}
            </label>
            <input
              type="date"
              id="workDay"
              name="workDay"
              value={formik.values.workDay}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2 px-3 text-sm border-2 border-gray-300 rounded-md"
            />
            {formik.touched.workDay && formik.errors.workDay && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.workDay}</div>
            )}
          </div>

          <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
            <label htmlFor="startTime" className="block text-sm text-gray-700 mb-1">
              {t("schedule.startTime")}
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2 px-3 text-sm border-2 border-gray-300 rounded-md"
            />
            {formik.touched.startTime && formik.errors.startTime && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.startTime}</div>
            )}
          </div>

          <div className="w-full md:w-1/3 px-2">
            <label htmlFor="endTime" className="block text-sm text-gray-700 mb-1">
              {t("schedule.endTime")}
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formik.values.endTime}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2 px-3 text-sm border-2 border-gray-300 rounded-md"
            />
            {formik.touched.endTime && formik.errors.endTime && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.endTime}</div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap -mx-2 mb-5">
          <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
            <label htmlFor="appointmentDurationInMinutes" className="block text-sm text-gray-700 mb-1">
              {t("schedule.appointmentDurationInMinutes")}
            </label>
            <input
              type="number"
              min="5"
              step="1"
              id="appointmentDurationInMinutes"
              name="appointmentDurationInMinutes"
              value={formik.values.appointmentDurationInMinutes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2 px-3 text-sm border-2 border-gray-300 rounded-md"
            />
            {formik.touched.appointmentDurationInMinutes && formik.errors.appointmentDurationInMinutes && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.appointmentDurationInMinutes}</div>
            )}
          </div>

          <div className="w-full md:w-1/2 px-2">
            <label htmlFor="fee" className="block text-sm text-gray-700 mb-1">
              {t("schedule.fee")}
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              id="fee"
              name="fee"
              value={formik.values.fee}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full py-2 px-3 text-sm border-2 border-gray-300 rounded-md"
            />
            {formik.touched.fee && formik.errors.fee && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.fee}</div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#199ED3] text-white px-6 py-2 rounded-lg hover:bg-[#147aa1] transition-all duration-300"
          >
            {t("schedule.save")}
          </button>
        </div>
      </form>
    </div>
  );
}
