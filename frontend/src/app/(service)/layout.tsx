import type { Metadata } from "next";

import Header from '@/components/global/Header'
import Footer from '@/components/global/Footer'


export const metadata: Metadata = {
  title: "Diet Tracker",
  description: "Diet-Tracker",
};

export default function ServiceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
 {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

