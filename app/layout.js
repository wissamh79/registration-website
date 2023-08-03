import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Registration-Website",
  description: "Powered by Computiq",
};
export const revalidate = 3600;
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Header />
            <main className="flex items-start justify-center h-full min-h-screen p-6">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
