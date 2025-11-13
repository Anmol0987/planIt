import Navbar from "@/components/navbar";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./providers/AuthProvider";
import SocketProvider from "./providers/SocketProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <SocketProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Navbar />
              {children}
              <Toaster position="top-right" />
            </ThemeProvider>
          </SocketProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
