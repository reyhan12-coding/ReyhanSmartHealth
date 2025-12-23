import { HEALTH_RANGES, INSIGHT_TYPES, LABELS } from './constants';

/**
 * Advanced AI Insight Engine
 * Provides deep analytical reasoning, causal analysis, and pattern-based thinking
 * Uses sophisticated correlation detection and multi-day trend analysis
 * NO external AI APIs - pure rule-based analytical logic
 */

class AIInsightEngine {
    /**
     * Generate comprehensive deep-analysis health insights
     * @param {Array} healthRecords - Array of health data records (sorted newest first)
     * @returns {Object} - Insights object with analytical reasoning
     */
    static generateInsights(healthRecords) {
        if (!healthRecords || healthRecords.length === 0) {
            return {
                mainInsight: null,
                patterns: [],
                risks: [],
                recommendations: [],
                warnings: [],
            };
        }

        // Use last 5-7 entries for analysis
        const analysisWindow = Math.min(7, healthRecords.length);
        const recent = healthRecords.slice(0, analysisWindow).reverse(); // Chronological order

        // Generate the main comprehensive insight
        const mainInsight = this.generateComprehensiveInsight(recent, healthRecords);

        return {
            mainInsight,
            patterns: this.detectPatterns(recent),
            risks: this.predictRisks(recent),
            recommendations: this.generateRecommendations(recent),
            warnings: this.detectWarnings(recent),
        };
    }

    /**
     * Generate comprehensive analytical insight following the required structure
     */
    static generateComprehensiveInsight(recent, allRecords) {
        // Calculate metrics
        const metrics = this.calculateMetrics(recent);
        const trends = this.analyzeTrends(recent);
        const correlations = this.detectCorrelations(recent);
        const comparison = this.compareToBaseline(metrics, allRecords);

        // Determine primary concern
        const primaryConcern = this.identifyPrimaryConcern(metrics, trends, correlations);

        // Build insight components
        const summary = this.buildInsightSummary(metrics, trends, correlations, primaryConcern);
        const riskAnalysis = this.buildRiskAnalysis(metrics, trends, correlations, primaryConcern);
        const patternBreakdown = this.buildPatternBreakdown(recent, trends, correlations);
        const recommendations = this.buildActionableRecommendations(metrics, trends, correlations, primaryConcern);
        const futureAnalysis = this.buildForwardLookingInsight(metrics, trends, primaryConcern);

        return {
            summary,
            riskAnalysis,
            patternBreakdown,
            recommendations,
            futureAnalysis,
            disclaimer: 'Analisis ini bersifat informatif berdasarkan data Anda, bukan diagnosis medis.',
            metrics,
            analysedDays: recent.length,
        };
    }

    /**
     * Calculate comprehensive metrics from recent data
     */
    static calculateMetrics(records) {
        const metrics = {};
        const fields = ['heart_rate', 'sleep_duration', 'water_intake', 'stress_level', 'activity_level'];

        fields.forEach(field => {
            const values = records.map(r => r[field]).filter(v => v != null);
            metrics[field] = {
                current: values[values.length - 1] || 0,
                average: this.calculateAverage(records, field),
                min: values.length ? Math.min(...values) : 0,
                max: values.length ? Math.max(...values) : 0,
                trend: this.calculateTrend(values),
                variance: this.calculateVariance(values),
            };
        });

        // Mood analysis
        const moods = records.map(r => r.mood).filter(Boolean);
        metrics.mood = {
            distribution: this.getMoodDistribution(moods),
            trend: this.getMoodTrend(moods),
        };

        return metrics;
    }

    /**
     * Analyze trends over time
     */
    static analyzeTrends(records) {
        const trends = {};

        // Sleep trend
        const sleepValues = records.map(r => r.sleep_duration);
        trends.sleep = {
            direction: this.getTrendDirection(sleepValues),
            consistency: this.calculateConsistency(sleepValues),
            isDeclining: this.getTrendDirection(sleepValues) === 'menurun',
            isImproving: this.getTrendDirection(sleepValues) === 'meningkat',
        };

        // Stress trend
        const stressValues = records.map(r => r.stress_level);
        trends.stress = {
            direction: this.getTrendDirection(stressValues),
            consistency: this.calculateConsistency(stressValues),
            isEscalating: this.getTrendDirection(stressValues) === 'meningkat',
            isStable: this.getTrendDirection(stressValues) === 'stabil',
        };

        // Activity trend
        const activityValues = records.map(r => r.activity_level);
        trends.activity = {
            direction: this.getTrendDirection(activityValues),
            consistency: this.calculateConsistency(activityValues),
        };

        // Heart rate trend
        const hrValues = records.map(r => r.heart_rate);
        trends.heartRate = {
            direction: this.getTrendDirection(hrValues),
            isElevated: this.calculateAverage(records, 'heart_rate') > 90,
        };

        return trends;
    }

