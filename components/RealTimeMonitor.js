function RealTimeMonitor() {
    try {
        const [activeUsers, setActiveUsers] = React.useState([]);
        const [recentEvents, setRecentEvents] = React.useState([]);
        const [insights, setInsights] = React.useState([]);

        React.useEffect(() => {
            const updateInterval = setInterval(() => {
                const events = eventStream.getEventBuffer();
                setRecentEvents(events.slice(-5));
                
                analyzeUserBehavior(events).then(newInsights => {
                    setInsights(newInsights);
                });
            }, 2000);

            return () => clearInterval(updateInterval);
        }, []);

        return (
            <div data-name="real-time-monitor" className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div data-name="active-sessions" className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                    <div className="space-y-4">
                        {activeUsers.map(user => (
                            <div key={user.sessionId} data-name={`session-${user.sessionId}`} 
                                 className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <div>
                                    <p className="text-sm font-medium">Session {user.sessionId}</p>
                                    <p className="text-xs text-gray-500">{user.currentPage}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div data-name="real-time-events" className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">Live Events</h3>
                    <div className="space-y-3">
                        {recentEvents.map((event, index) => (
                            <div key={index} data-name={`event-${event.id}`} 
                                 className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-sm font-medium">{event.type}</p>
                                    <p className="text-xs text-gray-500">{event.data.location}</p>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(event.timestamp).toLocaleTimeString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RealTimeMonitor component error:', error);
        reportError(error);
        return null;
    }
}
