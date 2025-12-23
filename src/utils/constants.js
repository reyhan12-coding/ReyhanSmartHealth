// Indonesian UI Text Labels
export const LABELS = {
    // Authentication
    login: 'Masuk',
    register: 'Daftar',
    logout: 'Keluar',
    email: 'Email',
    password: 'Kata Sandi',
    confirmPassword: 'Konfirmasi Kata Sandi',
    fullName: 'Nama Lengkap',
    welcomeBack: 'Selamat Datang Kembali',
    createAccount: 'Buat Akun Baru',
    alreadyHaveAccount: 'Sudah punya akun?',
    dontHaveAccount: 'Belum punya akun?',

    // Navigation
    dashboard: 'Dasbor',
    healthData: 'Data Kesehatan',
    profile: 'Profil',
    chatbot: 'Chatbot Kesehatan',
    insights: 'Wawasan AI',

    // Health Metrics
    heartRate: 'Detak Jantung',
    heartRateBpm: 'Detak Jantung (BPM)',
    sleepDuration: 'Durasi Tidur',
    sleepDurationHours: 'Durasi Tidur (Jam)',
    waterIntake: 'Asupan Air',
    waterIntakeGlasses: 'Asupan Air (Gelas)',
    stressLevel: 'Tingkat Stres',
    stressLevelScale: 'Tingkat Stres (1-10)',
    activityLevel: 'Tingkat Aktivitas',
    activityLevelMinutes: 'Aktivitas Fisik (Menit)',
    mood: 'Suasana Hati',

    // Mood Options
    moodHappy: 'Senang',
    moodNeutral: 'Netral',
    moodSad: 'Sedih',
    moodAnxious: 'Cemas',
    moodEnergetic: 'Energik',
    moodTired: 'Lelah',

    // Actions
    save: 'Simpan',
    cancel: 'Batal',
    submit: 'Kirim',
    edit: 'Edit',
    delete: 'Hapus',
    viewMore: 'Lihat Lebih',
    close: 'Tutup',
    addData: 'Tambah Data',

    // Dashboard
    welcomeMessage: 'Selamat Datang',
    todayOverview: 'Ringkasan Hari Ini',
    weeklyTrends: 'Tren Mingguan',
    monthlyTrends: 'Tren Bulanan',
    noDataYet: 'Belum Ada Data',
    noDataMessage: 'Anda belum memasukkan data kesehatan. Mulai dengan menambahkan data kesehatan pertama Anda!',
    getStarted: 'Mulai Sekarang',

    // AI Insights
    aiInsights: 'Wawasan AI',
    recommendations: 'Rekomendasi',
    warnings: 'Peringatan',
    patterns: 'Pola yang Terdeteksi',
    riskPrediction: 'Prediksi Risiko',

    // Chatbot
    chatWithAI: 'Chat dengan AI Kesehatan',
    askQuestion: 'Tanya sesuatu...',
    chatPlaceholder: 'Ketik pertanyaan Anda tentang kesehatan...',

    // Common
    loading: 'Memuat...',
    error: 'Terjadi kesalahan',
    success: 'Berhasil',
    today: 'Hari Ini',
    yesterday: 'Kemarin',
    thisWeek: 'Minggu Ini',
    thisMonth: 'Bulan Ini',

    // Settings
    darkMode: 'Mode Gelap',
    lightMode: 'Mode Terang',
    settings: 'Pengaturan',
    language: 'Bahasa',
};

// Medical Disclaimers (Indonesian)
export const DISCLAIMERS = {
    main: '⚕️ DISCLAIMER MEDIS: Aplikasi ini BUKAN merupakan sistem diagnosis medis. Semua wawasan dan rekomendasi yang diberikan bersifat informasi umum untuk mendukung gaya hidup sehat. Selalu konsultasikan dengan profesional kesehatan untuk masalah medis.',

    aiInsight: 'Wawasan ini dihasilkan oleh analisis pola berbasis AI dan bukan merupakan diagnosis medis. Selalu konsultasikan dengan dokter untuk saran medis profesional.',

    chatbot: 'Chatbot ini memberikan informasi umum kesehatan dan bukan pengganti konsultasi medis profesional. Untuk kondisi medis serius, segera hubungi dokter atau layanan darurat.',

    dataPrivacy: '🔒 Data kesehatan Anda disimpan dengan aman dan hanya dapat diakses oleh Anda. Kami menjaga privasi Anda dengan serius.',
};

// Health Metric Ranges (for AI Analysis)
export const HEALTH_RANGES = {
    heartRate: {
        low: 60,
        normal: { min: 60, max: 100 },
        high: 100,
    },
    sleep: {
        low: 6,
        optimal: { min: 7, max: 9 },
        high: 9,
    },
    water: {
        low: 6,
        optimal: { min: 8, max: 10 },
        high: 10,
    },
    stress: {
        low: { min: 1, max: 3 },
        moderate: { min: 4, max: 6 },
        high: { min: 7, max: 10 },
    },
    activity: {
        low: 30,
        moderate: { min: 30, max: 60 },
        high: 60,
    },
};

// Chart Colors
export const CHART_COLORS = {
    heartRate: '#ef4444',
    sleep: '#8b5cf6',
    water: '#3b82f6',
    stress: '#f59e0b',
    activity: '#10b981',
    mood: '#ec4899',
};

// AI Insight Types
export const INSIGHT_TYPES = {
    INFO: 'info',
    WARNING: 'warning',
    ALERT: 'alert',
    SUCCESS: 'success',
};
