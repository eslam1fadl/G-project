import i18next from "i18next";
import { createContext, useState } from "react";
import { useTranslation } from "react-i18next";

export const TranslateContext = createContext();

export function TranslateProvider({ children }) {
    const [AR_Lang, setArlang] = useState(i18next.language === "ar"); 
    const { i18n } = useTranslation(); 

    function handleChanglan(lang) {
        i18n.changeLanguage(lang); 
        setArlang(lang === "ar"); 
        document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    }
    

    return (
        <TranslateContext.Provider value={{ handleChanglan, AR_Lang }}>
            {children}
        </TranslateContext.Provider>
    );
}
