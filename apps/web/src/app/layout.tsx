import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { ProfileProvider } from '@/contexts/ProfileContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'MathQuest - Multiplication Mountains',
  description: 'Learn math through adventure in the Multiplication Mountains',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen bg-background">
          <ProfileProvider>
            {children}
          </ProfileProvider>
        </div>
      </body>
    </html>
  );
}
