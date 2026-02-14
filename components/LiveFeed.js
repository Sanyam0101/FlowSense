function LiveFeed({ events }) {
    const recent = [...events].slice(-15).reverse();

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Live Event Feed</h3>
                <div className="space-y-2 max-h-[580px] overflow-y-auto">
                    {recent.map((event, idx) => (
                        <div key={`${event.timestamp}-${idx}`} className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-800">{event.type}</span>
                                <span className="text-slate-500">{new Date(event.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{event.page || event.url || '/'}</p>
                            <p className="text-xs text-slate-400 mt-1">session: {event.sessionId || 'unknown'}</p>
                        </div>
                    ))}
                    {!recent.length && <p className="text-sm text-slate-500">No events yet.</p>}
                </div>
            </div>
        </div>
    );
}
