import React from 'react';
import layaLogoImg from '../assets/images/laya_logo_1782636781348.jpg';

interface LayaLogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function LayaLogo({ className = "w-full h-full", width, height }: LayaLogoProps) {
  return (
    <img 
      src={layaLogoImg} 
      alt="Laya Bike Rental" 
      className={`object-contain rounded-full ${className}`}
      style={{ 
        width: width, 
        height: height,
      }}
      referrerPolicy="no-referrer"
    />
  );
}
