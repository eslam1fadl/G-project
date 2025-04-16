import React from "react";
import { useLocation } from "react-router-dom"; 

export default function Footer() {
  const location = useLocation(); 
  const hiddenRoutes = ["/admin", "/admin/chats", "/admin/patients", "/admin/users","/admin/AddDoctors","/admin/Addcity"];

  const shouldRenderFooter = !hiddenRoutes.includes(location.pathname);

  if (!shouldRenderFooter) {
    return null; 
  }

  return <div>
  


  </div>;
}
