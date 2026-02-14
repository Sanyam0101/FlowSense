function DataExport({ events }) {
    const [status, setStatus] = React.useState('');
    const [typeFilter, setTypeFilter] = React.useState('all');

    const filteredEvents = events.filter((event) => typeFilter === 'all' || event.type === typeFilter);
    const types = ['all', ...new Set(events.map((event) => event.type))];

    const handleExport = (kind) => {
        let ok = false;
        if (kind === 'csv') ok = downloadCSV(filteredEvents);
        if (kind === 'excel') ok = downloadExcel(filteredEvents);
        if (kind === 'pdf') ok = downloadPDF(filteredEvents);
        setStatus(ok ? `Downloaded ${kind.toUpperCase()} successfully.` : 'No data found or export library unavailable.');
    };

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-5xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <h2 className="text-xl font-semibold">Data Export Center</h2>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm"
                    >
                        {types.map((type) => (
                            <option key={type} value={type}>filter: {type}</option>
                        ))}
                    </select>
                </div>
                <p className="text-sm text-slate-600 mb-5">
                    Export collected event data to CSV, Excel (.xlsx), or PDF for reporting and sharing.
                </p>
                <div className="flex flex-wrap gap-3">
                    <button disabled={!filteredEvents.length} onClick={() => handleExport('csv')} className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:opacity-40">Download CSV</button>
                    <button disabled={!filteredEvents.length} onClick={() => handleExport('excel')} className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-40">Download Excel</button>
                    <button disabled={!filteredEvents.length} onClick={() => handleExport('pdf')} className="px-4 py-2 rounded-lg bg-rose-600 text-white disabled:opacity-40">Download PDF</button>
                </div>
                <p className="text-sm text-slate-500 mt-4">Rows available: {filteredEvents.length}</p>

                <div className="mt-5 border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="text-left p-2">Timestamp</th>
                                <th className="text-left p-2">Type</th>
                                <th className="text-left p-2">Page</th>
                                <th className="text-left p-2">Session</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.slice(-8).reverse().map((event, i) => (
                                <tr key={`${event.timestamp}-${i}`} className="border-t">
                                    <td className="p-2">{new Date(event.timestamp).toLocaleString()}</td>
                                    <td className="p-2">{event.type}</td>
                                    <td className="p-2">{event.page}</td>
                                    <td className="p-2">{event.sessionId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {status && <p className="mt-3 text-sm font-medium text-blue-700">{status}</p>}
            </div>
        </div>
    );
}
