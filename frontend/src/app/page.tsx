'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import { visitorsAPI } from '@/lib/api';

const ParticlesBackground = dynamic(() => import('@/components/ParticlesBackground'), {
    ssr: false,
});

export default function Home() {
    useEffect(() => {
        // Track visitor
        visitorsAPI.track(window.location.pathname).catch(() => { });
    }, []);

    return (
        <>
            <LoadingScreen />
            <ParticlesBackground />
            <Navbar />
            <main className="relative z-10">
                <Hero />
                <About />
                <Services />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </>
    );
}
