import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageContext';
import './globals.css';

export const metadata: Metadata = {
    title: 'RRGSOFT - Full Stack Developer Portfolio',
    description: 'Raximov Rustam - Professional Full Stack Developer. Django, AI, Web Apps. 5+ years of experience.',
    keywords: 'rrgsoft, full stack developer, django, python, web development, portfolio',
    openGraph: {
        title: 'RRGSOFT - Full Stack Developer Portfolio',
        description: 'Raximov Rustam - Professional Full Stack Developer',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="uz" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="antialiased">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
