function LiveFeed() {
    try {
        const [events, setEvents] = React.useState([
            { id: 1, type: 'rage_click', page: '/checkout', timestamp: '2 mins ago' },
            { id: 2, type: 'form_abandon', page: '/signup', timestamp: '5 mins ago' },
            { id: 3, type: 'dead_click', page: '/products', timestamp: '8 mins ago' }
        ]);

        return (
            <div data-name="live-feed" className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Live User Activity</h3>
                <div className="space-y-4">
                    {events.map(event => (
                        <div key={event.id} data-name={`event-${event.id}`} className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-red-500 mr-3"></div>
                            <div className="flex-1">
                                <p className="text-sm font-medium">{event.type.replace('_', ' ')}</p>
                                <p className="text-xs text-gray-500">{event.page}</p>
                            </div>
                            <span className="text-xs text-gray-400">{event.timestamp}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('LiveFeed component error:', error);
        reportError(error);
        return null;
    }
}