    /**
     * Detect correlations between different health metrics
     */
    static detectCorrelations(records) {
        const correlations = [];

        // Check stress-sleep correlation
        const highStressDays = records.filter(r => r.stress_level >= 7);
        if (highStressDays.length >= 2) {
            const avgSleepOnStressDays = highStressDays.reduce((sum, r) => sum + r.sleep_duration, 0) / highStressDays.length;
            const overallAvgSleep = this.calculateAverage(records, 'sleep_duration');

            if (avgSleepOnStressDays < overallAvgSleep - 0.5) {
                correlations.push({
                    type: 'stress_affects_sleep',
                    strength: 'tinggi',
                    description: `Pada ${highStressDays.length} hari dengan stres tinggi, Anda tidur rata-rata ${avgSleepOnStressDays.toFixed(1)} jam, lebih rendah ${(overallAvgSleep - avgSleepOnStressDays).toFixed(1)} jam dari rata-rata normal Anda.`,
                });
            }
        }

        // Check sleep-mood correlation
        const tiredDays = records.filter(
          r => r.mood === 'tired' || r.mood === 'anxious'
        );

        if (tiredDays.length >= 2) {

            const avgSleepOnTiredDays = tiredDays.reduce((sum, r) => sum + r.sleep_duration, 0) / tiredDays.length;

            if (avgSleepOnTiredDays < 6.5) {
                correlations.push({
                    type: 'sleep_affects_mood',
                    strength: 'sedang',
                    description: `Mood "lelah" atau "cemas" muncul pada ${tiredDays.length} hari, dan rata-rata tidur saat itu hanya ${avgSleepOnTiredDays.toFixed(1)} jam.`,
                });
            }
        }

        // Check activity-energy correlation
        const lowActivityDays = records.filter(r => r.activity_level < 20);
        if (lowActivityDays.length >= 3) {
            const moodsOnLowActivity = lowActivityDays.map(r => r.mood).filter(Boolean);
            const negativeMoodCount = moodsOnLowActivity.filter(m => ['tired', 'sad', 'anxious'].includes(m)).length;

            if (negativeMoodCount >= 2) {
                correlations.push({
                    type: 'activity_affects_mood',
                    strength: 'sedang',
                    description: `Pada ${lowActivityDays.length} hari dengan aktivitas rendah (< 20 menit), sebagian besar suasana hati cenderung negatif.`,
                });
            }
        }

        // Check hydration-energy correlation
        const lowWaterDays = records.filter(r => r.water_intake < 6);
        if (lowWaterDays.length >= 2) {
            const energyLevelOnLowWater = lowWaterDays.filter(r => r.mood === 'tired').length;

            if (energyLevelOnLowWater >= 1) {
                correlations.push({
                    type: 'hydration_affects_energy',
                    strength: 'ringan',
                    description: `Hidrasi rendah (< 6 gelas) terdeteksi pada ${lowWaterDays.length} hari, dan mood "lelah" muncul di beberapa hari tersebut.`,
                });
            }
        }

        return correlations;
    }

    /**
     * Compare current metrics to user's historical baseline
     */
    static compareToBaseline(metrics, allRecords) {
        if (allRecords.length < 10) {
            return { hasBaseline: false };
        }

        const baseline = {};
        const older = allRecords.slice(7, Math.min(14, allRecords.length));

        ['heart_rate', 'sleep_duration', 'water_intake', 'stress_level', 'activity_level'].forEach(field => {
            baseline[field] = this.calculateAverage(older, field);
        });

        const comparison = {};
        Object.keys(baseline).forEach(field => {
            const diff = metrics[field].average - baseline[field];
            const percentChange = (diff / baseline[field]) * 100;

            comparison[field] = {
                baseline: baseline[field],
                change: diff,
                percentChange,
                isImprovement: this.isImprovement(field, diff),
            };
        });

        return { hasBaseline: true, ...comparison };
    }

    /**
     * Identify the primary health concern
     */
    static identifyPrimaryConcern(metrics, trends, correlations) {
        const concerns = [];

        // Sleep deprivation is critical
        if (metrics.sleep_duration.average < 6) {
            concerns.push({
                factor: 'sleep',
                severity: metrics.sleep_duration.average < 5 ? 3 : 2,
                reason: 'Kurang tidur kronis',
            });
        }

        // Chronic high stress
        if (metrics.stress_level.average >= 7 && trends.stress.consistency > 0.7) {
            concerns.push({
                factor: 'stress',
                severity: 3,
                reason: 'Stres tinggi konsisten',
            });
        }

        // Elevated heart rate
        if (metrics.heart_rate.average > 95) {
            concerns.push({
                factor: 'heart_rate',
                severity: 2,
                reason: 'Detak jantung istirahat tinggi',
            });
        }

        // Very low activity
        if (metrics.activity_level.average < 15) {
            concerns.push({
                factor: 'activity',
                severity: 2,
                reason: 'Aktivitas fisik sangat rendah',
            });
        }

        // Dehydration
        if (metrics.water_intake.average < 5) {
            concerns.push({
                factor: 'hydration',
                severity: 1,
                reason: 'Hidrasi tidak memadai',
            });
        }

        // Return highest severity concern
        concerns.sort((a, b) => b.severity - a.severity);
        return concerns[0] || null;
    }

