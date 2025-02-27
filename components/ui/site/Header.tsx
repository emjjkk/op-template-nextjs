"use client";

/* ------------------------------------------------------------
Header.tsx
Component for the header, shared by all the pages in the site, 
excluding admin pages which will have a different layout.
Functionality for language switching is also here.
-------------------------------------------------------------*/


import DarkModeToggle from "@/components/DarkModeToggle" // theme switcher
import { useTranslation } from "react-i18next"; // localization-related


export default function Header() {
    
    // function for switching languages
    const { t, i18n } = useTranslation();
    const changeLanguage = () => {
        const newLang = i18n.language === "en" ? "zh" : "en";
        i18n.changeLanguage(newLang);
    }; 

    return (
        <>
            <header className="w-full px-24 py-6 flex items-center justify-between">
                {/* left side of the header */}
                <div className="flex items-center">
                    <a href="/" className="flex items-center text-lg">
                        <img src="/images/logo.png" alt="Logo" className="w-6 h-6 rounded-full mr-2" />
                        {t("website_name")}
                    </a>
                </div>
                {/* right side of the header */}
                <div className="flex items-center">
                    <nav className="flex items-center capitalize text-sm">
                        <a href="/home" className="mx-2 hover:text-slate-500">{t("nav.home")}</a>
                        <a href="/about" className="mx-2 hover:text-slate-500">{t("nav.about")}</a>
                        <a href="/blog" className="mx-2 hover:text-slate-500">{t("nav.blog")}</a>
                        <a href="/contact" className="mx-2 hover:text-slate-500">{t("nav.store")}</a>
                        <a href="/contact" className="mx-2 hover:text-slate-500">{t("nav.contact")}</a>
                    </nav>
                    <DarkModeToggle/>
                    <span className="ml-2 text-sm cursor-pointer" onClick={changeLanguage}>{t("language")}</span>
                </div>
            </header>
        </>
    )
}