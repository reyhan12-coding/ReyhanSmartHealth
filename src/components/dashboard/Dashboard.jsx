import { useHealthData } from '../../hooks/useHealthData';
import { LABELS, DISCLAIMERS } from '../../utils/constants';
import { Heart, Activity, Droplet, Moon, Brain, Smile } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from './EmptyState';
import HealthCharts from './HealthCharts';
import EarlyWarningSystem from './EarlyWarningSystem';
import AIInsightCard from '../ai/AIInsightCard';
import AIInsightEngine from '../../utils/AIInsightEngine';

const Dashboard = () => {
    const { healthRecords, loading } = useHealthData();

    if (loading) {
        return <LoadingSpinner message="Memuat data kesehatan..." />;
    }

    // Show empty state if no data
    if (!healthRecords || healthRecords.length === 0) {
        return <EmptyState />;
    }

    // Get the latest record
    const latestRecord = healthRecords[0];

    // Generate AI insights
    const insights = AIInsightEngine.generateInsights(healthRecords);

    // Calculate averages
    const recentRecords = healthRecords.slice(0, 7);
    const calculateAvg = (field) => {
        const sum = recentRecords.reduce((acc, r) => acc + (r[field] || 0), 0);
        return (sum / recentRecords.length).toFixed(1);
    };

    const stats = [
        {
            label: LABELS.heartRate,
            value: `${latestRecord.heart_rate} BPM`,
            avg: `Avg: ${calculateAvg('heart_rate')}`,
            icon: Heart,
            color: 'text-red-500',
            bgColor: 'bg-red-100 dark:bg-red-900/20',
        },
        {
            label: LABELS.sleepDuration,
            value: `${latestRecord.sleep_duration} Jam`,
            avg: `Avg: ${calculateAvg('sleep_duration')}`,
            icon: Moon,
            color: 'text-purple-500',
            bgColor: 'bg-purple-100 dark:bg-purple-900/20',
        },
        {
            label: LABELS.waterIntake,
            value: `${latestRecord.water_intake} Gelas`,
            avg: `Avg: ${calculateAvg('water_intake')}`,
            icon: Droplet,
            color: 'text-blue-500',
            bgColor: 'bg-blue-100 dark:bg-blue-900/20',
        },
        {
            label: LABELS.stressLevel,
            value: `${latestRecord.stress_level}/10`,
            avg: `Avg: ${calculateAvg('stress_level')}`,
            icon: Brain,
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
        },
        {
            label: LABELS.activityLevel,
            value: `${latestRecord.activity_level} Min`,
            avg: `Avg: ${calculateAvg('activity_level')}`,
            icon: Activity,
            color: 'text-green-500',
            bgColor: 'bg-green-100 dark:bg-green-900/20',
        },
        {
            label: LABELS.mood,
            value: latestRecord.mood,
            avg: '',
            icon: Smile,
            color: 'text-pink-500',
            bgColor: 'bg-pink-100 dark:bg-pink-900/20',
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {LABELS.welcomeMessage}! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Berikut adalah ringkasan kesehatan Anda hari ini.
                </p>
            </div>

            {/* Medical Disclaimer */}
            <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg border-l-4 border-primary-500">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    {DISCLAIMERS.main}
                </p>
            </div>

            {/* Early Warnings */}
            {insights.warnings.length > 0 && (
                <EarlyWarningSystem warnings={insights.warnings} />
            )}

            {/* Stats Grid */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {LABELS.todayOverview}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="health-card">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                            {stat.value}
                                        </p>
                                        {stat.avg && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {stat.avg}
                                            </p>
                                        )}
                                    </div>
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <Icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* AI Insights Summary */}
            {insights.mainInsight && healthRecords.length >= 3 && (
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {LABELS.aiInsights} 🤖
                    </h2>

                    <div className="health-card bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
                        <div className="flex items-start justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                Ringkasan Analisis ({insights.mainInsight.analysedDays} Hari)
                            </h3>
                            <a
                                href="/insights"
                                className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                Lihat Analisis Lengkap →
                            </a>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {insights.mainInsight.summary}
                        </p>

                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                            <div className="flex items-start space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
                                <div className="flex-shrink-0">
                                    <div className={`px-3 py-1 rounded-full text-white text-sm font-bold ${insights.mainInsight.riskAnalysis.riskLevel === 'Tinggi' ? 'bg-red-500' :
                                            insights.mainInsight.riskAnalysis.riskLevel === 'Sedang' ? 'bg-yellow-500' :
                                                'bg-green-500'
                                        }`}>
                                        {insights.mainInsight.riskAnalysis.riskLevel}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                        Level Risiko Gaya Hidup
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Lihat analisis lengkap untuk detail
                                    </p>
                                </div>
                            </div>

                            {insights.mainInsight.recommendations && insights.mainInsight.recommendations.length > 0 && (
                                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Rekomendasi Prioritas #1:
                                    </p>
                                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
                                        {insights.mainInsight.recommendations[0].action}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                            {DISCLAIMERS.aiInsight}
                        </p>
                    </div>
                </div>
            )}

            {/* Minimal data message */}
            {(!insights.mainInsight || healthRecords.length < 3) && (
                <div className="card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        💡 <strong>Tips:</strong> Input data minimal 3-5 hari untuk mendapatkan analisis AI yang mendalam dengan deteksi pola, korelasi, dan rekomendasi personal.
                    </p>
                </div>
            )}

            {/* Charts */}
            <div>
                <HealthCharts healthRecords={healthRecords} />
            </div>
        </div>
    );
};

export default Dashboard;
