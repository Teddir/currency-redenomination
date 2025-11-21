import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'install';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
  target,
  rel,
  icon,
  iconPosition = 'left',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100';

  const variants = {
    primary:
      'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200',
    secondary:
      'bg-red-600 text-white hover:bg-red-700',
    ghost:
      'bg-transparent text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-none hover:shadow-md',
    install:
      'bg-slate-900 dark:bg-slate-800 text-slate-100 px-5 py-2.5 rounded-lg font-mono text-sm hover:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700 dark:border-slate-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {content}
    </button>
  );
}

