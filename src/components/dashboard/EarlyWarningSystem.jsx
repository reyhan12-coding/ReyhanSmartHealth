import { AlertTriangle } from 'lucide-react';
import { DISCLAIMERS } from '../../utils/constants';
import AIInsightCard from '../ai/AIInsightCard';

const EarlyWarningSystem = ({ warnings }) => {
    if (!warnings || warnings.length === 0) {
        return null;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Peringatan Kesehatan
                </h3>
            </div>

            <div className="space-y-3">
                {warnings.map((warning, index) => (
                    <AIInsightCard key={index} insight={warning} />
                ))}
            </div>

            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    {DISCLAIMERS.aiInsight}
                </p>
            </div>
        </div>
    );
};

export default EarlyWarningSystem;
