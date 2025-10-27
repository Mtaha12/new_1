import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string | boolean;
}

export default function Input({ label, error, className, ...props }: InputProps) {
	return (
		<div className={cn('flex flex-col', className)}>
			{label && (
				<label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
			)}
			<input
				className={cn(
					'border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
					error ? 'border-red-500' : 'border-gray-300'
				)}
				{...props}
			/>
			{error && typeof error === 'string' && (
				<p className="mt-1 text-sm text-red-600">{error}</p>
			)}
		</div>
	);
}
