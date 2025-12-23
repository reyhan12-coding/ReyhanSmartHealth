import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../config/supabaseClient';
import { LABELS } from '../../utils/constants';
import { User, Mail, Calendar, Edit2, Save } from 'lucide-react';
import LoadingSpinner from '../common/LoadingSpinner';

const UserProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
    });

    useEffect(() => {
        fetchProfile();
    }, [user]);

    const fetchProfile = async () => {
        if (!user) return;

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;

            setProfile(data);
            setFormData({
                full_name: data?.full_name || user.user_metadata?.full_name || '',
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ full_name: formData.full_name })
                .eq('id', user.id);

            if (error) throw error;

            await fetchProfile();
            setEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Memuat profil..." />;
    }

    const joinDate = user?.created_at
        ? new Date(user.created_at).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
        : '-';

    return (
        <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="card">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-block p-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mb-4">
                        <User className="w-16 h-16 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {LABELS.profile}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Kelola informasi akun Anda
                    </p>
                </div>

                {/* Profile Info */}
                <div className="space-y-6">
                    {/* Full Name */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3 flex-1">
                            <User className="w-5 h-5 text-gray-500" />
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Nama Lengkap
                                </p>
                                {editing ? (
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, full_name: e.target.value })
                                        }
                                        className="input-field mt-1"
                                    />
                                ) : (
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                        {profile?.full_name || user?.user_metadata?.full_name || '-'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* Join Date */}
                    <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Calendar className="w-5 h-5 text-gray-500" />
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Bergabung Sejak
                            </p>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {joinDate}
                            </p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        {editing ? (
                            <div className="flex space-x-3">
                                <button
                                    onClick={handleSave}
                                    className="btn btn-primary flex-1 flex items-center justify-center space-x-2"
                                >
                                    <Save className="w-5 h-5" />
                                    <span>{LABELS.save}</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setEditing(false);
                                        setFormData({
                                            full_name: profile?.full_name || user?.user_metadata?.full_name || '',
                                        });
                                    }}
                                    className="btn btn-outline flex-1"
                                >
                                    {LABELS.cancel}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setEditing(true)}
                                className="btn btn-primary w-full flex items-center justify-center space-x-2"
                            >
                                <Edit2 className="w-5 h-5" />
                                <span>{LABELS.edit}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Privacy Note */}
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-300">
                    🔒 <strong>Privasi Anda:</strong> Data kesehatan Anda disimpan dengan aman dan hanya dapat diakses oleh Anda. Kami tidak membagikan informasi Anda dengan pihak ketiga.
                </p>
            </div>
        </div>
    );
};

export default UserProfile;
