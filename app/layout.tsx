import type { Metadata } from 'next';
import { Inter, Instrument_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Analytics } from '@/components/analytics';
import { SessionProvider } from '@/components/session-provider';
import './globals.css';

// Load fonts and assign CSS custom properties
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
});

export const metadata: Metadata = {
  title: 'HackForge AI - Transform Ideas Into Code',
  description: 'Transform natural language project descriptions into complete codebases with AI',
  keywords: ['code generation', 'AI', 'development', 'programming', 'code', 'generation'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${instrumentSans.variable} font-sans antialiased`}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            {children}
            <Analytics />
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
