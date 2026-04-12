import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * Generate a formatted FIR PDF document
 */
export function generateFIRPdf(firData, caseData, officerData, stationData, followups) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let y = margin;

  // ---- Header ----
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 45, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('FIRST INFORMATION REPORT', pageWidth / 2, 18, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('THUNA — Crime Transparency Portal', pageWidth / 2, 26, { align: 'center' });

  doc.setFontSize(9);
  doc.text(`Kerala Police — ${stationData?.district || 'Ernakulam'} District`, pageWidth / 2, 33, { align: 'center' });

  y = 55;

  // ---- FIR Details Box ----
  doc.setTextColor(15, 23, 42);
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.rect(margin, y, contentWidth, 10);

  doc.setFillColor(239, 246, 255);
  doc.rect(margin, y, contentWidth, 10, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(59, 130, 246);
  doc.text(`FIR No: ${firData.fir_number}`, margin + 5, y + 7);

  const dateStr = new Date(firData.fir_date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Date: ${dateStr}`, pageWidth - margin - 5, y + 7, { align: 'right' });

  y += 18;

  // ---- FIR Information Table ----
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('FIR DETAILS', margin, y);
  y += 6;

  const firDetails = [
    ['FIR Number', firData.fir_number],
    ['Date & Time', `${dateStr} at ${firData.fir_time || 'N/A'}`],
    ['Crime Type', (firData.crime_type || '').replace(/_/g, ' ').toUpperCase()],
    ['IPC Section', firData.ipc_section],
    ['Location', firData.location],
    ['Complainant', firData.complainant || 'N/A'],
    ['Police Station', stationData?.station_name || 'N/A'],
  ];

  doc.autoTable({
    startY: y,
    head: [],
    body: firDetails,
    theme: 'grid',
    margin: { left: margin, right: margin },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      textColor: [15, 23, 42],
      lineColor: [203, 213, 225],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: {
        fontStyle: 'bold',
        cellWidth: 40,
        fillColor: [248, 250, 252],
        textColor: [71, 85, 105],
      },
      1: {
        cellWidth: contentWidth - 40,
      }
    },
  });

  y = doc.lastAutoTable.finalY + 10;

  // ---- Description ----
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('INCIDENT DESCRIPTION', margin, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(51, 65, 85);
  const descLines = doc.splitTextToSize(firData.description || 'No description available.', contentWidth);
  doc.text(descLines, margin, y);
  y += descLines.length * 5 + 8;

  // ---- Case Information ----
  if (caseData) {
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('CASE INFORMATION', margin, y);
    y += 6;

    const caseDetails = [
      ['Case Status', (caseData.case_status || '').replace(/_/g, ' ').toUpperCase()],
      ['Start Date', new Date(caseData.start_date).toLocaleDateString('en-IN')],
      ['Investigating Officer', officerData?.officer_name || 'N/A'],
      ['Officer Rank', officerData?.rank || 'N/A'],
    ];

    doc.autoTable({
      startY: y,
      head: [],
      body: caseDetails,
      theme: 'grid',
      margin: { left: margin, right: margin },
      styles: {
        fontSize: 9,
        cellPadding: 4,
        textColor: [15, 23, 42],
        lineColor: [203, 213, 225],
        lineWidth: 0.2,
      },
      columnStyles: {
        0: {
          fontStyle: 'bold',
          cellWidth: 40,
          fillColor: [248, 250, 252],
          textColor: [71, 85, 105],
        },
        1: {
          cellWidth: contentWidth - 40,
        }
      },
    });

    y = doc.lastAutoTable.finalY + 10;
  }

  // ---- Followups ----
  if (followups && followups.length > 0) {
    // Check if we need a new page
    if (y > 230) {
      doc.addPage();
      y = margin;
    }

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('CASE TIMELINE', margin, y);
    y += 6;

    const followupData = followups.map(f => [
      new Date(f.followup_date).toLocaleDateString('en-IN'),
      (f.status || '').replace(/_/g, ' ').toUpperCase(),
      f.remarks || '-'
    ]);

    doc.autoTable({
      startY: y,
      head: [['Date', 'Status', 'Remarks']],
      body: followupData,
      theme: 'grid',
      margin: { left: margin, right: margin },
      styles: {
        fontSize: 8,
        cellPadding: 3,
        textColor: [15, 23, 42],
        lineColor: [203, 213, 225],
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 35 },
        2: { cellWidth: contentWidth - 60 },
      },
    });

    y = doc.lastAutoTable.finalY + 10;
  }

  // ---- Footer ----
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text(
      `Generated by THUNA Portal on ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')} — Page ${i} of ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.text(
      'This is a computer-generated document for informational purposes only.',
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 6,
      { align: 'center' }
    );
  }

  // Save
  doc.save(`FIR_${firData.fir_number.replace(/\//g, '_')}.pdf`);
}
