import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from "react-helmet-async";
import UserTokenProvider from './Context/UserToken.jsx';
import UserNameProvider from './Context/UserName.jsx';
import UserRoleProvider from "./Context/UserRole.jsx";
import DoctorIdProvider from "./Context/DoctorId.jsx";
import i18next from "i18next";
import { useTranslation, initReactI18next, I18nextProvider } from "react-i18next";
import AR_LANG from "./Locals/ar/common.json"
import EN_LANG from "./Locals/en/common.json"
import { TranslateProvider } from './utils/TranslateContext.jsx';
i18next.init({
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            global: EN_LANG
        },
        ar: {
            global: AR_LANG

        }

    },
    lng: localStorage.getItem("language") || "ar",
    

})

createRoot(document.getElementById('root')).render(
    <I18nextProvider i18n={i18next}>

    <HelmetProvider>
    <TranslateProvider>
    <DoctorIdProvider>   
    <UserRoleProvider>
    <UserNameProvider>
    <UserTokenProvider>
    <App />
    </UserTokenProvider>
    </UserNameProvider>
    </UserRoleProvider>
    </DoctorIdProvider>


    </TranslateProvider>

    </HelmetProvider>
    </I18nextProvider>

)
