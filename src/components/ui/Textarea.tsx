import React from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
	error?: string | boolean;
}

export default function Textarea({ label, error, className, ...props }: TextareaProps) {
	return (
		<div className={cn('flex flex-col', className)}>
			{label && (
				<label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
			)}
			<textarea
				className={cn(
					'border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-vertical',
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
