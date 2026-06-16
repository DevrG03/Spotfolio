'use client'
import React, { useEffect, useState } from 'react';
import MobileLanding from './MobileLanding';
import DesktopLanding from './DesktopLanding';
import Loader from '@/components/Loader';

const Landing = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Add isLoading state

    const handleResize = () => {
        if (window.innerWidth < 600) {
            setIsMobile(true);
            console.log('mobile');
        } else {
            setIsMobile(false);
            console.log('desktop');
        }
    };

    useEffect(() => {
        if (window.innerWidth < 600) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        setIsLoading(false); // Set isLoading to false once the component is mounted

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    if (isLoading) {
        return <Loader/>; // Render a loading screen
    }

    if (isMobile) {
        return <MobileLanding />;
    } else {
        return <DesktopLanding />;
    }
};

export default Landing;