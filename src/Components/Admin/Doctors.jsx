import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
// import { DoctorId } from "../../Context/DoctorId";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../Loading'


export default function Doctors() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { t } = useTranslation("global");

  async function getDoctors() {
    setLoading(true);
    try {
      if (!token) {
        setError(`${t("Doctros.msg1")}`);
        setLoading(false);
        return;
      }

      let response = await axios.get(`http://dr-home.runasp.net/api/Doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setDoctors(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      // setError("Failed to fetch doctors");
      setError(`${t("Doctros.msg2")}`);
      setLoading(false);
    }
  }

  async function removeDoctor(doctorId) {
    if (!window.confirm("Are you sure you want to remove this doctor?")) return;

    try {
      await axios.delete(
        `http://dr-home.runasp.net/api/Doctors?DoctorId=${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setDoctors((prevDoctors) => prevDoctors.filter((doctor) => doctor.id !== doctorId));
      toast.success(`${t("Doctros.msg3")}`, { position: "top-center" });
    } catch (error) {
      console.error("Doctor Doesn't Exist:", error);
      toast.error(`${t("Doctros.msg4")}`, { position: "top-center" });

    }
  }

  useEffect(() => {
    getDoctors();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, { position: "top-center", autoClose: 5000 });
      setError("");
    }
    if (msg) {
      toast.success(msg, { position: "top-center", autoClose: 5000 });
      setMsg("");
    }
  }, [error, msg]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-20 w-full lg:w-[60%] ml-0 lg:ml-90">
      <ToastContainer />

      {error && (
        <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-red-600">
          {error}
        </h2>
      )}
      {msg && (
        <h2 className="log-reg text-xl text-center font-bold text-white py-1.5 w-full max-w-md bg-green-600">
          {msg}
        </h2>
      )}

      <div className="flex justify-center items-center text-[#199ED3] my-5">
        <h1 className="titleuser">{t("Doctros.Userlist")}</h1>
      </div>
      <div className="h-[350px] overflow-y-scroll">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="w-1/4 pl-4 py-6">{t("Doctros.Doctor's Name")}</th>
              <th scope="col" className="w-1/4 pl-4 py-6">{t("Doctros.Phone Number")}</th>
              <th scope="col" className="w-1/4 pl-4 py-6 hidden sm:table-cell">{t("Doctros.gender")}</th>
              <th scope="col" className="w-1/4 pl-4 py-6 hidden sm:table-cell">{t("Doctros.region")}</th>
              <th scope="col" className="w-1/4 pl-4 py-6">{t("Doctros.Action")}</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 px-5 py-5"
              >
                <th
                  scope="row"
                  className="w-1/4 pl-4 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {doctor.fullName}
                </th>
                <td className="w-1/4 pl-4 py-6">{doctor.phoneNumber}</td>
                <td className="w-1/4 pl-4 py-6 hidden sm:table-cell">{doctor.gender}</td>
                <td className="w-1/4 pl-4 py-6 hidden sm:table-cell">{doctor.region}</td>

                <td className="w-1/4 pl-4 py-6">
                  <button
                    onClick={() => removeDoctor(doctor.id)}
                    className="font-medium mx-1 cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                  >
                    {t("Doctros.Remove")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate("/admin/AddDoctors")}
        className="bg-[#199ED3] hover:bg-[#199ed3c0] my-5 mx-2 px-4 py-2 rounded-xl font-medium cursor-pointer text-white"
      >
        {t("Doctros.adddoctor")}
      </button>
      <button
        onClick={() => navigate("/admin/Addcity")}
        className="bg-red-600 hover:bg-red-700 my-5 mx-2 px-4 py-2 rounded-xl font-medium cursor-pointer text-white"
      >
        {t("Doctros.addcity")}
      </button>

    </div>
  );
}
