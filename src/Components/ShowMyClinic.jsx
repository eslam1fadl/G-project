import React, { useContext, useState, useEffect } from 'react'
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { DoctorId } from "../Context/DoctorId";
import Loading from './Loading'

export default function ShowMyClinic() {
    // let { isDoctorId } = useContext(DoctorId);
    let clinicid = localStorage.getItem('id');
    const Navigate = useNavigate();
    const { t } = useTranslation("global");
    const [clinic, setClinic] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getMyClinic(clinicId) {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            let { data } = await axios.get(`http://dr-home.runasp.net/api/Clinics/${clinicId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              });
            console.log(data);
            setClinic(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    
    async function removeClinic(clinicId) {
        const token = localStorage.getItem("token");
        try {
          await axios.delete(
            `http://dr-home.runasp.net/api/Clinics/${clinicId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          setClinic((prevClinic) => prevClinic.filter((Clinic) => Clinic.id !== clinicId));
          toast.success(`${t("Medicine has been deleted")}`, { position: "top-center" });
        } catch (error) {
          console.error("clinic Doesn't Exist:", error);
          toast.error(`${t("Not deleted")}`, { position: "top-center" });
    
        }
      }

    useEffect(() => {
        getMyClinic(clinicid);
    }, []);

    if (loading) return <Loading />;

    return (
        <div>
            <ToastContainer/>
            {clinic.map((clinic) => (
                <div key={clinic.id} className="max-w-xl mx-auto my-30 bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="bg-[#199ED3] text-white p-4 text-center">
                        <h1 className="text-2xl py-2 font-bold">{clinic.clinicName}</h1>
                        <p className="text-sm">هذه بيانات عيادتك التي تظهر للمرضى</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            <div className="flex items-start pb-4 border-b border-gray-200">
                                <p className="text-2xl text-[#199ED3] ml-4"><i class="fa-solid fa-location-dot"></i></p>
                                <div className="mr-4">
                                    <h3 className="font-bold text-[#199ED3] px-3">المحافظه</h3>
                                    <p className="text-gray-700  px-3">{clinic.city}</p>
                                </div>
                               
                            </div>
                            <div className="flex items-start pb-4 border-b border-gray-200">
                                <p className="text-2xl text-[#199ED3] ml-4"><i class="fa-solid fa-location-crosshairs"></i></p>
                                <div>
                                    <h3 className="font-bold text-[#199ED3] px-3">المنطقه</h3>
                                    <p className="text-gray-700 px-3">{clinic.region}</p>
                                </div>
                               
                            </div>
                            
                            <div className="flex items-start pb-4 border-b border-gray-200">
                                <p className="text-2xl text-[#199ED3] ml-4"><i class="fa-solid fa-phone"></i></p>
                                <div>
                                    <h3 className="font-bold text-[#199ED3] px-3">رقم الهاتف</h3>
                                    <p className="text-gray-700">
                                        <Link to={`tel:${clinic.phoneNumber}`} className="px-3 text-gray-700 hover:underline">
                                            {clinic.phoneNumber}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <div>
                                <button onClick={()=>removeClinic(clinic.id)} className="font-medium mx-1 my-4 px-8 rounded-xl py-2 cursor-pointer bg-red-700 text-white hover:bg-red-900 ">
                    {t("Doctros.Remove")}
                  </button>
                  <button onClick={() => {
              Navigate("/UpdateClinic");
            }} className="font-medium mx-1 px-8 rounded-xl my-4 py-2 cursor-pointer bg-[#199ED3] text-white hover:bg-[#199ed3d6] ">
                    تعديل
                  </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
