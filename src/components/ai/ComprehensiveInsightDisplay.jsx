import { Brain, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { DISCLAIMERS } from '../../utils/constants';

const ComprehensiveInsightDisplay = ({ mainInsight }) => {
    if (!mainInsight) return null;

    const { summary, riskAnalysis, patternBreakdown, recommendations, futureAnalysis, disclaimer, analysedDays } = mainInsight;

    // Risk level styling
    const getRiskStyle = (level) => {
        switch (level) {
            case 'Tinggi':
                return {
                    bg: 'bg-red-50 dark:bg-red-900/20',
                    border: 'border-red-300 dark:border-red-700',
                    text: 'text-red-800 dark:text-red-300',
                    badge: 'bg-red-500',
                };
            case 'Sedang':
                return {
                    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                    border: 'border-yellow-300 dark:border-yellow-700',
                    text: 'text-yellow-800 dark:text-yellow-300',
                    badge: 'bg-yellow-500',
                };
            default:
                return {
                    bg: 'bg-green-50 dark:bg-green-900/20',
                    border: 'border-green-300 dark:border-green-700',
                    text: 'text-green-800 dark:text-green-300',
                    badge: 'bg-green-500',
                };
        }
    };

    const riskStyle = getRiskStyle(riskAnalysis.riskLevel);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                        <Brain className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Analisis Mendalam AI
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Berdasarkan {analysedDays} hari data kesehatan Anda
                        </p>
                    </div>
                </div>
            </div>

            {/* 1. Insight Summary */}
            <div className="health-card">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
                    <span>📊</span>
                    <span>Ringkasan Analisis</span>
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {summary}
                </p>
            </div>

            {/* 2. Risk Analysis */}
            <div className={`p-6 rounded-2xl border-2 ${riskStyle.bg} ${riskStyle.border}`}>
                <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                        <AlertCircle className={`w-5 h-5 ${riskStyle.text}`} />
                        <span>Analisis Risiko</span>
                    </h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                            Level Risiko:
                        </span>
                        <span className={`px-4 py-1 rounded-full text-white font-bold ${riskStyle.badge}`}>
                            {riskAnalysis.riskLevel}
                        </span>
                    </div>
                </div>
                <p className={`${riskStyle.text} leading-relaxed`}>
                    {riskAnalysis.justification}
                </p>
                {riskAnalysis.score !== undefined && (
                    <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Skor Risiko:</span>
                            <span className="font-bold text-gray-900 dark:text-white">
                                {riskAnalysis.score} / 10+
                            </span>
                        </div>
                        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className={`h-2 rounded-full transition-all duration-500 ${riskStyle.badge}`}
                                style={{ width: `${Math.min((riskAnalysis.score / 10) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. Pattern Breakdown */}
            {patternBreakdown && patternBreakdown.length > 0 && (
                <div className="health-card">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <span>🔍</span>
                        <span>Pola yang Terdeteksi</span>
                    </h3>
                    <ul className="space-y-3">
                        {patternBreakdown.map((pattern, index) => (
                            <li
                                key={index}
                                className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            >
                                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-full text-sm font-bold">
                                    {index + 1}
                                </span>
                                <p className="flex-1 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                    {pattern}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 4. Personalized Recommendations */}
            {recommendations && recommendations.length > 0 && (
                <div className="health-card bg-gradient-to-br from-blue-50 to-primary-50 dark:from-blue-900/20 dark:to-primary-900/20">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                        <span>💡</span>
                        <span>Rekomendasi Personal</span>
                    </h3>
                    <div className="space-y-4">
                        {recommendations.map((rec, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-blue-200 dark:border-blue-800"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                                        <span className="text-primary-600 dark:text-primary-400">
                                            #{rec.priority}
                                        </span>
                                        <span>{rec.action}</span>
                                    </h4>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                                        Alasan:
                                    </span>{' '}
                                    {rec.rationale}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 5. Forward-Looking Insight */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2 mb-3">
                        <TrendingDown className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        <h4 className="font-bold text-gray-900 dark:text-white">
                            Jika Pola Berlanjut
                        </h4>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {futureAnalysis.currentTrajectory}
                    </p>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border border-green-200 dark:border-green-700">
                    <div className="flex items-center space-x-2 mb-3">
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                        <h4 className="font-bold text-gray-900 dark:text-white">
                            Dengan Perbaikan
                        </h4>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {futureAnalysis.improvedTrajectory}
                    </p>
                </div>
            </div>

            {/* 6. Disclaimer */}
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400 flex items-start space-x-2">
                    <span className="flex-shrink-0 mt-0.5">⚕️</span>
                    <span>{disclaimer}</span>
                </p>
            </div>
        </div>
    );
};

export default ComprehensiveInsightDisplay;
