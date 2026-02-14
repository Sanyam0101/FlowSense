function LiveFeed({ events }) {
    const [eventType, setEventType] = React.useState('all');

    const filtered = [...events]
        .filter((event) => (eventType === 'all' ? true : event.type === eventType))
        .slice(-25)
        .reverse();

    const eventTypes = ['all', ...new Set(events.map((event) => event.type))];

    return (
        <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Live Event Feed</h3>
                    <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-sm"
                    >
                        {eventTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2 max-h-[580px] overflow-y-auto">
                    {filtered.map((event, idx) => (
                        <div key={`${event.timestamp}-${idx}`} className="p-3 rounded-lg border border-slate-100 bg-slate-50">
                            <div className="flex justify-between text-sm">
                                <span className="font-semibold text-slate-800">{event.type}</span>
                                <span className="text-slate-500">{new Date(event.timestamp).toLocaleTimeString()}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{event.page || event.url || '/'}</p>
                            <p className="text-xs text-slate-400 mt-1">session: {event.sessionId || 'unknown'}</p>
                        </div>
                    ))}
                    {!filtered.length && <p className="text-sm text-slate-500">No events for this filter.</p>}
                </div>
            </div>
        </div>
    );
}
