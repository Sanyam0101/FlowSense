function FrictionScore({ url }) {
    try {
        const [score, setScore] = React.useState(null);
        const [history, setHistory] = React.useState([]);

        React.useEffect(() => {
            const updateScore = () => {
                const events = eventStream.getEventBuffer();
                const currentScore = calculateFrictionScore(events, url);
                setScore(currentScore);
                setHistory(prev => [...prev, { timestamp: new Date(), score: currentScore }].slice(-12));
            };

            const interval = setInterval(updateScore, 5000);
            updateScore();

            return () => clearInterval(interval);
        }, [url]);

        const { level, color } = getFrictionLevel(score || 0);

        return (
            <div data-name="friction-score" className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Page Friction Score</h3>
                <div className="flex items-center space-x-4">
                    <div className={`text-4xl font-bold text-${color}-600`}>
                        {score !== null ? score : '-'}
                    </div>
                    <div>
                        <p className={`text-sm font-medium text-${color}-600 capitalize`}>{level}</p>
                        <p className="text-xs text-gray-500">{url}</p>
                    </div>
                </div>
                
                <div className="mt-6">
                    <h4 className="text-sm font-medium mb-2">Score History</h4>
                    <div className="h-24 flex items-end space-x-1">
                        {history.map((point, index) => (
                            <div
                                key={index}
                                data-name={`history-bar-${index}`}
                                style={{ height: `${point.score}%` }}
                                className={`w-4 bg-${getFrictionLevel(point.score).color}-500 rounded-t`}
                                title={`${point.score} at ${point.timestamp.toLocaleTimeString()}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('FrictionScore component error:', error);
        reportError(error);
        return null;
    }
}
