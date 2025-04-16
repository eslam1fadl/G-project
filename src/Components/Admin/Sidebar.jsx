import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
export default function Sidebar() {
  const { t } = useTranslation("global");

  return (
    <aside id="logo-sidebar" className="fixed  w-64 top-0 left-0 z-40  hidden lg:block h-screen pt-20 transition-transform -translate-x-full bg-gray-800 sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 pb-4  overflow-y-auto bg-gray-800 my-10">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
              <svg className="shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">{t("sidbar.genaral")}</span>
            </Link>
          </li>
          <li>
            <Link to="doctors" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
            <i class="fa-solid fa-user-doctor shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"></i>              

              <span className="flex-1 ms-3 whitespace-nowrap">{t("sidbar.doctors")}</span>
            </Link>
          </li>
          <li>
            <Link to="users" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
              <svg className="shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
              <span className="flex-1 ms-3 whitespace-nowrap">{t("sidbar.users")}</span>
            </Link>
          </li>
          <li>
            <Link to="chats" className="flex items-center p-2 text-white rounded-lg hover:bg-gray-700 group">
              <i class="fa-brands fa-rocketchat shrink-0 w-5 h-5 text-gray-400 transition duration-75 group-hover:text-white"></i>             
              <span className="flex-1 ms-3 whitespace-nowrap">{t("sidbar.chats")}</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}