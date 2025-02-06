"use client";

import { useTranslation } from "react-i18next";

export default function Home() {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    const newLang = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div>
      <h1>{t("welcome")}</h1>
      <button onClick={changeLanguage}>{t("language")}</button>
    </div>
  );
}
