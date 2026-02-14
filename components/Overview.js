function Overview({ events }) {
    const metrics = calculateOverviewMetrics(events);

    const cards = [
        {
            label: 'Active Sessions',
            value: metrics.activeUsers,
            hint: 'Unique sessions in current buffer',
            icon: 'fa-users'
        },
        {
            label: 'Rage Clicks',
            value: metrics.rageClicks,
            hint: 'Potential UX friction points',
            icon: 'fa-bolt'
        },
        {
            label: 'Form Abandonment',
            value: `${metrics.formAbandonmentRate}%`,
            hint: 'Started forms not completed',
            icon: 'fa-rectangle-xmark'
        },
        {
            label: 'Avg Session Time',
            value: formatSessionTime(metrics.avgSessionSeconds),
            hint: 'Based on completed sessions',
            icon: 'fa-clock'
        }
    ];

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {cards.map((card) => <MetricsCard key={card.label} {...card} />)}
            </div>
            <Chart events={events} />
        </div>
    );
}