    /**
     * Build analytical insight summary (2-3 sentences)
     */
    static buildInsightSummary(metrics, trends, correlations, primaryConcern) {
        let summary = '';

        const avgSleep = metrics.sleep_duration.average;
        const avgStress = metrics.stress_level.average;
        const avgActivity = metrics.activity_level.average;
        const daysAnalyzed = 5; // Assuming minimum

        if (primaryConcern?.factor === 'sleep' && trends.sleep.isDeclining) {
            summary = `Analisis ${daysAnalyzed} hari terakhir menunjukkan pola tidur yang menurun dengan rata-rata ${avgSleep.toFixed(1)} jam per malam, berada di bawah standar minimal 7 jam. Tren penurunan ini ${correlations.length > 0 ? 'tampak berkaitan dengan ' + correlations[0].description.split(',')[0].toLowerCase() : 'dapat berdampak pada kesehatan jangka panjang'}. Data menunjukkan konsistensi rendah dalam durasi tidur, yang mengindikasikan pola istirahat yang tidak teratur.`;
        } else if (primaryConcern?.factor === 'stress' && correlations.some(c => c.type === 'stress_affects_sleep')) {
            summary = `Tingkat stres Anda menunjukkan rata-rata ${avgStress.toFixed(1)}/10 dalam periode observasi, dengan tren yang ${trends.stress.isEscalating ? 'cenderung meningkat' : 'relatif stabil di level tinggi'}. Analisis korelasi mengidentifikasi dampak langsung: hari-hari dengan stres tinggi secara konsisten diikuti oleh penurunan kualitas tidur. Pola ini membentuk siklus negatif di mana stres mengganggu istirahat, yang kemudian dapat memperburuk kemampuan mengelola stres keesokan harinya.`;
        } else if (avgActivity < 20 && correlations.some(c => c.type === 'activity_affects_mood')) {
            summary = `Aktivitas fisik Anda tercatat rata-rata ${avgActivity.toFixed(0)} menit per hari, jauh di bawah rekomendasi minimal 30 menit. Pola inaktivitas ini menunjukkan korelasi dengan suasana hati: ${correlations.find(c => c.type === 'activity_affects_mood').description} Kurangnya gerakan fisik dapat mengurangi produksi endorfin alami tubuh, yang berperan dalam regulasi mood dan energi.`;
        } else if (avgSleep >= 7 && avgStress <= 5 && avgActivity >= 30) {
            summary = `Berdasarkan analisis ${daysAnalyzed} hari terakhir, metrik kesehatan Anda menunjukkan keseimbangan yang baik: tidur rata-rata ${avgSleep.toFixed(1)} jam (memenuhi standar 7-9 jam), stres terkendali di level ${avgStress.toFixed(1)}/10, dan aktivitas fisik ${avgActivity.toFixed(0)} menit per hari. Konsistensi pola ini mengindikasikan kebiasaan yang mendukung kesehatan holistik. Namun, tetap penting untuk mempertahankan rutinitas ini dan waspada terhadap perubahan pola yang mungkin muncul.`;
        } else {
            // Mixed concern
            const issues = [];
            if (avgSleep < 7) issues.push(`tidur yang kurang memadai (${avgSleep.toFixed(1)} jam)`);
            if (avgStress >= 6) issues.push(`stres yang perlu dikelola (${avgStress.toFixed(1)}/10)`);
            if (avgActivity < 30) issues.push(`aktivitas fisik rendah (${avgActivity.toFixed(0)} menit)`);

            if (issues.length > 1) {
                summary = `Analisis data menunjukkan beberapa area yang memerlukan perhatian: ${issues.join(', ')}. Kombinasi faktor-faktor ini dapat saling mempengaruhi dan membentuk pola yang kurang optimal untuk kesejahteraan jangka panjang. ${correlations.length > 0 ? 'Terdeteksi adanya hubungan antar-metrik, di mana satu faktor tampak mempengaruhi yang lain.' : 'Meskipun tidak terdeteksi korelasi kuat antar-faktor, perbaikan pada satu area dapat memberikan efek positif keseluruhan.'}`;
            } else if (issues.length === 1) {
                summary = `Secara keseluruhan, metrik kesehatan Anda menunjukkan performa yang cukup baik dengan satu area yang memerlukan perhatian: ${issues[0]}. Faktor lainnya berada dalam rentang sehat, yang merupakan fondasi baik untuk melakukan perbaikan terfokus. ${trends.sleep.isImproving || trends.stress.direction === 'menurun' ? 'Tren terbaru menunjukkan arah yang positif.' : 'Konsistensi dalam area yang sudah baik perlu dipertahankan sambil meningkatkan area prioritas.'}`;
            } else {
                summary = `Data dari ${daysAnalyzed} hari terakhir menunjukkan profil kesehatan yang seimbang dengan semua metrik utama berada dalam rentang yang mendukung kesejahteraan. Tidur, stres, dan aktivitas fisik menunjukkan pola yang sehat dan konsisten. Penting untuk mempertahankan kebiasaan positif ini sebagai investasi jangka panjang untuk kesehatan.`;
            }
        }

        return summary;
    }

