function Settings({ settings, onUpdateSettings, onClearData }) {
    return (
        <div className="p-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-sm text-slate-600">Refresh interval (ms)</span>
                        <input
                            type="number"
                            min="500"
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={settings.refreshInterval}
                            onChange={(e) => onUpdateSettings({ refreshInterval: Number(e.target.value) || 2000 })}
                        />
                    </label>
                    <label className="block">
                        <span className="text-sm text-slate-600">Max event buffer</span>
                        <input
                            type="number"
                            min="20"
                            className="w-full border rounded-lg px-3 py-2 mt-1"
                            value={settings.maxBuffer}
                            onChange={(e) => onUpdateSettings({ maxBuffer: Number(e.target.value) || 200 })}
                        />
                    </label>
                    <label className="flex items-center justify-between border rounded-lg p-3">
                        <span className="text-sm text-slate-700">Auto-generate sample telemetry</span>
                        <input
                            type="checkbox"
                            checked={settings.autoSample}
                            onChange={(e) => onUpdateSettings({ autoSample: e.target.checked })}
                        />
                    </label>
                </div>

                <div className="mt-6 border-t pt-4">
                    <button
                        onClick={onClearData}
                        className="px-4 py-2 rounded-lg bg-rose-600 text-white hover:bg-rose-700"
                    >
                        Clear all local analytics data
                    </button>
                </div>
            </div>
        </div>
    );
}
