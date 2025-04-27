function WebsiteTester() {
    try {
        const [targetUrl, setTargetUrl] = React.useState('');
        const [isAnalyzing, setIsAnalyzing] = React.useState(false);
        const [testFrame, setTestFrame] = React.useState(null);

        const startAnalysis = async () => {
            if (!targetUrl) return;

            setIsAnalyzing(true);
            
            // Create testing iframe
            const frame = document.createElement('iframe');
            frame.style.display = 'none';
            frame.src = targetUrl;
            
            // Inject tracking script
            frame.onload = () => {
                try {
                    const script = frame.contentDocument.createElement('script');
                    script.src = '/tracking/flowsense-tracker.js';
                    frame.contentDocument.head.appendChild(script);
                    
                    // Start collecting data
                    window.flowsense.startTracking(frame.contentWindow);
                } catch (error) {
                    console.error('Failed to inject tracker:', error);
                }
            };

            document.body.appendChild(frame);
            setTestFrame(frame);
        };

        const stopAnalysis = () => {
            if (testFrame) {
                testFrame.remove();
                setTestFrame(null);
            }
            setIsAnalyzing(false);
        };

        return (
            <div data-name="website-tester" className="p-6 bg-white rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Website Analyzer</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Website URL
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                value={targetUrl}
                                onChange={(e) => setTargetUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="flex-1 px-4 py-2 border rounded-lg"
                            />
                            <button
                                onClick={isAnalyzing ? stopAnalysis : startAnalysis}
                                className={`px-6 py-2 rounded-lg ${
                                    isAnalyzing 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-blue-600 hover:bg-blue-700'
                                } text-white`}
                            >
                                {isAnalyzing ? 'Stop Analysis' : 'Start Analysis'}
                            </button>
                        </div>
                    </div>

                    {isAnalyzing && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent mr-2"></div>
                                <span>Analyzing website interactions...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('WebsiteTester component error:', error);
        reportError(error);
        return null;
    }
}
