function MetricsCard({ label, value, hint, icon }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{label}</p>
                <i className={`fas ${icon} text-blue-600`}></i>
            </div>
            <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{hint}</p>
        </div>
    );
}
