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
      <body className={`${inter.className} flex flex-col min-h-screen px-6 pb-4 md:px-12`}>
        <Navbar />
        <div className="flex-1">
          <div className="bg-amber-500">
            {children}
          </div>
        </div>
          <div className="w-full mt-6 text-center text-xs">
            © Omri Kochavi 2024
          </div>
        </body>
    </html>
  );
}
