import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import PasswordGate from "@/components/PasswordGate";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Katie & Anna",
  description: "We're getting married — join us to celebrate.",
  openGraph: {
    title: "Katie & Anna",
    description: "We're getting married — join us to celebrate.",
    images: ["/couple.jpeg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      {/* Runs before React hydrates — hides gate immediately for logged-in users */}
      <script dangerouslySetInnerHTML={{ __html: `try{if(sessionStorage.getItem('ka_auth')==='1')document.documentElement.setAttribute('data-authed','')}catch(e){}` }} />
      <body className="min-h-full flex flex-col">
        <PasswordGate>{children}</PasswordGate>
      </body>
    </html>
  );
}
