import { AlertCircle, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import { INSIGHT_TYPES } from '../../utils/constants';

const AIInsightCard = ({ insight }) => {
    const getIconAndStyle = () => {
        switch (insight.type) {
            case INSIGHT_TYPES.ALERT:
                return {
                    icon: AlertCircle,
                    bgColor: 'bg-red-50 dark:bg-red-900/20',
                    borderColor: 'border-red-200 dark:border-red-800',
                    iconColor: 'text-red-500',
                    titleColor: 'text-red-900 dark:text-red-300',
                };
            case INSIGHT_TYPES.WARNING:
                return {
                    icon: AlertTriangle,
                    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
                    borderColor: 'border-yellow-200 dark:border-yellow-800',
                    iconColor: 'text-yellow-500',
                    titleColor: 'text-yellow-900 dark:text-yellow-300',
                };
            case INSIGHT_TYPES.SUCCESS:
                return {
                    icon: CheckCircle,
                    bgColor: 'bg-green-50 dark:bg-green-900/20',
                    borderColor: 'border-green-200 dark:border-green-800',
                    iconColor: 'text-green-500',
                    titleColor: 'text-green-900 dark:text-green-300',
                };
            default:
                return {
                    icon: Info,
                    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                    borderColor: 'border-blue-200 dark:border-blue-800',
                    iconColor: 'text-blue-500',
                    titleColor: 'text-blue-900 dark:text-blue-300',
                };
        }
    };

    const { icon: Icon, bgColor, borderColor, iconColor, titleColor } = getIconAndStyle();

    return (
        <div className={`p-4 rounded-lg border ${bgColor} ${borderColor} transition-all duration-200 hover:shadow-md`}>
            <div className="flex items-start space-x-3">
                <div className={`flex-shrink-0 ${iconColor}`}>
                    {insight.icon ? (
                        <span className="text-2xl">{insight.icon}</span>
                    ) : (
                        <Icon className="w-6 h-6" />
                    )}
                </div>
                <div className="flex-1">
                    <h4 className={`font-bold ${titleColor} mb-1`}>
                        {insight.title}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        {insight.description}
                    </p>
                    {insight.action && (
                        <p className="text-xs font-semibold text-gray-900 dark:text-white mt-2">
                            → {insight.action}
                        </p>
                    )}
                    {insight.tips && (
                        <ul className="mt-2 space-y-1">
                            {insight.tips.slice(0, 3).map((tip, index) => (
                                <li key={index} className="text-xs text-gray-600 dark:text-gray-400">
                                    • {tip}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIInsightCard;