    /**
     * Build risk analysis with justification
     */
    static buildRiskAnalysis(metrics, trends, correlations, primaryConcern) {
        let riskLevel = 'Rendah';
        let justification = '';

        // Calculate risk score
        let score = 0;

        if (metrics.sleep_duration.average < 5) score += 3;
        else if (metrics.sleep_duration.average < 6.5) score += 2;
        else if (metrics.sleep_duration.average < 7) score += 1;

        if (metrics.stress_level.average >= 8) score += 3;
        else if (metrics.stress_level.average >= 7) score += 2;
        else if (metrics.stress_level.average >= 6) score += 1;

        if (metrics.activity_level.average < 15) score += 2;
        else if (metrics.activity_level.average < 25) score += 1;

        if (metrics.heart_rate.average > 100) score += 2;
        else if (metrics.heart_rate.average > 90) score += 1;

        if (metrics.water_intake.average < 5) score += 1;

        // Determine risk level
        if (score >= 7) {
            riskLevel = 'Tinggi';
            justification = `Level risiko tinggi ditentukan berdasarkan akumulasi ${score} poin dari berbagai faktor. `;

            const factors = [];
            if (metrics.sleep_duration.average < 6.5) factors.push(`kurang tidur kronis (${metrics.sleep_duration.average.toFixed(1)} jam)`);
            if (metrics.stress_level.average >= 7) factors.push(`stres berkelanjutan (${metrics.stress_level.average.toFixed(1)}/10)`);
            if (metrics.activity_level.average < 20) factors.push(`inaktivitas fisik (${metrics.activity_level.average.toFixed(0)} menit/hari)`);
            if (metrics.heart_rate.average > 95) factors.push(`detak jantung istirahat tinggi (${metrics.heart_rate.average.toFixed(0)} BPM)`);

            justification += `Kombinasi kritisnya mencakup: ${factors.join(', ')}. `;

            if (correlations.length > 0) {
                justification += `Lebih signifikan lagi, terdeteksi pola saling mempengaruhi di mana ${correlations[0].description.toLowerCase()} Siklus negatif ini dapat mempercepat penurunan kondisi jika tidak segera ditangani.`;
            } else {
                justification += `Meski faktor-faktor ini tampak independen, akumulasinya membentuk beban signifikan terhadap sistem tubuh yang dapat meningkatkan risiko masalah kesehatan lifestyle jangka panjang.`;
            }
        } else if (score >= 4) {
            riskLevel = 'Sedang';
            justification = `Level risiko sedang dengan skor ${score} poin mengindikasikan adanya ketidakseimbangan pada beberapa aspek gaya hidup. `;

            if (primaryConcern) {
                justification += `Area utama: ${primaryConcern.reason.toLowerCase()}, yang menjadi prioritas untuk diperbaiki. `;
            }

            if (trends.sleep.isDeclining || trends.stress.isEscalating) {
                justification += `Tren yang memburuk terdeteksi, sehingga risiko dapat meningkat jika pola saat ini berlanjut. `;
            }

            justification += `Pada level ini, intervensi dini melalui penyesuaian kebiasaan dapat efektif mencegah eskalasi risiko.`;
        } else if (score >= 1) {
            riskLevel = 'Rendah';
            justification = `Level risiko rendah dengan skor ${score} poin menunjukkan kondisi yang umumnya sehat dengan ruang untuk optimalisasi minor. `;

            const minorIssues = [];
            if (metrics.sleep_duration.average >= 6.5 && metrics.sleep_duration.average < 7) minorIssues.push('tidur mendekati batas minimal');
            if (metrics.stress_level.average >= 5 && metrics.stress_level.average < 6) minorIssues.push('stres di level menengah');
            if (metrics.activity_level.average >= 25 && metrics.activity_level.average < 30) minorIssues.push('aktivitas sedikit di bawah target');

            if (minorIssues.length > 0) {
                justification += `Perhatian kecil pada: ${minorIssues.join(', ')}. Penyesuaian ringan dapat membawa metrik ke zona optimal.`;
            } else {
                justification += `Profil kesehatan yang baik dengan fondasi kuat untuk kesejahteraan jangka panjang.`;
            }
        } else {
            riskLevel = 'Rendah';
            justification = `Level risiko rendah (skor ${score}) mencerminkan keseimbangan yang baik pada semua metrik kesehatan utama. Pola tidur, manajemen stres, aktivitas fisik, dan hidrasi berada dalam rentang yang mendukung kesehatan optimal. Fokus pada pemeliharaan konsistensi pola positif ini.`;
        }

        return { riskLevel, justification, score };
    }

