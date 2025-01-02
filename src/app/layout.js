import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "자 잡기!",
  description: "떨어지는 자를 잡으세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={geistSans.variable}>
      <meta name="google" content="notranslate"></meta>
      <body className={geistMono.variable}>{children}</body>
    </html>
  );
}
