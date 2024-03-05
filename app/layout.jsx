import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Genera tu empresa!",
  description: "Un formulario para que puedas ver la informacion de tu empresa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
      
    </html>
  );
}
