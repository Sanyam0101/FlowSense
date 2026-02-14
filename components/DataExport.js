function DataExport({ events }) {
    const [status, setStatus] = React.useState('');

    const handleExport = (kind) => {
        let ok = false;
        if (kind === 'csv') ok = downloadCSV(events);
        if (kind === 'excel') ok = downloadExcel(events);
        if (kind === 'pdf') ok = downloadPDF(events);
        setStatus(ok ? `Downloaded ${kind.toUpperCase()} successfully.` : 'No data found or export library unavailable.');
    };

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-3xl">
                <h2 className="text-xl font-semibold mb-3">Data Export Center</h2>
                <p className="text-sm text-slate-600 mb-5">
                    Export collected event data to CSV, Excel (.xlsx), or PDF for reporting and sharing.
                </p>
                <div className="flex flex-wrap gap-3">
                    <button onClick={() => handleExport('csv')} className="px-4 py-2 rounded-lg bg-emerald-600 text-white">Download CSV</button>
                    <button onClick={() => handleExport('excel')} className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Download Excel</button>
                    <button onClick={() => handleExport('pdf')} className="px-4 py-2 rounded-lg bg-rose-600 text-white">Download PDF</button>
                </div>
                <p className="text-sm text-slate-500 mt-4">Rows available: {events.length}</p>
                {status && <p className="mt-3 text-sm font-medium text-blue-700">{status}</p>}
            </div>
        </div>
    );
}
