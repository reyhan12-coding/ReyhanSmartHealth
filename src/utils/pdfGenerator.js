import jsPDF from 'jspdf';

/**
 * Generate Professional Health Insights PDF Report
 * @param {Object} mainInsight - Comprehensive insight data from AIInsightEngine
 * @param {Object} user - User information
 * @param {Object} metrics - Health metrics summary
 * @returns {void} - Triggers PDF download
 */
export const generateHealthInsightPDF = (mainInsight, user, metrics = null) => {
    try {
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const contentWidth = pageWidth - (margin * 2);
        let yPosition = margin;

        // Helper function to check if new page is needed
        const checkPageBreak = (requiredSpace = 10) => {
            if (yPosition + requiredSpace > pageHeight - margin) {
                doc.addPage();
                yPosition = margin;
                return true;
            }
            return false;
        };

        // Helper function to add wrapped text
        const addText = (text, x, y, options = {}) => {
            const fontSize = options.fontSize || 10;
            const maxWidth = options.maxWidth || contentWidth;
            const align = options.align || 'left';
            const isBold = options.bold || false;

            doc.setFont('helvetica', isBold ? 'bold' : 'normal');
            doc.setFontSize(fontSize);

            const lines = doc.splitTextToSize(text, maxWidth);

            lines.forEach((line, index) => {
                checkPageBreak();
                if (align === 'center') {
                    doc.text(line, pageWidth / 2, y + (index * fontSize * 0.5), { align: 'center' });
                } else {
                    doc.text(line, x, y + (index * fontSize * 0.5));
                }
            });

            return y + (lines.length * fontSize * 0.5);
        };

        // ========================================
        // 1. HEADER
        // ========================================

        // App name/logo
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.setTextColor(20, 184, 166); // Primary color (teal)
        doc.text('ReyhanSmartHealth', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 10;

        // Title
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text('Laporan Wawasan Kesehatan Berbasis AI', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // User info and date
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);

        const userName = user?.user_metadata?.full_name || user?.email || 'Pengguna';
        const reportDate = new Date().toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

        doc.text(`Nama: ${userName}`, margin, yPosition);
        yPosition += 6;
        doc.text(`Tanggal Laporan: ${reportDate}`, margin, yPosition);
        yPosition += 6;
        doc.text(`Periode Analisis: ${mainInsight.analysedDays} hari terakhir`, margin, yPosition);
        yPosition += 10;

        // Divider line
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 10;

        // ========================================
        // 2. RINGKASAN ANALISIS
        // ========================================

        checkPageBreak(30);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('📊 Ringkasan Analisis', margin, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);

        const summaryLines = doc.splitTextToSize(mainInsight.summary, contentWidth);
        summaryLines.forEach(line => {
            checkPageBreak();
            doc.text(line, margin, yPosition);
            yPosition += 5;
        });
        yPosition += 5;

        // Disclaimer
        doc.setFontSize(9);
        doc.setTextColor(150, 50, 50);
        const disclaimerText = '⚕️ DISCLAIMER: ' + mainInsight.disclaimer;
        const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth);
        disclaimerLines.forEach(line => {
            checkPageBreak();
            doc.text(line, margin, yPosition);
            yPosition += 4;
        });
        yPosition += 10;

        // ========================================
        // 3. ANALISIS RISIKO
        // ========================================

        checkPageBreak(40);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text('⚠️ Analisis Risiko', margin, yPosition);
        yPosition += 8;

        // Risk level box
        const riskLevel = mainInsight.riskAnalysis.riskLevel;
        const riskColors = {
            'Tinggi': [239, 68, 68],
            'Sedang': [245, 158, 11],
            'Rendah': [34, 197, 94],
        };
        const riskColor = riskColors[riskLevel] || [100, 100, 100];

        doc.setFillColor(...riskColor);
        doc.roundedRect(margin, yPosition, 40, 10, 2, 2, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(255, 255, 255);
        doc.text(riskLevel, margin + 20, yPosition + 7, { align: 'center' });

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.text(`Level Risiko Gaya Hidup`, margin + 45, yPosition + 7);
        yPosition += 15;

        // Risk score
        if (mainInsight.riskAnalysis.score !== undefined) {
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            doc.text(`Skor Risiko: ${mainInsight.riskAnalysis.score} / 10+`, margin, yPosition);
            yPosition += 8;
        }

        // Justification
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(50, 50, 50);
        const justificationLines = doc.splitTextToSize(mainInsight.riskAnalysis.justification, contentWidth);
        justificationLines.forEach(line => {
            checkPageBreak();
            doc.text(line, margin, yPosition);
            yPosition += 5;
        });
        yPosition += 10;

        // ========================================
        // 4. POLA & KORELASI
        // ========================================

        if (mainInsight.patternBreakdown && mainInsight.patternBreakdown.length > 0) {
            checkPageBreak(30);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text('🔍 Pola yang Terdeteksi', margin, yPosition);
            yPosition += 8;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(50, 50, 50);

            mainInsight.patternBreakdown.forEach((pattern, index) => {
                checkPageBreak(10);

                const bullet = `${index + 1}.`;
                doc.text(bullet, margin, yPosition);

                const patternLines = doc.splitTextToSize(pattern, contentWidth - 10);
                patternLines.forEach((line, lineIndex) => {
                    if (lineIndex > 0) checkPageBreak();
                    doc.text(line, margin + 8, yPosition + (lineIndex * 5));
                });

                yPosition += (patternLines.length * 5) + 3;
            });

            yPosition += 5;
        }

        // ========================================
        // 5. REKOMENDASI PRIORITAS
        // ========================================

        if (mainInsight.recommendations && mainInsight.recommendations.length > 0) {
            checkPageBreak(40);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text('💡 Rekomendasi Prioritas', margin, yPosition);
            yPosition += 8;

            const topRecommendations = mainInsight.recommendations.slice(0, 5);

            topRecommendations.forEach((rec, index) => {
                checkPageBreak(20);

                // Priority number
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(11);
                doc.setTextColor(20, 184, 166);
                doc.text(`Prioritas #${rec.priority}:`, margin, yPosition);
                yPosition += 6;

                // Action
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(10);
                doc.setTextColor(0, 0, 0);
                const actionLines = doc.splitTextToSize(rec.action, contentWidth - 5);
                actionLines.forEach(line => {
                    checkPageBreak();
                    doc.text(line, margin + 2, yPosition);
                    yPosition += 5;
                });

                // Rationale
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);
                doc.setTextColor(80, 80, 80);
                doc.text('Alasan:', margin + 2, yPosition);
                yPosition += 5;

                const rationaleLines = doc.splitTextToSize(rec.rationale, contentWidth - 5);
                rationaleLines.forEach(line => {
                    checkPageBreak();
                    doc.text(line, margin + 2, yPosition);
                    yPosition += 4;
                });

                yPosition += 6;
            });

            yPosition += 5;
        }

        // ========================================
        // 6. PREDIKSI & ARAH KE DEPAN
        // ========================================

        if (mainInsight.futureAnalysis) {
            checkPageBreak(50);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text('📈 Prediksi & Arah Ke Depan', margin, yPosition);
            yPosition += 10;

            // Current trajectory
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(220, 38, 38);
            doc.text('▼ Jika Pola Berlanjut:', margin, yPosition);
            yPosition += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(50, 50, 50);
            const currentLines = doc.splitTextToSize(mainInsight.futureAnalysis.currentTrajectory, contentWidth);
            currentLines.forEach(line => {
                checkPageBreak();
                doc.text(line, margin, yPosition);
                yPosition += 5;
            });
            yPosition += 8;

            // Improved trajectory
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.setTextColor(34, 197, 94);
            doc.text('▲ Dengan Perbaikan:', margin, yPosition);
            yPosition += 6;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.setTextColor(50, 50, 50);
            const improvedLines = doc.splitTextToSize(mainInsight.futureAnalysis.improvedTrajectory, contentWidth);
            improvedLines.forEach(line => {
                checkPageBreak();
                doc.text(line, margin, yPosition);
                yPosition += 5;
            });
            yPosition += 10;
        }

        // ========================================
        // 7. DATA RINGKASAN (Optional)
        // ========================================

        if (metrics) {
            checkPageBreak(40);

            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.text('📋 Ringkasan Data Kesehatan', margin, yPosition);
            yPosition += 8;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);

            const metricsData = [
                { label: 'Rata-rata Tidur', value: `${metrics.avgSleep || '-'} jam/malam` },
                { label: 'Rata-rata Tingkat Stres', value: `${metrics.avgStress || '-'} / 10` },
                { label: 'Rata-rata Aktivitas Fisik', value: `${metrics.avgActivity || '-'} menit/hari` },
                { label: 'Rata-rata Detak Jantung', value: `${metrics.avgHeartRate || '-'} BPM` },
                { label: 'Rata-rata Asupan Air', value: `${metrics.avgWater || '-'} gelas/hari` },
            ];

            metricsData.forEach(metric => {
                checkPageBreak();
                doc.setTextColor(100, 100, 100);
                doc.text(`${metric.label}:`, margin, yPosition);
                doc.setTextColor(0, 0, 0);
                doc.setFont('helvetica', 'bold');
                doc.text(metric.value, margin + 60, yPosition);
                doc.setFont('helvetica', 'normal');
                yPosition += 6;
            });

            yPosition += 10;
        }

        // ========================================
        // 8. FOOTER
        // ========================================

        // Go to last page for footer
        const totalPages = doc.getNumberOfPages();
        doc.setPage(totalPages);

        // Add footer at bottom of last page
        const footerY = pageHeight - 20;

        doc.setDrawColor(200, 200, 200);
        doc.line(margin, footerY - 5, pageWidth - margin, footerY - 5);

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(8);
        doc.setTextColor(120, 120, 120);
        doc.text('Catatan: Laporan ini bersifat informatif dan bukan diagnosis medis.', pageWidth / 2, footerY, { align: 'center' });
        doc.text('Generated by ReyhanSmartHealth AI', pageWidth / 2, footerY + 4, { align: 'center' });
        doc.setFont('helvetica', 'normal');
        doc.text(`Halaman ${totalPages}`, pageWidth - margin, footerY + 4, { align: 'right' });

        // Save and download PDF
        const fileName = `ReyhanSmartHealth_Laporan_${new Date().toLocaleDateString('id-ID').replace(/\//g, '-')}.pdf`;
        doc.save(fileName);

        return { success: true, fileName };
    } catch (error) {
        console.error('Error generating PDF:', error);
        return { success: false, error: error.message };
    }
};
