function MetricsCard({ label, value, change, icon }) {
    try {
        const isPositive = change.startsWith('+');
        
        return (
            <div data-name={`metric-${label.toLowerCase().replace(' ', '-')}`} className="metric-card">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">{label}</p>
                        <p className="text-2xl font-semibold mt-1">{value}</p>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                        <i className={`fas ${icon} ${isPositive ? 'text-green-600' : 'text-red-600'}`}></i>
                    </div>
                </div>
                <div className="mt-4">
                    <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {change} vs last week
                    </span>
                </div>
            </div>
        );
    } catch (error) {
        console.error('MetricsCard component error:', error);
        reportError(error);
        return null;
    }
}
