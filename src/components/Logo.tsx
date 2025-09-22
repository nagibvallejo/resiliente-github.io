import logoImage from 'figma:asset/ff98533b04bb546c34e661b6e3b5c77bf4c3b598.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-20 h-20',
    lg: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl', 
    lg: 'text-4xl'
  };

  return (
    <div className="flex items-center gap-3">
      <img 
        src={logoImage} 
        alt="Resiliente" 
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <div>
          <h1 className={textSizeClasses[size]}>Resiliente</h1>
          <p className="text-sm text-muted-foreground">Fitness Studio</p>
        </div>
      )}
    </div>
  );
}