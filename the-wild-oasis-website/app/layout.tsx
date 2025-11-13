import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import Header from "../components/Header";
import { ReservationProvider } from "../context/ReservationContext";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const josefinSans = Josefin_Sans({
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "The Wild Oasis",
    template: "%s | The Wild Oasis",
    absolute: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${josefinSans.className} bg-primary-950 text-primary-100 relative flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="grid flex-1 px-8 py-12">
          <div className="container mx-auto max-w-7xl">
            <ReservationProvider>{children}</ReservationProvider>
          </div>
        </main>
        <Toaster position="bottom-right" reverseOrder={true} />
      </body>
    </html>
  );
};

export default RootLayout;
