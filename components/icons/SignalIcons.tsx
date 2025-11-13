
import React from 'react';

const IconWrapper: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${className}`}>
        {children}
    </div>
);

const SVG: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {children}
    </svg>
);

export const SocialMediaIcon = () => (
    <IconWrapper className="bg-blue-500/20 text-blue-400">
        <SVG>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h2.586a1 1 0 01.707.293l1.414 1.414a1 1 0 00.707.293H17z" />
        </SVG>
    </IconWrapper>
);

export const NewsIcon = () => (
    <IconWrapper className="bg-green-500/20 text-green-400">
        <SVG>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </SVG>
    </IconWrapper>
);

export const SearchIcon = () => (
    <IconWrapper className="bg-purple-500/20 text-purple-400">
        <SVG>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </SVG>
    </IconWrapper>
);

export const HospitalIcon = () => (
    <IconWrapper className="bg-red-500/20 text-red-400">
        <SVG>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-2a6 6 0 00-12 0v2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 10h.01M15 10h.01M12 13h.01" />
        </SVG>
    </IconWrapper>
);

export const WeatherIcon = () => (
    <IconWrapper className="bg-yellow-500/20 text-yellow-400">
        <SVG>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </SVG>
    </IconWrapper>
);
