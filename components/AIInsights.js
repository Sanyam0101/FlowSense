function AIInsights() {
    try {
        const [insights, setInsights] = React.useState([]);

        React.useEffect(() => {
            const updateInsights = async () => {
                const events = eventStream.getEventBuffer();
                const newInsights = await analyzeUserBehavior(events);
                setInsights(newInsights);
            };

            const interval = setInterval(updateInsights, 5000);
            return () => clearInterval(interval);
        }, []);

        return (
            <div data-name="ai-insights" className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">AI Insights</h3>
                <div className="space-y-4">
                    {insights.map((insight, index) => (
                        <div key={index} data-name={`insight-${index}`} 
                             className="border-l-4 border-blue-500 pl-4 py-3">
                            <p className="text-sm font-medium">{insight.title}</p>
                            <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                            <div className="mt-2">
                                {insight.suggestions.map((suggestion, idx) => (
                                    <p key={idx} className="text-xs text-gray-500 flex items-center">
                                        <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                                        {suggestion}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AIInsights component error:', error);
        reportError(error);
        return null;
    }
}
