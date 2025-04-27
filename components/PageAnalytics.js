function PageAnalytics() {
    try {
        const [pages, setPages] = React.useState([]);

        React.useEffect(() => {
            const updatePages = () => {
                const events = eventStream.getEventBuffer();
                const uniquePages = [...new Set(events.map(e => e.url))];
                
                const pageData = uniquePages.map(url => ({
                    url,
                    score: calculateFrictionScore(events, url),
                    events: events.filter(e => e.url === url).length
                }));

                setPages(pageData.sort((a, b) => a.score - b.score));
            };

            const interval = setInterval(updatePages, 5000);
            updatePages();

            return () => clearInterval(interval);
        }, []);

        return (
            <div data-name="page-analytics" className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Page Performance</h3>
                </div>
                <div className="p-4">
                    <div className="space-y-4">
                        {pages.map((page, index) => (
                            <div key={index} data-name={`page-${index}`} className="border-b last:border-0 pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-medium truncate">{page.url}</p>
                                        <p className="text-sm text-gray-500">{page.events} events</p>
                                    </div>
                                    <div className={`text-${getFrictionLevel(page.score).color}-600 font-semibold`}>
                                        {page.score}
                                    </div>
                                </div>
                                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`bg-${getFrictionLevel(page.score).color}-500 h-2 rounded-full`}
                                        style={{ width: `${page.score}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PageAnalytics component error:', error);
        reportError(error);
        return null;
    }
}
