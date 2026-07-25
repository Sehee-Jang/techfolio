import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";

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
      <body>
        <Header />

        <main className='min-h-screen'>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
