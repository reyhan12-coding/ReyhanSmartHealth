import { useState } from 'react';
import { useHealthData } from '../../hooks/useHealthData';
import { LABELS } from '../../utils/constants';
import { Save, Heart, Moon, Droplet, Activity, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HealthDataForm = () => {
    const { addHealthRecord } = useHealthData();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        heart_rate: '',
        sleep_duration: '',
        water_intake: '',
        stress_level: 5,
        activity_level: '',
        mood: 'neutral',
    });

    const moods = [
        { value: 'happy', label: LABELS.moodHappy, emoji: '😊' },
        { value: 'neutral', label: LABELS.moodNeutral, emoji: '😐' },
        { value: 'sad', label: LABELS.moodSad, emoji: '😢' },
        { value: 'anxious', label: LABELS.moodAnxious, emoji: '😰' },
        { value: 'energetic', label: LABELS.moodEnergetic, emoji: '⚡' },
        { value: 'tired', label: LABELS.moodTired, emoji: '😴' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Convert to numbers
        const recordData = {
            heart_rate: parseFloat(formData.heart_rate),
            sleep_duration: parseFloat(formData.sleep_duration),
            water_intake: parseInt(formData.water_intake),
            stress_level: parseInt(formData.stress_level),
            activity_level: parseInt(formData.activity_level),
            mood: formData.mood,
        };

        const { error } = await addHealthRecord(recordData);

        setLoading(false);

        if (!error) {
            setSuccess(true);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    };

    if (success) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="card text-center space-y-4 animate-slide-up">
                    <div className="inline-block p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                        <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Data Berhasil Disimpan!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Mengalihkan ke dashboard...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto animate-slide-up">
            <div className="card">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {LABELS.addData}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Masukkan data kesehatan Anda hari ini untuk mendapatkan analisis dan rekomendasi personal.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Heart Rate */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                            <Heart className="w-5 h-5 text-red-500" />
                            <span>{LABELS.heartRateBpm}</span>
                        </label>
                        <input
                            type="number"
                            name="heart_rate"
                            value={formData.heart_rate}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Contoh: 72"
                            min="40"
                            max="200"
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Normal: 60-100 BPM (saat istirahat)
                        </p>
                    </div>

                    {/* Sleep Duration */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                            <Moon className="w-5 h-5 text-purple-500" />
                            <span>{LABELS.sleepDurationHours}</span>
                        </label>
                        <input
                            type="number"
                            name="sleep_duration"
                            value={formData.sleep_duration}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Contoh: 7.5"
                            min="0"
                            max="24"
                            step="0.5"
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Optimal: 7-9 jam per malam
                        </p>
                    </div>

                    {/* Water Intake */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                            <Droplet className="w-5 h-5 text-blue-500" />
                            <span>{LABELS.waterIntakeGlasses}</span>
                        </label>
                        <input
                            type="number"
                            name="water_intake"
                            value={formData.water_intake}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Contoh: 8"
                            min="0"
                            max="30"
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Target: 8-10 gelas per hari (1 gelas ≈ 250ml)
                        </p>
                    </div>

                    {/* Stress Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {LABELS.stressLevelScale}
                        </label>
                        <div className="space-y-2">
                            <input
                                type="range"
                                name="stress_level"
                                value={formData.stress_level}
                                onChange={handleChange}
                                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                min="1"
                                max="10"
                            />
                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span>1 (Rendah)</span>
                                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                                    {formData.stress_level}
                                </span>
                                <span>10 (Tinggi)</span>
                            </div>
                        </div>
                    </div>

                    {/* Activity Level */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center space-x-2">
                            <Activity className="w-5 h-5 text-green-500" />
                            <span>{LABELS.activityLevelMinutes}</span>
                        </label>
                        <input
                            type="number"
                            name="activity_level"
                            value={formData.activity_level}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Contoh: 30"
                            min="0"
                            max="1440"
                            required
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            Target minimal: 30 menit per hari
                        </p>
                    </div>

                    {/* Mood */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
                            <Smile className="w-5 h-5 text-pink-500" />
                            <span>{LABELS.mood}</span>
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {moods.map((mood) => (
                                <button
                                    key={mood.value}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, mood: mood.value })}
                                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${formData.mood === mood.value
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'
                                        }`}
                                >
                                    <div className="text-3xl mb-1">{mood.emoji}</div>
                                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {mood.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full flex items-center justify-center space-x-2 py-4 text-lg"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Menyimpan...</span>
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    <span>{LABELS.save}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    💡 <strong>Tips:</strong> Input data setiap hari untuk mendapatkan analisis tren yang lebih akurat dan rekomendasi yang lebih personal dari AI.
                </p>
            </div>
        </div>
    );
};

export default HealthDataForm;
