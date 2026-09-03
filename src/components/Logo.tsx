import React from 'react'
import logoHd from '../imports/logo_hd.png'
import logoTransparent from '../imports/logo_transparent.png'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  showSubtitle?: boolean
}

export default function Logo({ size = 'md', className = '', onClick }: LogoProps) {
  // Sizes tailored to look crisp and well-proportioned
  const heights = {
    sm: 'h-8 max-w-[150px]',
    md: 'h-10 max-w-[190px]',
    lg: 'h-14 max-w-[260px]',
  }

  return (
    <div 
      className={`inline-flex items-center gap-2 cursor-pointer select-none transition-transform hover:opacity-95 ${className}`} 
      onClick={onClick}
      title="Halal Supply-Chain - SUKAHALAL"
    >
      <img 
        src={logoHd} 
        alt="Halal Supply-Chain Logo" 
        className={`${heights[size]} w-auto object-contain drop-shadow-xs`}
        onError={(e) => {
          // fallback to logoTransparent if needed
          (e.currentTarget as HTMLImageElement).src = logoTransparent
        }}
      />
    </div>
  )
}
