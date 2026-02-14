function Header({ totalEvents, onGenerateSample }) {
    return (
        <header className="bg-white border-b sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">FlowSense Dashboard</h1>
                    <p className="text-sm text-slate-500">Real-time UX analytics with exports and actionable insights</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-2 bg-slate-100 rounded-lg text-sm font-medium text-slate-700">
                        Events: {totalEvents}
                    </div>
                    <button
                        onClick={onGenerateSample}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                    >
                        Generate Sample Data
                    </button>
                </div>
            </div>
        </header>
    );
}
