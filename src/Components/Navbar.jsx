import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserName } from "../Context/UserName";
import { UserRole } from "../Context/UserRole";
import { userToken } from "../Context/UserToken";
import { useTranslation } from "react-i18next";
import { TranslateContext } from "../utils/TranslateContext";

export default function Navbar() {
  let { isLogin, setLogin } = useContext(userToken);
  let { isUser } = useContext(UserName);
  let { isRole } = useContext(UserRole);

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("global");
  const { handleChanglan, AR_Lang } = useContext(TranslateContext);
  

  const isHomePage = location.pathname === "/";
  const hiddenRoutes = ["/admin", "/admin/chats", "/admin/users", "/admin/doctors", "/admin/AddDoctors", "/admin/Addcity"];
  const shouldRenderNavbar = !hiddenRoutes.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  function logout() {
    localStorage.removeItem('token');
    setLogin(null);
    navigate('/login');
    setIsOpen(false);
  }

  if (!shouldRenderNavbar) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isHomePage && !isScrolled ? "bg-transparent tra text-white" : "bg-[#F9FAFB] text-black shadow-md"
        }`}
    >
      <div className="mx-4 lg:mx-10 max-w-screen-xl flex flex-wrap items-center justify-between p-3">
        <Link to="/" className="flex items-center text-3xl">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 150" className="h-13 w-auto logo">
            <text x="70" y="90" fontSize="55" fontWeight="bold" fill="#63caf2">Dr</text>
            <text x="150" y="90" fontSize="55" fontWeight="bold" fill="#199ED3">Home</text>
            <path d="M50 100 L320 100" stroke="#63caf2" strokeWidth="4" fill="none" />
            <text x="50" y="130" fontSize="25" fill="#666666">Our premium medical site</text>
          </svg>
        </Link>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 w-10 h-10 text-gray-500 rounded-lg">
          <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>

        <div className={`${isOpen ? "block" : "hidden"} lg:flex w-full lg:w-auto mt-4 lg:mt-0`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-6 font-medium">
            {isLogin && (
              <>
                {console.log("Rendering navbar with role:", isRole)}
                {isRole === 'Patient' ? (
                  <li><NavLink to="/profileUser" className="block py-2">{isUser ? isUser : "User"}</NavLink></li>
                ) : isRole === 'Doctor' ? (
                  <li><NavLink to="/ProfileDoctor" className="block py-2">{isUser ? isUser : "Doctor"}</NavLink></li>
                ) : (
                  <li><NavLink to="/admin" className="block py-2">{t("text.AdminLayout")}</NavLink></li>
                )}
              </>
            )}

            <li><NavLink to="/" className="block py-2 "> {t("text.Home")}</NavLink></li>
            {isLogin && (
              <>
                <li><NavLink to="/about" className="block py-2 "> {t("text.About")} </NavLink></li>
                <li><NavLink to="/contact" className="block py-2 ">{t("text.Contact")}</NavLink></li>
              </>
            )}

            {isLogin ? (
              <li><span onClick={logout} className="block py-2  cursor-pointer">{t("text.Logout")}</span></li>
            ) : (
              <>
                <li><NavLink to="/register" className="block py-2 ">{t("text.Register")}</NavLink></li>
                <li><NavLink to="/login" className="block py-2 ">{t("text.Login")}</NavLink></li>
              </>
            )}

            <li className="inline-flex items-center">
              <div className="lang_btn">
                <button
                  className={`lang ${AR_Lang ? "deactive" : ""} px-3 my-1`}
                  onClick={() => handleChanglan("ar")}
                >
                  عربي
                </button>
                <button
                  className={`lang ${AR_Lang ? "" : "deactive"} px-3 my-1`}
                  onClick={() => handleChanglan("en")}
                >
                  Eng
                </button>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


