import React from 'react';
import { Outlet } from "react-router-dom";
import NavbarAdmin from './NavbarAdmin';
import Sidebar from './Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen relative bg-gray-900">
      <NavbarAdmin />

      <div className="flex flex-1 justify">
        <div className=" flex-shrink-0 hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 bg-gray-900 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
