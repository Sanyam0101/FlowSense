function Settings({ settings, onUpdateSettings }) {
    return (
        <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm text-slate-600">Refresh interval (ms)</span>
                        <input
                            type="number"
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={settings.refreshInterval}
                            onChange={(e) => onUpdateSettings({ refreshInterval: Number(e.target.value) || 2000 })}
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm text-slate-600">Max event buffer</span>
                        <input
                            type="number"
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={settings.maxBuffer}
                            onChange={(e) => onUpdateSettings({ maxBuffer: Number(e.target.value) || 200 })}
                        />
                    </label>
                </div>
            </div>
        </div>
    );
}
