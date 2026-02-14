function MainContent({ activePage, events, settings, onUpdateSettings }) {
    if (activePage === 'overview') return <Overview events={events} />;

    if (activePage === 'analytics') {
        return (
            <div className="p-6 space-y-6">
                <Chart events={events} />
                <PageAnalytics events={events} />
            </div>
        );
    }

    if (activePage === 'issues') {
        return (
            <div className="p-6 space-y-6">
                <IssuesList events={events} />
                <PageAnalytics events={events} />
            </div>
        );
    }

    if (activePage === 'live-feed') return <LiveFeed events={events} />;
    if (activePage === 'data-export') return <DataExport events={events} />;
    if (activePage === 'settings') return <Settings settings={settings} onUpdateSettings={onUpdateSettings} />;

    return <Overview events={events} />;
}
