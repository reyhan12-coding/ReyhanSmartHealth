import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LABELS } from '../../utils/constants';
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError('Password dan konfirmasi password tidak cocok');
            return;
        }

        if (formData.password.length < 6) {
            setError('Password minimal 6 karakter');
            return;
        }

        setLoading(true);

        const { error } = await signUp(formData.email, formData.password, formData.fullName);

        if (error) {
            setError(error.message || 'Gagal membuat akun. Silakan coba lagi.');
            setLoading(false);
        } else {
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
                <div className="card max-w-md w-full text-center animate-slide-up">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Akun Berhasil Dibuat!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Selamat datang di ReyhanSmartHealth. Anda akan diarahkan ke dashboard...
                    </p>
                </div>
            </div>
        );
    }

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

                {/* Register Card */}
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {LABELS.createAccount}
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
                                {LABELS.fullName}
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Nama lengkap Anda"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {LABELS.email}
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Minimal 6 karakter"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {LABELS.confirmPassword}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Ketik ulang password"
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
                                    <UserPlus className="w-5 h-5" />
                                    <span>{LABELS.register}</span>
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {LABELS.alreadyHaveAccount}{' '}
                            <Link
                                to="/login"
                                className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
                            >
                                {LABELS.login}
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

export default Register;
