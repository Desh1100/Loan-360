import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';

export const exportAnalyticsToPDF = async (analyticsData, activeSection) => {
  try {
    // Check if data exists
    if (!analyticsData || Object.keys(analyticsData).length === 0) {
      throw new Error('No data available for export. Please ensure you have data loaded and try again.');
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Add header with logo and title
    pdf.setFontSize(24);
    pdf.setTextColor(139, 69, 19);
    pdf.text('Loan Analytics Report', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 30;

    // Add overview statistics
    if (analyticsData.overview && Object.keys(analyticsData.overview).length > 0) {
      pdf.setFontSize(16);
      pdf.setTextColor(139, 69, 19);
      pdf.text('Overview Statistics', 20, yPosition);
      yPosition += 15;

      const overviewData = [
        ['Metric', 'Value', 'Description'],
        ['Total Applications', (analyticsData.overview.totalApplications || 0).toLocaleString(), 'All time applications'],
        ['Approved Loans', (analyticsData.overview.approvedLoans || 0).toLocaleString(), 'Successfully approved'],
        ['Pending Reviews', (analyticsData.overview.pendingLoans || 0).toLocaleString(), 'Awaiting decision'],
        ['Rejected Applications', (analyticsData.overview.rejectedLoans || 0).toLocaleString(), 'Not approved'],
        ['Approval Rate', `${analyticsData.overview.approvalRate || 0}%`, 'Success percentage'],
        ['Total Disbursed', `LKR ${(analyticsData.overview.totalDisbursed || 0).toLocaleString()}`, 'Amount disbursed'],
        ['Average Loan Amount', `LKR ${(analyticsData.overview.averageLoanAmount || 0).toLocaleString()}`, 'Per approved application']
      ];

      autoTable(pdf, {
        head: [overviewData[0]],
        body: overviewData.slice(1),
        startY: yPosition,
        headStyles: { fillColor: [139, 69, 19], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 222, 179] },
        margin: { left: 20, right: 20 },
        styles: { fontSize: 10 }
      });

      yPosition = yPosition + (overviewData.length * 8) + 30;
    }

    // Add status distribution data if available
    if (analyticsData.statusDistribution && Array.isArray(analyticsData.statusDistribution) && analyticsData.statusDistribution.length > 0) {
      if (yPosition > pageHeight - 80) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.setTextColor(139, 69, 19);
      pdf.text('Application Status Distribution', 20, yPosition);
      yPosition += 15;

      const statusData = [
        ['Status', 'Count', 'Percentage'],
        ...analyticsData.statusDistribution.map(item => {
          const total = analyticsData.statusDistribution.reduce((sum, s) => sum + (s.value || s.count || 0), 0);
          const percentage = total > 0 ? ((item.value || item.count || 0) / total * 100).toFixed(1) : '0';
          return [
            item.name || item.status || 'Unknown',
            (item.value || item.count || 0).toString(),
            `${percentage}%`
          ];
        })
      ];

      autoTable(pdf, {
        head: [statusData[0]],
        body: statusData.slice(1),
        startY: yPosition,
        headStyles: { fillColor: [139, 69, 19], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 222, 179] },
        margin: { left: 20, right: 20 },
        styles: { fontSize: 10 }
      });

      yPosition = yPosition + (statusData.length * 8) + 30;
    }

    // Add monthly summary data if available
    if (analyticsData.monthlySummary && Array.isArray(analyticsData.monthlySummary) && analyticsData.monthlySummary.length > 0) {
      if (yPosition > pageHeight - 100) {
        pdf.addPage();
        yPosition = 20;
      }

      pdf.setFontSize(16);
      pdf.setTextColor(139, 69, 19);
      pdf.text('Monthly Summary', 20, yPosition);
      yPosition += 15;

      const monthlyData = [
        ['Month', 'Applications', 'Approved', 'Rejected', 'Pending'],
        ...analyticsData.monthlySummary.slice(0, 12).map(item => [
          item.month || '',
          (item.applications || 0).toString(),
          (item.approved || 0).toString(),
          (item.rejected || 0).toString(),
          (item.pending || 0).toString()
        ])
      ];

      autoTable(pdf, {
        head: [monthlyData[0]],
        body: monthlyData.slice(1),
        startY: yPosition,
        headStyles: { fillColor: [139, 69, 19], textColor: 255 },
        alternateRowStyles: { fillColor: [245, 222, 179] },
        margin: { left: 20, right: 20 },
        styles: { fontSize: 9 }
      });
    }

    // Add footer with timestamp and page numbers
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
      pdf.text('Loan Analytics Dashboard - Confidential', 20, pageHeight - 10);
    }

    // Save the PDF
    pdf.save(`Loan_Analytics_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const captureChartsAsPDF = async () => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = 20;

    // Add header
    pdf.setFontSize(24);
    pdf.setTextColor(139, 69, 19);
    pdf.text('Loan Analytics Charts Report', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 30;

    // Capture charts from DOM elements
    const chartElements = [
      { selector: '[data-chart="trend-charts"]', title: 'Application Trends' },
      { selector: '[data-chart="status-distribution"]', title: 'Status Distribution' },
      { selector: '[data-chart="financial-analysis"]', title: 'Financial Analysis' },
      { selector: '[data-chart="demographic-charts"]', title: 'Demographic Analysis' }
    ];

    for (const chart of chartElements) {
      const element = document.querySelector(chart.selector);
      if (element) {
        try {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          const imgData = canvas.toDataURL('image/png');
          const imgWidth = pageWidth - 40;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (yPosition + imgHeight > pageHeight - 20) {
            pdf.addPage();
            yPosition = 20;
          }

          pdf.setFontSize(14);
          pdf.setTextColor(139, 69, 19);
          pdf.text(chart.title, 20, yPosition);
          yPosition += 10;

          pdf.addImage(imgData, 'PNG', 20, yPosition, imgWidth, imgHeight);
          yPosition += imgHeight + 20;
        } catch (chartError) {
          console.warn(`Could not capture chart: ${chart.title}`, chartError);
        }
      }
    }

    // Save the PDF
    pdf.save(`Loan_Analytics_Charts_${new Date().toISOString().split('T')[0]}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating charts PDF:', error);
    throw error;
  }
};