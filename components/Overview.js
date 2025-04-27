function Overview() {
    try {
        const metrics = [
            { label: 'Active Users', value: '234', change: '+12%', icon: 'fa-users' },
            { label: 'Rage Clicks', value: '18', change: '-5%', icon: 'fa-exclamation-circle' },
            { label: 'Form Abandonment', value: '24%', change: '+2%', icon: 'fa-rectangle-xmark' },
            { label: 'Avg. Session Time', value: '4:32', change: '+8%', icon: 'fa-clock' }
        ];

        return (
            <div data-name="overview" className="p-6">
                <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <MetricsCard key={index} {...metric} />
                    ))}
                </div>
                <div data-name="charts-section" className="mt-8">
                    <Chart />
                </div>
                <div data-name="issues-section" className="mt-8">
                    <IssuesList />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Overview component error:', error);
        reportError(error);
        return null;
    }
}
