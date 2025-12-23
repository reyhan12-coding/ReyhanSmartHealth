import React from 'react';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="card max-w-md w-full text-center space-y-4">
                        <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Terjadi Kesalahan
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Maaf, terjadi kesalahan yang tidak terduga. Silakan refresh halaman atau hubungi support.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn btn-primary mt-4"
                        >
                            Refresh Halaman
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
