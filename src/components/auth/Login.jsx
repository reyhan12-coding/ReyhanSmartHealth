import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LABELS } from '../../utils/constants';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    const { signIn } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            setError(error.message || 'Gagal masuk. Periksa email dan password Anda.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
            <div className="w-full max-w-md animate-slide-up">
                {/* Logo/Brand */}
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-xl mb-4">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        ReyhanSmartHealth
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Kesehatan Cerdas Berbasis AI
                    </p>
                </div>

                {/* Login Card */}
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {LABELS.welcomeBack}
                    </h2>

                    {error && (
                        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {LABELS.email}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="nama@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {LABELS.password}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-10"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Memuat...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    <span>{LABELS.login}</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {LABELS.dontHaveAccount}{' '}
                            <Link
                                to="/register"
                                className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                            >
                                {LABELS.register}
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        🔒 Data Anda dilindungi dengan enkripsi end-to-end
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
