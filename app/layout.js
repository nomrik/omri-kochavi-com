import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from './components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Omri Kochavi - Composer",
  description: "Omri Kochavi - Composer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} py-4 px-6 md:py-8 md:px-12`}>
        <Navbar />
        <div className="bg-amber-500">
          {children}
        </div>
      </body>
    </html>
  );
}
