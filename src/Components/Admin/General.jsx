import { useTranslation } from 'react-i18next';
import Charts from './Charts';
import React, { useState } from 'react';
import Loading from '../Loading'

export default function General() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("global");
  
  return (
    <div className='flex flex-col items-center w-full  ml-0 overflow-x-hidden py-5 lg:w-[calc(100%-65px)] '>
      <h1 className='my-20 lg:ml-20 ml-0 general-page md:text-4xl lg:text-5xl text-2xl'>{t("Genaral.title")}</h1>

      <div className="w-full lg:w-[90%] ml-0 lg:ml-90">
        <Charts />
      </div>

      <div className="relative flex lg:flex-row flex-col gap-x-5  lg:ml-10 ml-0  font-normal text-lg lg:text-xl my-20  md:w-11/12 lg:w-4/5 ">
        <div className="lg:w-[80%] w-full ml-0 lg:ml-30 h-[400px] lg:my-0   overflow-y-scroll overflow-x-scroll ">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700  dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-2">
                  {t("Genaral.DoctorName")}
                </th>
                <th scope="col" className="px-2 py-2">
                  {t("Genaral.Specialty")}
                </th>
                <th scope="col" className="px-2 py-2">
                  {t("Genaral.HospitalClinic")}
                </th>
                <th scope="col" className="px-2 py-2">
                  {t("Genaral.PhoneNumber")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                  <img src="doctor2.jpg" alt="Dr. Mariam Hassan" className="w-10 h-10 rounded-full mr-3" />
                  Dr. Mariam Hassan
                </th>
                <td className="px-2 py-2">
                  Pediatrics
                </td>
                <td className="px-2 py-2">
                  Specialized Children's Clinic
                </td>
                <td className="px-2 py-2">
                  01123456789
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                  <img src="doctor2.jpg" alt="Dr. Mariam Hassan" className="w-10 h-10 rounded-full mr-3" />
                  Dr. Mariam Hassan
                </th>
                <td className="px-2 py-2">
                  Pediatrics
                </td>
                <td className="px-2 py-2">
                  Specialized Children's Clinic
                </td>
                <td className="px-2 py-2">
                  01123456789
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                  <img src="doctor2.jpg" alt="Dr. Mariam Hassan" className="w-10 h-10 rounded-full mr-3" />
                  Dr. Mariam Hassan
                </th>
                <td className="px-2 py-2">
                  Pediatrics
                </td>
                <td className="px-2 py-2">
                  Specialized Children's Clinic
                </td>
                <td className="px-2 py-2">
                  01123456789
                </td>
              </tr>

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                  <img src="doctor2.jpg" alt="Dr. Mariam Hassan" className="w-10 h-10 rounded-full mr-3" />
                  Dr. Mariam Hassan
                </th>
                <td className="px-2 py-2">
                  Pediatrics
                </td>
                <td className="px-2 py-2">
                  Specialized Children's Clinic
                </td>
                <td className="px-2 py-2">
                  01123456789
                </td>
              </tr>


              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                  <img src="doctor2.jpg" alt="Dr. Mariam Hassan" className="w-10 h-10 rounded-full mr-3" />
                  Dr. Mariam Hassan
                </th>
                <td className="px-2 py-2">
                  Pediatrics
                </td>
                <td className="px-2 py-2">
                  Specialized Children's Clinic
                </td>
                <td className="px-2 py-2">
                  01123456789
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                  <img src="doctor2.jpg" alt="Dr. Mariam Hassan" className="w-10 h-10 rounded-full mr-3" />
                  Dr. Mariam Hassan
                </th>
                <td className="px-2 py-2">
                  Pediatrics
                </td>
                <td className="px-2 py-2">
                  Specialized Children's Clinic
                </td>
                <td className="px-2 py-2">
                  01123456789
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="count content-center align-middle text-center lg:my-5 md:my-10 ml-0 flex justify-center flex-col items-center rounded-2xl text-white lg:w-[35%] w-full   h-[400px]">
          <div className='bg-[#199ED3] w-full h-[200px] rounded-2xl '>
            <div className=" w-full h-full text-center ">
              <span><i className="fa-solid py-5 fa-user-doctor shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white" /></span>
              <h3 className=" text-xl font-semibold p-2">{t("Genaral.TotalDoctors")}</h3>
              <p className=" count p-2">25</p>
            </div>
          </div>
          <br />

          <div className='bg-[#82CA9D] w-full h-[200px] rounded-2xl '>
            <div className=" w-full h-full text-center">
              <i class=" fa-solid py-5 fa-bed-pulse shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-white"></i>
              <h3 className=" text-xl font-semibold p-2">{t("Genaral.TotalPatients")}</h3>
              <p className="count p-2">20</p>
            </div>
          </div>


        </div>

      </div>
    </div>
  );
}