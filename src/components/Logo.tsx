import logoImg from '../imports/image.png'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export default function Logo({ size = 'md', className = '', onClick }: LogoProps) {
  const sizes = { sm: 'h-7', md: 'h-9', lg: 'h-12' }
  return (
    <div className={`flex items-center cursor-pointer ${className}`} onClick={onClick}>
      <img src={logoImg} alt="SUKAHALAL" className={`${sizes[size]} w-auto object-contain`} />
    </div>
  )
}