    /**
     * Build pattern breakdown with day-by-day observations
     */
    static buildPatternBreakdown(records, trends, correlations) {
        const observations = [];

        // Sleep pattern observation
        const sleepValues = records.map(r => r.sleep_duration);
        const avgSleep = sleepValues.reduce((a, b) => a + b, 0) / sleepValues.length;
        const poorSleepDays = sleepValues.filter(s => s < 6).length;

        if (poorSleepDays >= 2) {
            observations.push(`Tidur kurang dari 6 jam terjadi pada ${poorSleepDays} dari ${records.length} hari (${((poorSleepDays / records.length) * 100).toFixed(0)}% periode)`);
        }

        if (trends.sleep.isDeclining) {
            observations.push(`Durasi tidur menunjukkan tren menurun: dari ${sleepValues[0].toFixed(1)} jam di awal periode menjadi ${sleepValues[sleepValues.length - 1].toFixed(1)} jam di hari terakhir`);
        }

        const sleepVariance = this.calculateVariance(sleepValues);
        if (sleepVariance > 1.5) {
            observations.push(`Pola tidur tidak konsisten dengan variasi ${sleepVariance.toFixed(1)} jam, menunjukkan jadwal yang tidak teratur`);
        }

        // Stress pattern observation
        const stressValues = records.map(r => r.stress_level);
        const highStressDays = stressValues.filter(s => s >= 7).length;

        if (highStressDays >= 2) {
            observations.push(`Stres level tinggi (≥7) terdeteksi pada ${highStressDays} hari, dengan puncak di ${Math.max(...stressValues)}/10`);
        }

        if (trends.stress.isEscalating) {
            observations.push(`Tingkat stres menunjukkan eskalasi: rata-rata ${stressValues.slice(0, 3).reduce((a, b) => a + b, 0) / 3} di 3 hari pertama meningkat menjadi ${stressValues.slice(-3).reduce((a, b) => a + b, 0) / 3} di 3 hari terakhir`);
        }

        // Activity observation
        const activityValues = records.map(r => r.activity_level);
        const inactiveDays = activityValues.filter(a => a < 20).length;

        if (inactiveDays >= 3) {
            observations.push(`Aktivitas fisik minimal (<20 menit) terjadi pada ${inactiveDays} hari, rata-rata hanya ${(activityValues.reduce((a, b) => a + b, 0) / activityValues.length).toFixed(0)} menit/hari`);
        }

        // Hydration observation
        const waterValues = records.map(r => r.water_intake);
        const dehydratedDays = waterValues.filter(w => w < 6).length;

        if (dehydratedDays >= 2) {
            observations.push(`Asupan air di bawah 6 gelas terjadi pada ${dehydratedDays} hari (target minimal 8 gelas)`);
        }

        // Heart rate observation
        const hrValues = records.map(r => r.heart_rate);
        const avgHR = hrValues.reduce((a, b) => a + b, 0) / hrValues.length;

        if (avgHR > 90) {
            observations.push(`Detak jantung istirahat rata-rata ${avgHR.toFixed(0)} BPM, ${avgHR > 100 ? 'berada di atas rentang normal (60-100 BPM)' : 'di ujung atas rentang normal'}`);
        }

        // Correlation observations
        correlations.forEach(corr => {
            observations.push(`Korelasi ${corr.strength}: ${corr.description}`);
        });

        // Mood observation
        const moods = records.map(r => r.mood).filter(Boolean);
        const negativeMoods = moods.filter(m => ['tired', 'sad', 'anxious'].includes(m));

        if (negativeMoods.length >= 2) {
            observations.push(`Suasana hati negatif (lelah/sedih/cemas) muncul pada ${negativeMoods.length} dari ${moods.length} hari yang tercatat`);
        }

        return observations;
    }

