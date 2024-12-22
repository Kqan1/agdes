import { Inter } from "next/font/google";

export const fontSans = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true,
});