import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
// import { DoctorId } from "../../Context/DoctorId";
import "react-toastify/dist/ReactToastify.css";
import Loading from '../Loading'


export default function Users() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { t } = useTranslation("global");

  async function getUsers() {
    setLoading(true);
    try {
      if (!token) {
        setError(`${t("Users.msg1")}`);
        setLoading(false);
        return;
      }

      let response = await axios.get(`http://dr-home.runasp.net/api/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setUsers(response.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(`${t("Users.msg2")}`);
      setLoading(false);
    }
  }

  async function removeUsers(userId) {

    try {
      await axios.delete(
        `http://dr-home.runasp.net/api/auth/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      toast.success(`${t("Users.msg3")}`, { position: "top-center" });
    } catch (error) {
      console.error("Doctor Doesn't Exist:", error);
      toast.error(`${t("Users.msg4")}`, { position: "top-center" });

    }
  }

  useEffect(() => {
    getUsers();
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
              <h1 className="titleuser">{t("Users.Userlist")}</h1>
            </div>
            <div className="h-[500px] overflow-y-scroll">
            <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="">
            <th scope="col" className="w-1/4 pl-4 py-6">{t("Users.DoctorName")}</th>
            <th scope="col" className="w-1/4 pl-4 py-6">{t("Users.role")}</th>
            <th scope="col" className="w-1/4 pl-4 py-6 hidden sm:table-cell">{t("Users.Phone Number")}</th>
            <th scope="col" className="w-1/4 pl-4 py-6 hidden sm:table-cell ">{t("Users.gender")}</th>
            <th scope="col" className=" pr-4  py-6">{t("Users.Action")}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 px-5 py-5">
              <th scope="row" className="w-1/4 pl-4 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.fullName}
              </th>
              <td className="w-1/4 pl-4 py-6">{user.role}</td>
              <td className="w-1/4 pl-4 py-6 hidden sm:table-cell">{user.phoneNumber}</td>
              <td className="w-1/4 pl-4 py-6 hidden sm:table-cell">{user.gender}</td>

              <td className=" pr-4 py-6">
                <button
                  onClick={() => removeUsers(user.id)}
                  className="font-medium mx-1 cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                >
                {t("Users.Remove")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>
     
    </div>
  );
}