    /**
     * Build specific actionable recommendations
     */
    static buildActionableRecommendations(metrics, trends, correlations, primaryConcern) {
        const recommendations = [];

        // Priority addressing primary concern
        if (primaryConcern) {
            if (primaryConcern.factor === 'sleep') {
                recommendations.push({
                    priority: 1,
                    action: 'Tetapkan waktu tidur konsisten',
                    rationale: `Data menunjukkan tidur Anda rata-rata ${metrics.sleep_duration.average.toFixed(1)} jam, di bawah kebutuhan minimal 7 jam. Tidur pada jam yang sama setiap malam membantu mengatur ritme sirkadian.`,
                });

                if (metrics.stress_level.average >= 6) {
                    recommendations.push({
                        priority: 2,
                        action: 'Lakukan rutinitas relaksasi 30 menit sebelum tidur',
                        rationale: 'Tingkat stres Anda yang tinggi dapat mengganggu onset tidur. Teknik relaksasi seperti pernapasan dalam atau meditasi ringan dapat menurunkan kortisol.',
                    });
                }

                recommendations.push({
                    priority: 3,
                    action: 'Hentikan paparan layar (HP, laptop) minimal 1 jam sebelum tidur',
                    rationale: 'Cahaya biru dari layar menekan produksi melatonin, hormon yang mengatur tidur, memperpanjang waktu yang dibutuhkan untuk tertidur.',
                });
            } else if (primaryConcern.factor === 'stress') {
                recommendations.push({
                    priority: 1,
                    action: 'Praktikkan teknik pernapasan box (4-4-4-4) 3x sehari',
                    rationale: `Stres Anda konsisten di level ${metrics.stress_level.average.toFixed(1)}/10. Pernapasan terkontrol mengaktifkan sistem saraf parasimpatik, menurunkan kortisol dan detak jantung.`,
                });

                if (metrics.activity_level.average < 25) {
                    recommendations.push({
                        priority: 2,
                        action: 'Tambahkan 20 menit jalan kaki di pagi atau sore hari',
                        rationale: 'Aktivitas fisik meningkatkan produksi endorfin yang berfungsi sebagai penstabil mood alami dan mengurangi hormon stres.',
                    });
                }

                recommendations.push({
                    priority: 3,
                    action: 'Identifikasi dan catat 3 pemicu stres utama Anda',
                    rationale: 'Memahami pola pemicu stres memungkinkan Anda mengembangkan strategi coping yang spesifik dan efektif.',
                });
            } else if (primaryConcern.factor === 'activity') {
                recommendations.push({
                    priority: 1,
                    action: 'Mulai dengan target 15 menit aktivitas fisik setiap hari',
                    rationale: `Aktivitas Anda saat ini ${metrics.activity_level.average.toFixed(0)} menit/hari jauh di bawah rekomendasi. Mulai dari target kecil yang realistis meningkatkan konsistensi jangka panjang.`,
                });

                recommendations.push({
                    priority: 2,
                    action: 'Jadwalkan aktivitas di waktu yang sama setiap hari',
                    rationale: 'Konsistensi waktu membantu membentuk habit loop yang kuat, membuat aktivitas fisik menjadi otomatis dan tidak bergantung pada motivasi sesaat.',
                });

                if (correlations.some(c => c.type === 'activity_affects_mood')) {
                    recommendations.push({
                        priority: 3,
                        action: 'Pilih aktivitas yang Anda nikmati (jalan, bersepeda, tari)',
                        rationale: 'Data menunjukkan aktivitas rendah berkorelasi dengan mood negatif. Aktivitas yang menyenangkan memberikan manfaat ganda: fisik dan psikologis.',
                    });
                }
            } else if (primaryConcern.factor === 'heart_rate') {
                recommendations.push({
                    priority: 1,
                    action: 'Kurangi konsumsi kafein menjadi maksimal 1 cangkir sebelum jam 12 siang',
                    rationale: `Detak jantung istirahat Anda ${metrics.heart_rate.average.toFixed(0)} BPM lebih tinggi dari ideal. Kafein meningkatkan denyut jantung hingga 6-8 jam setelah konsumsi.`,
                });

                if (metrics.stress_level.average >= 6) {
                    recommendations.push({
                        priority: 2,
                        action: 'Praktikkan relaksasi progresif otot sebelum mengukur detak jantung',
                        rationale: 'Stres Anda yang tinggi dapat meningkatkan detak jantung istirahat. Teknik relaksasi otot menurunkan aktivasi sistem saraf simpatik.',
                    });
                }

                recommendations.push({
                    priority: 3,
                    action: 'Pantau detak jantung pada waktu dan kondisi yang sama setiap hari',
                    rationale: 'Konsistensi pengukuran (misalnya setiap pagi sebelum bangun tidur) memberikan data yang lebih akurat untuk mendeteksi pola.',
                });
            }
        }

        // Add correlation-based recommendations
        correlations.forEach(corr => {
            if (corr.type === 'stress_affects_sleep' && !recommendations.some(r => r.action.includes('relaksasi'))) {
                recommendations.push({
                    priority: 2,
                    action: 'Pisahkan waktu "worry time" di sore hari, jauhkan dari waktu tidur',
                    rationale: `Terdeteksi korelasi kuat: stres mengganggu tidur Anda. Mengalokasikan waktu khusus untuk memikirkan kekhawatiran mencegah intrusi pikiran saat mencoba tidur.`,
                });
            }

            if (corr.type === 'hydration_affects_energy' && !recommendations.some(r => r.action.includes('air'))) {
                recommendations.push({
                    priority: 3,
                    action: 'Minum 2 gelas air saat bangun tidur dan sebelum setiap makan',
                    rationale: `Data menunjukkan hidrasi rendah berkaitan dengan energi rendah. Jadwal terstruktur memastikan asupan minimal 6 gelas tanpa bergantung pada rasa haus.`,
                });
            }
        });

        // Fill to at least 5 recommendations
        while (recommendations.length < 5) {
            if (metrics.water_intake.average < 7 && !recommendations.some(r => r.action.includes('air'))) {
                recommendations.push({
                    priority: 4,
                    action: 'Bawa botol air 500ml dan isi ulang 3x sehari',
                    rationale: `Asupan air Anda ${metrics.water_intake.average.toFixed(1)} gelas/hari. Target visual (botol yang harus dihabiskan) lebih efektif daripada menghitung gelas.`,
                });
            } else if (!recommendations.some(r => r.action.includes('journaling'))) {
                recommendations.push({
                    priority: 5,
                    action: 'Catat pola tidur, stres, dan mood di aplikasi ini setiap hari',
                    rationale: 'Konsistensi pencatatan menghasilkan data yang lebih kaya untuk analisis pola dan identifikasi pemicu specific terhadap kondisi Anda.',
                });
            } else {
                recommendations.push({
                    priority: 5,
                    action: 'Evaluasi ulang metrik setelah 7 hari menerapkan 2 rekomendasi prioritas',
                    rationale: 'Perubahan kebiasaan memerlukan waktu. Evaluasi mingguan memungkinkan Anda melihat dampak nyata dan menyesuaikan strategi jika diperlukan.',
                });
                break;
            }
        }

        return recommendations.slice(0, 5);
    }

