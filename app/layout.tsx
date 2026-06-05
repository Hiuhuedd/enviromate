import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata: Metadata = {
  title: {
    default: "Enviromate Technologies Limited | Come Home To Quality",
    template: "%s | Enviromate Technologies Limited",
  },
  description:
    "Enviromate Technologies Limited — Kenya's trusted civil & building construction contractor and environmental health & safety consultancy. NCA registered. Serving government, corporate and private clients since 2018.",
  keywords: [
    "construction Kenya",
    "civil engineering Kenya",
    "building contractor Nairobi",
    "EHS consultancy Kenya",
    "environmental impact assessment Kenya",
    "NCA registered contractor",
    "Enviromate Technologies",
  ],
  openGraph: {
    title: "Enviromate Technologies Limited | Come Home To Quality",
    description:
      "Kenya's premier civil & building construction contractor and EHS consultancy firm. NCA registered since 2018.",
    type: "website",
    locale: "en_KE",
  },
  icons: {
    icon: '/logo-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-icon.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
