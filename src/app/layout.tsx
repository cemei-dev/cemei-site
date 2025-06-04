import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@/config/firebase";

// eslint-disable-next-line camelcase
import { Josefin_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";

import AuthProvider from "@providers/Auth";
import QueryClientProviderApp from "@providers/QueryClientApp";
import UserProvider from "@providers/User";

const josefinsans = Josefin_Sans({ subsets: ["latin"] });
const corisande = localFont({
  src: "../../public/fonts/corisande.ttf",
  variable: "--font-corisande"
});

export const metadata = {
  title: "CEMEI",
  description: "CEMEI site"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProviderApp>
        <AuthProvider>
          <UserProvider>
            <body className={` ${josefinsans.className} ${corisande.variable}`}>
              <ToastContainer />
              {children}
            </body>
          </UserProvider>
        </AuthProvider>
      </QueryClientProviderApp>
    </html>
  );
}
