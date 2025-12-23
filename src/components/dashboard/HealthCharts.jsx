import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LABELS, CHART_COLORS } from '../../utils/constants';
import { useState } from 'react';

const HealthCharts = ({ healthRecords }) => {
    const [timeRange, setTimeRange] = useState('7days');

    // Filter data based on time range
    const filterDataByRange = () => {
        const days = timeRange === '7days' ? 7 : 30;
        return healthRecords.slice(0, days).reverse();
    };

    const chartData = filterDataByRange().map((record) => ({
        date: new Date(record.created_at).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' }),
        'Detak Jantung': record.heart_rate,
        'Tidur (jam)': record.sleep_duration,
        'Air (gelas)': record.water_intake,
        'Stres': record.stress_level,
        'Aktivitas (menit)': record.activity_level,
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }} className="text-sm">
                            {entry.name}: <strong>{entry.value}</strong>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Time Range Selector */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Tren Kesehatan
                </h3>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setTimeRange('7days')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${timeRange === '7days'
                                ? 'bg-primary-500 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        7 Hari
                    </button>
                    <button
                        onClick={() => setTimeRange('30days')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${timeRange === '30days'
                                ? 'bg-primary-500 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                            }`}
                    >
                        30 Hari
                    </button>
                </div>
            </div>

            {/* Heart Rate & Sleep Chart */}
            <div className="health-card">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Detak Jantung & Kualitas Tidur
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="Detak Jantung"
                            stroke={CHART_COLORS.heartRate}
                            strokeWidth={3}
                            dot={{ fill: CHART_COLORS.heartRate, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Tidur (jam)"
                            stroke={CHART_COLORS.sleep}
                            strokeWidth={3}
                            dot={{ fill: CHART_COLORS.sleep, r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Hydration & Activity Chart */}
            <div className="health-card">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Hidrasi & Aktivitas Fisik
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={CHART_COLORS.water} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={CHART_COLORS.water} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={CHART_COLORS.activity} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={CHART_COLORS.activity} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="Air (gelas)"
                            stroke={CHART_COLORS.water}
                            fillOpacity={1}
                            fill="url(#colorWater)"
                        />
                        <Area
                            type="monotone"
                            dataKey="Aktivitas (menit)"
                            stroke={CHART_COLORS.activity}
                            fillOpacity={1}
                            fill="url(#colorActivity)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Stress Level Chart */}
            <div className="health-card">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tingkat Stres
                </h4>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                        <XAxis dataKey="date" stroke="#6B7280" />
                        <YAxis domain={[0, 10]} stroke="#6B7280" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="Stres"
                            stroke={CHART_COLORS.stress}
                            strokeWidth={3}
                            dot={{ fill: CHART_COLORS.stress, r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HealthCharts;
