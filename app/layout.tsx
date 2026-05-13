import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ismosis.com'),
  title: {
    default: 'Ismosis / Patent Illustrations for USPTO Applications',
    template: '%s / Ismosis',
  },
  description:
    'Professional patent illustrations for inventors, startups, engineers, and patent attorneys. USPTO compliant drawings with fast turnaround and technical precision.',
  keywords: [
    'patent illustrations',
    'USPTO drawings',
    'patent drawings',
    'utility patent drawings',
    'design patent drawings',
    'patent figure redrawing',
    'CAD to patent illustration',
  ],
  openGraph: {
    title: 'Ismosis / Patent Illustrations for USPTO Applications',
    description:
      'Professional patent illustrations for inventors, startups, engineers, and patent attorneys.',
    url: 'https://ismosis.com',
    siteName: 'Ismosis',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ismosis / Patent Illustrations for USPTO Applications',
    description:
      'Professional patent illustrations for inventors, startups, engineers, and patent attorneys.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Ismosis',
  description:
    'Patent illustration studio preparing USPTO compliant drawings for inventors, engineers, and patent professionals.',
  email: 'ismaellateef81@gmail.com',
  url: 'https://ismosis.com',
  serviceType: 'Patent Illustration',
  areaServed: 'United States',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased text-ink bg-paper">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
