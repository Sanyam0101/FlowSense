function App() {
    try {
        const [activePage, setActivePage] = React.useState('overview');
        const [events, setEvents] = React.useState([]);
        const [showSettings, setShowSettings] = React.useState(false);

        React.useEffect(() => {
            fluvioStream.connect();

            const savedSettings = localStorage.getItem('flowsense_settings');
            if (savedSettings) {
                const settings = JSON.parse(savedSettings);
                // Apply settings
            }

            const unsubscribe = fluvioStream.subscribe(event => {
                setEvents(prev => [...prev, event].slice(-100));
            });

            return () => {
                unsubscribe();
                fluvioStream.disconnect();
            };
        }, []);

        const handlePageChange = (page) => {
            setActivePage(page);
            if (page === 'settings') {
                setShowSettings(true);
            }
        };

        const toggleSettings = () => {
            setShowSettings(!showSettings);
        };

        return (
            <div data-name="app" className="min-h-screen bg-gray-50">
                <Header onToggleSettings={toggleSettings} />
                <div className="flex">
                    <Sidebar activePage={activePage} onPageChange={handlePageChange} />
                    <MainContent activePage={activePage} events={events} />
                </div>
                <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
