import type { Metadata } from "next";
import "./globals.css";
import { fontSans } from "@/utils/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const metadata: Metadata = {
    title: "AGDES - Afet Güzergah Denetim Sistemi",
    description: "AGDES - Afet Güzergah Denetim Sistemi",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={cn("relative h-full antialiased font-sans overflow-x-hidden mx-auto text-foreground border", fontSans.variable)}>
            <main className="relative flex min-h-screen flex-col bg-background">
                <h1 className="fixed top-2 left-2 z-50">
                    <div className="relative w-52 lg:w-80 aspect-video">
                        <Image 
                            src="/agdes.svg"
                            alt="agdes"
                            fill
                            priority
                        />
                    </div>
                </h1>
                <div className="flex-1 grow">
                    {children}
                </div>
            </main>
            </body>
        </html>
    );
};