function Chart({ events }) {
    const eventTypes = ['click', 'rage_click', 'dead_click', 'form_start', 'form_abandon', 'navigation'];
    const counts = eventTypes.map((type) => events.filter((event) => event.type === type).length);
    const max = Math.max(...counts, 1);

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Behavior Trends (Current Buffer)</h3>
            <div className="space-y-3">
                {eventTypes.map((type, index) => (
                    <div key={type} className="grid grid-cols-[120px_1fr_50px] items-center gap-3 text-sm">
                        <span className="font-medium text-slate-600">{type}</span>
                        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500"
                                style={{ width: `${(counts[index] / max) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-slate-500 text-right">{counts[index]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
