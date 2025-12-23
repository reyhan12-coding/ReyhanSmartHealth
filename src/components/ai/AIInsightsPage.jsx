import { useState } from 'react';
import { useHealthData } from '../../hooks/useHealthData';
import { useAuth } from '../../contexts/AuthContext';
import { LABELS } from '../../utils/constants';
import { Lightbulb, Download } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../dashboard/EmptyState';
import ComprehensiveInsightDisplay from './ComprehensiveInsightDisplay';
import AIInsightEngine from '../../utils/AIInsightEngine';
import { generateHealthInsightPDF } from '../../utils/pdfGenerator';

const AIInsightsPage = () => {
    const { healthRecords, loading } = useHealthData();
    const { user } = useAuth();
    const [isExporting, setIsExporting] = useState(false);
    const [exportError, setExportError] = useState(null);

    if (loading) {
        return <LoadingSpinner message="Menganalisis data kesehatan..." />;
    }

    if (!healthRecords || healthRecords.length === 0) {
        return <EmptyState />;
    }

    if (healthRecords.length < 3) {
        return (
            <div className="max-w-3xl mx-auto">
                <div className="card text-center space-y-4">
                    <Lightbulb className="w-16 h-16 text-primary-500 mx-auto" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Data Belum Cukup untuk Analisis Mendalam
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Analisis AI memerlukan minimal 3-5 hari data untuk mendeteksi pola dan korelasi yang bermakna.
                        Anda saat ini memiliki {healthRecords.length} entri.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                        Terus input data kesehatan Anda setiap hari untuk mendapatkan wawasan analitik yang lebih akurat.
                    </p>
                </div>
            </div>
        );
    }

    const insights = AIInsightEngine.generateInsights(healthRecords);

    // Calculate metrics for PDF
    const calculateAvg = (field) => {
        const recent = healthRecords.slice(0, 7);
        const sum = recent.reduce((acc, r) => acc + (r[field] || 0), 0);
        return (sum / recent.length).toFixed(1);
    };

    const metrics = {
        avgSleep: calculateAvg('sleep_duration'),
        avgStress: calculateAvg('stress_level'),
        avgActivity: calculateAvg('activity_level'),
        avgHeartRate: calculateAvg('heart_rate'),
        avgWater: calculateAvg('water_intake'),
    };

    const handleExportPDF = async () => {
        setIsExporting(true);
        setExportError(null);

        try {
            const result = generateHealthInsightPDF(insights.mainInsight, user, metrics);

            if (!result.success) {
                throw new Error(result.error);
            }

            // Success - PDF downloaded
            console.log('PDF berhasil dibuat:', result.fileName);
        } catch (error) {
            console.error('Error saat membuat PDF:', error);
            setExportError('Terjadi kesalahan saat membuat PDF. Silakan coba lagi.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            {/* Header with Export Button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {LABELS.aiInsights}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Analisis mendalam berdasarkan {insights.mainInsight?.analysedDays || 0} hari data Anda
                    </p>
                </div>

                <button
                    onClick={handleExportPDF}
                    disabled={isExporting || !insights.mainInsight}
                    className={`btn flex items-center justify-center space-x-2 ${isExporting || !insights.mainInsight
                            ? 'opacity-50 cursor-not-allowed bg-gray-400'
                            : 'bg-primary-600 hover:bg-primary-700'
                        } text-white transition-all`}
                >
                    <Download className={`w-5 h-5 ${isExporting ? 'animate-bounce' : ''}`} />
                    <span>{isExporting ? 'Membuat PDF...' : 'Unduh Laporan PDF'}</span>
                </button>
            </div>

            {/* Export Error Message */}
            {exportError && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg animate-slide-up">
                    <p className="text-sm text-red-800 dark:text-red-300 flex items-center space-x-2">
                        <span>❌</span>
                        <span>{exportError}</span>
                    </p>
                </div>
            )}

            {/* Main Comprehensive Insight */}
            {insights.mainInsight && (
                <ComprehensiveInsightDisplay mainInsight={insights.mainInsight} />
            )}

            {/* Info Box */}
            <div className="mt-8 card bg-gradient-to-r from-blue-50 to-primary-50 dark:from-blue-900/20 dark:to-primary-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                    <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-2">
                            Cara Kerja Analisis AI yang Ditingkatkan
                        </h3>
                        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                            <li>• Menganalisis tren selama 5-7 hari terakhir, bukan snapshot satu hari</li>
                            <li>• Mendeteksi korelasi antar-metrik (misalnya: stres tinggi → tidur kurang)</li>
                            <li>• Membandingkan data terbaru dengan baseline pribadi Anda</li>
                            <li>• Memberikan analisis kausal: MENGAPA suatu pola terjadi</li>
                            <li>• Rekomendasi spesifik berdasarkan pola yang terdeteksi, bukan saran umum</li>
                            <li>• Proyeksi forward-looking: dampak jika pola berlanjut vs membaik</li>
                        </ul>
                        <p className="text-xs text-blue-700 dark:text-blue-500 mt-3 italic">
                            Semakin konsisten Anda input data (minimal 5 hari), semakin akurat dan mendalam analisis yang dihasilkan.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIInsightsPage;
