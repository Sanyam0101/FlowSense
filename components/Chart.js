function Chart() {
    try {
        return (
            <div data-name="analytics-chart" className="chart-container">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">User Behavior Trends</h3>
                    <select data-name="time-range" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5">
                        <option value="24h">Last 24 hours</option>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                    </select>
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Chart visualization will be rendered here</p>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Chart component error:', error);
        reportError(error);
        return null;
    }
}