    /**
     * Build forward-looking insight
     */
    static buildForwardLookingInsight(metrics, trends, primaryConcern) {
        let currentPath = '';
        let improvedPath = '';

        const avgSleep = metrics.sleep_duration.average;
        const avgStress = metrics.stress_level.average;
        const avgActivity = metrics.activity_level.average;

        // Current trajectory
        if (primaryConcern) {
            if (primaryConcern.factor === 'sleep') {
                currentPath = `Jika pola tidur ${avgSleep.toFixed(1)} jam per malam berlanjut, Anda berisiko mengalami akumulasi sleep debt yang dapat bermanifestasi sebagai penurunan konsentrasi, gangguan metabolisme, dan peningkatan reaktivitas emosional dalam 2-4 minggu ke depan. `;

                if (trends.sleep.isDeclining) {
                    currentPath += `Tren penurunan yang terdeteksi mengindikasikan risiko ini dapat terjadi lebih cepat. `;
                }

                improvedPath = `Dengan meningkatkan tidur menjadi 7-8 jam konsisten dalam 7 hari ke depan, Anda dapat mulai merasakan peningkatan energi dan kemampuan mengelola stres. Dalam 2-3 minggu, perbaikan tidur dapat berdampak pada normalisasi detak jantung istirahat dan peningkatan performa kognitif.`;
            } else if (primaryConcern.factor === 'stress') {
                currentPath = `Stres konsisten di level ${avgStress.toFixed(1)}/10 tanpa intervensi dapat menyebabkan kelelahan kronis, gangguan tidur yang semakin memburuk, dan potensi burnout dalam 4-8 minggu. `;

                if (metrics.sleep_duration.average < 7) {
                    currentPath += `Kombinasi dengan kurang tidur membentuk siklus yang mempercepat penurunan kesejahteraan. `;
                }

                improvedPath = `Penerapan teknik manajemen stres harian (meditasi, pernapasan, aktivitas fisik) dapat menurunkan level stres sebesar 1-2 poin dalam 10-14 hari pertama. Penurunan stres membuka jalan untuk perbaikan kualitas tidur dan peningkatan energi secara beruntun.`;
            } else if (primaryConcern.factor === 'activity') {
                currentPath = `Aktivitas fisik ${avgActivity.toFixed(0)} menit/hari berada jauh di bawah minimal. Jika pola ini berlanjut, risiko penurunan massa otot, metabolisme yang lambat, dan mood yang rendah akan meningkat seiring waktu. `;

                improvedPath = `Meningkatkan aktivitas bertahap ke 20-30 menit per hari dalam 2 minggu dapat meningkatkan produksi endorfin, memperbaiki kualitas tidur, dan memberikan energi yang lebih stabil. Progres konsisten lebih penting daripada intensitas tinggi.`;
            } else {
                currentPath = `Pola saat ini menunjukkan area yang perlu perhatian. Tanpa penyesuaian, metrik yang borderline dapat bergeser ke zona risiko lebih tinggi dalam beberapa minggu. `;
                improvedPath = `Fokus pada 1-2 area prioritas dengan perubahan kecil dan konsisten dapat menghasilkan perbaikan terukur dalam 2-3 minggu, membawa seluruh profil kesehatan ke zona yang lebih optimal.`;
            }
        } else {
            // No major concern
            currentPath = `Mempertahankan pola saat ini akan menjaga Anda di zona kesehatan yang baik. Namun, konsistensi jangka panjang memerlukan awareness terhadap perubahan kecil yang mungkin menjadi tren negatif. `;
            improvedPath = `Optimalisasi lebih lanjut pada tidur, aktivitas, atau manajemen stres dapat meningkatkan resiliensi Anda terhadap stressor eksternal, memberikan buffer yang lebih besar saat menghadapi periode menantang di masa depan.`;
        }

        return {
            currentTrajectory: currentPath.trim(),
            improvedTrajectory: improvedPath.trim(),
        };
    }

    // ============================================================
    // HELPER METHODS
    // ============================================================

    static calculateAverage(records, field) {
        if (records.length === 0) return 0;
        const values = records.map(r => r[field]).filter(v => v != null);
        return values.reduce((sum, v) => sum + v, 0) / values.length;
    }

