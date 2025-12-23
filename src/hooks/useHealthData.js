import { useState, useEffect } from 'react';
import { supabase } from '../config/supabaseClient';
import { useAuth } from '../contexts/AuthContext';

/**
 * Custom hook to fetch and manage user health data
 */
export const useHealthData = () => {
    const { user } = useAuth();
    const [healthRecords, setHealthRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchHealthData = async () => {
        if (!user) {
            setHealthRecords([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('health_records')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            setHealthRecords(data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching health data:', err);
        } finally {
            setLoading(false);
        }
    };

    const addHealthRecord = async (recordData) => {
        if (!user) return { error: 'User not authenticated' };

        try {
            const { data, error } = await supabase
                .from('health_records')
                .insert([
                    {
                        user_id: user.id,
                        ...recordData,
                    }
                ])
                .select();

            if (error) throw error;

            // Refresh data
            await fetchHealthData();

            return { data, error: null };
        } catch (err) {
            return { data: null, error: err.message };
        }
    };

    const deleteHealthRecord = async (id) => {
        try {
            const { error } = await supabase
                .from('health_records')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id);

            if (error) throw error;

            // Refresh data
            await fetchHealthData();

            return { error: null };
        } catch (err) {
            return { error: err.message };
        }
    };

    useEffect(() => {
        fetchHealthData();
    }, [user]);

    return {
        healthRecords,
        loading,
        error,
        fetchHealthData,
        addHealthRecord,
        deleteHealthRecord,
    };
};
