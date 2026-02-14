function normalizeEventsForExport(events) {
    return (Array.isArray(events) ? events : []).map((event, index) => ({
        '#': index + 1,
        Timestamp: event.timestamp || '',
        Session: event.sessionId || 'unknown',
        Event: event.type || 'unknown',
        Page: event.page || event.url || '/',
        Details: event.details || ''
    }));
}

function downloadCSV(events) {
    const rows = normalizeEventsForExport(events);
    if (!rows.length) return false;

    const headers = Object.keys(rows[0]);
    const csv = [headers.join(','), ...rows.map((row) => headers.map((key) => `"${String(row[key]).replace(/"/g, '""')}"`).join(','))].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flowsense-events-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    return true;
}

function downloadExcel(events) {
    if (!window.XLSX) return false;
    const rows = normalizeEventsForExport(events);
    if (!rows.length) return false;

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FlowSenseData');
    XLSX.writeFile(workbook, `flowsense-events-${Date.now()}.xlsx`);
    return true;
}

function downloadPDF(events) {
    if (!window.jspdf || !window.jspdf.jsPDF) return false;
    const rows = normalizeEventsForExport(events);
    if (!rows.length) return false;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(16);
    doc.text('FlowSense Analytics Export', 14, 16);
    doc.setFontSize(10);

    let y = 26;
    rows.slice(0, 28).forEach((row) => {
        const line = `${row['#']}. ${row.Timestamp} | ${row.Session} | ${row.Event} | ${row.Page}`;
        doc.text(line.substring(0, 170), 14, y);
        y += 7;
    });

    if (rows.length > 28) {
        doc.text(`...and ${rows.length - 28} more rows (download CSV/Excel for full dataset).`, 14, y + 4);
    }

    doc.save(`flowsense-events-${Date.now()}.pdf`);
    return true;
}
