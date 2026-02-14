function IssuesList({ events }) {
    const issues = getTopIssues(events);
    const severityFor = (type) => (type === 'rage_click' || type === 'error' ? 'critical' : 'warning');

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Detected Issues</h3>
            <div className="space-y-3">
                {issues.map((issue) => {
                    const severity = severityFor(issue.type);
                    return (
                        <div key={issue.id} className={`rounded-lg p-4 border ${severity === 'critical' ? 'border-rose-200 bg-rose-50' : 'border-amber-200 bg-amber-50'}`}>
                            <div className="flex items-center justify-between">
                                <p className="font-semibold capitalize">{issue.type.replace('_', ' ')}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${severity === 'critical' ? 'bg-rose-200 text-rose-700' : 'bg-amber-200 text-amber-700'}`}>{severity}</span>
                            </div>
                            <p className="text-sm text-slate-600">Page: {issue.page}</p>
                            <p className="text-xs text-slate-500">Occurrences: {issue.count}</p>
                        </div>
                    );
                })}
                {!issues.length && <p className="text-sm text-slate-500">No issues detected with current data.</p>}
            </div>
        </div>
    );
}
