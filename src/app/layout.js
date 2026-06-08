import './globals.css';
import Providers from '@/components/Providers';
import Navbar from '@/components/layout/Navbar';
import BottomNav from '@/components/layout/BottomNav';

export const metadata = {
    title: 'AlfaLearning | Learn Anything, Anywhere',
    description: 'Enterprise E-Learning Marketplace for instructors and students.',
};


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased bg-gray-50 text-gray-900">
                <Providers>
                    <Navbar />
                    <main className="pt-16 pb-16 md:pb-0 min-h-screen">
                        {children}
                    </main>
                    <BottomNav />
                </Providers>
            </body>
        </html>
    );
}

