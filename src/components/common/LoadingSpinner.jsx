import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Memuat...', size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16',
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-500`} />
            {message && (
                <p className="text-gray-600 dark:text-gray-400 text-sm animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );
};

export default LoadingSpinner;
