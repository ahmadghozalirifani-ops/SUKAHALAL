interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export default function Logo({ size = 'md', className = '', onClick }: LogoProps) {
  const iconSizes = { sm: 'w-7 h-7 text-xs', md: 'w-9 h-9 text-sm', lg: 'w-12 h-12 text-base' }
  const textSizes = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl' }

  return (
    <div className={`flex items-center gap-2.5 cursor-pointer select-none ${className}`} onClick={onClick}>
      <div className={`${iconSizes[size]} bg-green-600 rounded-xl flex items-center justify-center text-white font-black shadow-sm shrink-0 border border-green-500`}>
        S
      </div>
      <span className={`font-black text-green-700 tracking-tight ${textSizes[size]}`}>
        SUKAHALAL
      </span>
    </div>
  )
}
