import { Heart, Activity, Plus } from 'lucide-react';
import { LABELS } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const EmptyState = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-[60vh] p-4">
            <div className="max-w-md w-full text-center space-y-6 animate-slide-up">
                {/* Icon Animation */}
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
                    <div className="relative inline-block p-8 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 rounded-full">
                        <Heart className="w-20 h-20 text-primary-600 dark:text-primary-400 animate-pulse" />
                    </div>
                </div>

                {/* Text */}
                <div className="space-y-3">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {LABELS.noDataYet}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        {LABELS.noDataMessag}
                    </p>
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => navigate('/health-data')}
                    className="btn btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg"
                >
                    <Plus className="w-6 h-6" />
                    <span>{LABELS.getStarted}</span>
                </button>

                {/* Features Preview */}
                <div className="mt-12 grid grid-cols-2 gap-4 text-left">
                    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <Activity className="w-8 h-8 text-primary-500 mb-2" />
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            Lacak Kesehatan
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Monitor detak jantung, tidur, dan lebih
                        </p>
                    </div>
                    <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <svg className="w-8 h-8 text-secondary-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            Wawasan AI
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Dapatkan rekomendasi personal
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
