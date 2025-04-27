function MainContent({ activePage }) {
    try {
        const renderContent = () => {
            switch (activePage) {
                case 'overview':
                    return (
                        <div data-name="overview-page">
                            <Overview />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                                <RealTimeMonitor />
                                <FrictionScore url={window.location.pathname} />
                            </div>
                        </div>
                    );
                case 'live-feed':
                    return <LiveFeed />;
                case 'issues':
                    return (
                        <div data-name="issues-page" className="p-6">
                            <IssuesList />
                            <div className="mt-6">
                                <PageAnalytics />
                            </div>
                        </div>
                    );
                case 'analytics':
                    return (
                        <div data-name="analytics-page" className="p-6">
                            <Chart />
                            <div className="mt-6">
                                <FrictionScore url={window.location.pathname} />
                            </div>
                        </div>
                    );
                case 'insights':
                    return <AIInsights />;
                case 'settings':
                    return (
                        <div data-name="settings-page" className="p-6">
                            <h2 className="text-2xl font-semibold mb-6">Settings</h2>
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-medium mb-4">Configuration</h3>
                                {/* Add settings content */}
                            </div>
                        </div>
                    );
                default:
                    return <Overview />;
            }
        };

        return (
            <main data-name="main-content" className="flex-1 overflow-auto">
                {renderContent()}
            </main>
        );
    } catch (error) {
        console.error('MainContent component error:', error);
        reportError(error);
        return null;
    }
}
