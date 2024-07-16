import type { Metadata } from "next";
import { Inter, Nanum_Myeongjo, Orelega_One } from "next/font/google";
import "./globals.css";

const orelega_One = Orelega_One({ weight: "400", subsets: ["latin"] });

const nanum_Myeongjo = Nanum_Myeongjo({ weight: "400", subsets: ["latin"] });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME,
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nanum_Myeongjo.className}>{children}</body>
    </html>
  );
}
