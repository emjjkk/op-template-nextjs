"use client"

/* ------------------------------------------------------------
Footer.tsx
Component for the footer, shared by all the pages in the site, 
excluding admin pages which will have a different layout.
-------------------------------------------------------------*/


import { Fa1 } from "react-icons/fa6" // icons
import { useTranslation } from "react-i18next"; // localization-related

export default function Footer() {
    
    const { t, i18n } = useTranslation();

    return (
        <>
            <footer className="px-24 py-4 w-full">
                <div className="flex justify-between w-full">
                    {/* navbar brand and description */}
                    <div className="w-1/3">
                        <a href="/" className="flex items-center text-lg mb-2">
                            <img src="/images/logo.png" alt="Logo" className="w-6 h-6 rounded-full mr-2" />
                            {t("website_name")}
                        </a>
                        <p className="text-sm">{t("footer.description_text")}</p>
                    </div>
                    {/* footer links */}
                    <div className="w-1/3 flex justify-end items-end">
                        <div className="capitalize">
                            <h3 className="text-md font-bold">links</h3>
                            <ul>
                                <a href="/"><li className="text-sm text-slate-400">{t("footer.links.link_1")}</li></a>
                                <a href="/"><li className="text-sm text-slate-400">{t("footer.links.link_2")}</li></a>
                                <a href="/"><li className="text-sm text-slate-400">{t("footer.links.link_3")}</li></a>
                            </ul>
                        </div>
                        <div className="ml-12 capitalize">
                            <h3 className="text-md font-bold">nav</h3>
                            <ul>
                                <li className="text-sm text-slate-400">{t("nav.home")} page</li>
                                <li className="text-sm text-slate-400">{t("nav.store")} page</li>
                                <li className="text-sm text-slate-400">{t("nav.blog")} page</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="px-4"></div>
            </footer>
        </>
    )
}