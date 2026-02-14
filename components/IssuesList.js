function IssuesList({ events }) {
    const issues = getTopIssues(events);

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Detected Issues</h3>
            <div className="space-y-3">
                {issues.map((issue) => (
                    <div key={issue.id} className="border border-rose-100 bg-rose-50 rounded-lg p-4">
                        <p className="font-semibold text-rose-700">{issue.type.replace('_', ' ')}</p>
                        <p className="text-sm text-slate-600">Page: {issue.page}</p>
                        <p className="text-xs text-slate-500">Occurrences: {issue.count}</p>
                    </div>
                ))}
                {!issues.length && <p className="text-sm text-slate-500">No issues detected with current data.</p>}
            </div>
        </div>
    );
}