    static calculateVariance(values) {
        if (!values || values.length === 0) return 0;
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const squaredDiffs = values.map(v => Math.pow(v - avg, 2));
        return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / values.length);
    }   

    static calculateTrend(values) {
        if (values.length < 2) return 'stabil';
        const firstHalf = values.slice(0, Math.ceil(values.length / 2));
        const secondHalf = values.slice(Math.ceil(values.length / 2));
        const avgFirst = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
        const avgSecond = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
        return avgSecond - avgFirst;
    }

    static getTrendDirection(values) {
        const trend = this.calculateTrend(values);
        if (Math.abs(trend) < 0.3) return 'stabil';
        return trend > 0 ? 'meningkat' : 'menurun';
    }

    static calculateConsistency(values) {
        if (!values || values.length === 0) return 0;
        const avg = values.reduce((a, b) => a + b, 0) / values.length;

        if (avg === 0) return 0;
        const variance = this.calculateVariance(values);
        const cv = variance / avg;

        return 1 - Math.min(cv, 1);
    }


    static getMoodDistribution(moods) {
        const counts = {};
        moods.forEach(m => counts[m] = (counts[m] || 0) + 1);
        return counts;
    }

    static getMoodTrend(moods) {
        if (moods.length < 3) return 'tidak cukup data';

        const recent = moods.slice(-3);
        const negative = recent.filter(m => ['sad', 'anxious', 'tired'].includes(m)).length;
        const positive = recent.filter(m => ['happy', 'energetic'].includes(m)).length;

        if (positive > negative) return 'positif';
        if (negative > positive) return 'negatif';
        return 'netral';
    }

    static isImprovement(field, diff) {
        if (field === 'stress_level' || field === 'heart_rate') {
            return diff < 0; // Lower is better
        }
        return diff > 0; // Higher is better
    }

    // ============================================================
    // Legacy methods for backwards compatibility
    // ============================================================

    static detectPatterns(records) {
        // Simplified patterns for backwards compatibility
        return [];
    }

    static predictRisks(records) {
        // Simplified for backwards compatibility
        return [];
    }

    static generateRecommendations(records) {
        // Simplified for backwards compatibility
        return [];
    }

    static detectWarnings(records) {
        const warnings = [];
        const recent = records.slice(-3);

        if (recent.length < 3) return warnings;

        const highStressCount = recent.filter(r => r.stress_level >= 8).length;
        if (highStressCount >= 2) {
            warnings.push({
                severity: 'high',
                type: INSIGHT_TYPES.ALERT,
                title: '⚠️ Peringatan: Stres Sangat Tinggi',
                description: `Stres di level ≥8 terdeteksi pada ${highStressCount} dari 3 hari terakhir. Pola ini dapat berdampak pada sistem cardiovascular dan kualitas tidur Anda.`,
                action: 'Segera terapkan teknik manajemen stres (pernapasan dalam, meditasi singkat)',
            });
        }

        const lowSleepCount = recent.filter(r => r.sleep_duration < 5).length;
        if (lowSleepCount >= 2) {
            warnings.push({
                severity: 'high',
                type: INSIGHT_TYPES.ALERT,
                title: '⚠️ Peringatan: Kurang Tidur Parah',
                description: `Tidur <5 jam terjadi pada ${lowSleepCount} dari 3 hari terakhir. Sleep deprivation akut dapat mempengaruhi fungsi kognitif dan sistem imun.`,
                action: 'Prioritaskan tidur minimal 7 jam malam ini',
            });
        }

        const highHRCount = recent.filter(r => r.heart_rate > 110).length;
        if (highHRCount >= 2) {
            warnings.push({
                severity: 'medium',
                type: INSIGHT_TYPES.WARNING,
                title: '⚠️ Detak Jantung Istirahat Tinggi',
                description: `Detak jantung >110 BPM terdeteksi pada ${highHRCount} hari. Ini dapat mengindikasikan stres fisik/psikologis, dehidrasi, atau konsumsi stimulan berlebih.`,
                action: 'Monitor pola ini dan konsultasikan dengan profesional kesehatan jika berlanjut',
            });
        }

        return warnings;
    }

    static generateChatbotResponse(userMessage, healthRecords) {
        // Keep existing chatbot logic
        const message = userMessage.toLowerCase();
        const recent = healthRecords.slice(0, 7).reverse();

        if (message.includes('tidur') || message.includes('sleep')) {
            const avgSleep = this.calculateAverage(recent, 'sleep_duration');
            const trend = this.getTrendDirection(recent.map(r => r.sleep_duration));
            return `Analisis tidur Anda (${recent.length} hari terakhir): rata-rata ${avgSleep.toFixed(1)} jam dengan tren ${trend}. ${avgSleep < 7 ? `Ini di bawah rekomendasi 7-9 jam. Kurang tidur kronis dapat berdampak pada memori, mood, dan fungsi imun.` : `Durasi ini memenuhi standar sehat.`} ${trend === 'menurun' ? 'Perhatikan tren penurunan yang dapat mengindikasikan stressor baru atau perubahan rutinitas.' : ''}`;
        }

        if (message.includes('stres') || message.includes('stress')) {
            const avgStress = this.calculateAverage(recent, 'stress_level');
            const insights = this.generateInsights(healthRecords);
            const correlations = insights.mainInsight?.metrics ? this.detectCorrelations(recent) : [];

            let response = `Tingkat stres rata-rata Anda ${avgStress.toFixed(1)}/10 dalam periode observasi. `;

            if (avgStress >= 7) {
                response += `Level ini tergolong tinggi dan memerlukan perhatian. `;
            }

            if (correlations.some(c => c.type === 'stress_affects_sleep')) {
                response += `Data menunjukkan stres Anda berkorelasi dengan kualitas tidur: hari dengan stres tinggi cenderung diikuti tidur yang lebih sedikit. `;
            }

            response += `Rekomendasikan teknik pernapasan box breathing (4-4-4-4) atau meditasi mindfulness 10 menit setiap hari.`;

            return response;
        }

        if (message.includes('aktivitas') || message.includes('olahraga')) {
            const avgActivity = this.calculateAverage(recent, 'activity_level');
            return `Aktivitas fisik rata-rata Anda ${avgActivity.toFixed(0)} menit/hari. Target minimal WHO adalah 150 menit/minggu atau ~22 menit/hari. ${avgActivity < 20 ? `Anda berada di bawah target. Mulai dengan tambahan 10-15 menit jalan kaki dapat memberikan manfaat signifikan.` : `Anda memenuhi atau mendekati target, yang mendukung kesehatan cardiovascular dan mental.`}`;
        }

        if (message.includes('pola') || message.includes('analisis')) {
            const insights = this.generateInsights(healthRecords);
            if (insights.mainInsight) {
                return insights.mainInsight.summary;
            }
        }

        return `Saya dapat menganalisis data kesehatan Anda untuk memberikan wawasan tentang pola tidur, stres, aktivitas, dan korelasinya. Tanyakan tentang metrik spesifik atau minta "analisis pola" untuk overview komprehensif. Ingat: ini informasi lifestyle, bukan diagnosis medis.`;
    }
}

export default AIInsightEngine;
