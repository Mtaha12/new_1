import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  const baseStyles = 'bg-white rounded-xl shadow-lg border border-gray-100 p-6';
  const combinedClasses = `${baseStyles} ${className}`.trim();
  
  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
}