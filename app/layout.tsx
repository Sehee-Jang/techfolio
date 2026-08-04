import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: {
    default: "Techfolio",
    template: "%s | Techfolio",
  },
  description:
    "A portfolio application for organizing and showcasing software development projects.",
  metadataBase: new URL(
    "https://techfolio-512wrwmgt-sehees-projects-470fc9ba.vercel.app/",
  ),
  openGraph: {
    title: "Techfolio",
    description:
      "A portfolio application for organizing and showcasing software development projects.",
    type: "website",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='flex min-h-screen flex-col'>
        <Header />

        <main className='flex-1'>{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
