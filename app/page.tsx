"use client";

/* ------------------------------------------------------------
app/api/page.tsx
The component for the website's main homepage. It also contains
some of the loading screen's functionality.
-------------------------------------------------------------*/


import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import LoadingScreen from '@/components/LoadingScreen'
import Header from '@/components/ui/site/Header'
import Footer from '@/components/ui/site/Footer'

export default function Home() {
  
  // check if page is loaded, else display loading screen
  const [mounted, setMounted] = useState(false);
  useEffect(() => {setMounted(true)},[]);
  if (!mounted) {return (<LoadingScreen/>)}

  // main content
  return (
    <>
      <Header/>
      <section className="min-h-screen"></section>
      <Footer/>
    </>
  );
}
