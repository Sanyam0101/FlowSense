function PageAnalytics({ events }) {
    const pages = getPageBreakdown(events);
    const maxEvents = Math.max(...pages.map((page) => page.totalEvents), 1);

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Page Analytics</h3>
            <div className="space-y-3">
                {pages.map((page) => (
                    <div key={page.page} className="border border-slate-100 rounded-lg p-3">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">{page.page}</span>
                            <span>{page.totalEvents} events</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                            <div className="h-full bg-blue-500" style={{ width: `${(page.totalEvents / maxEvents) * 100}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500">rage clicks: {page.rageClicks} • form abandons: {page.formAbandons}</p>
                    </div>
                ))}
                {!pages.length && <p className="text-sm text-slate-500">No page data yet.</p>}
            </div>
        </div>
    );
}
