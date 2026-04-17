import type {Metadata} from 'next';
import './globals.css';
import 'nprogress/nprogress.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { NextTopLoader } from '@/components/ui/next-top-loader';

export const metadata: Metadata = {
  title: 'Pixo | Open-Source Graphic Design Studio',
  description: 'The open-source alternative to Canva. Built for AI tool-calling and professional design manipulation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Geist:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <NextTopLoader />
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
