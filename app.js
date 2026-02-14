function App() {
    const [activePage, setActivePage] = React.useState('overview');
    const [events, setEvents] = React.useState(() => {
        const saved = localStorage.getItem('flowsense_events');
        return saved ? JSON.parse(saved) : [];
    });
    const [settings, setSettings] = React.useState(() => {
        const saved = localStorage.getItem('flowsense_settings');
        return saved ? JSON.parse(saved) : { refreshInterval: 2000, maxBuffer: 200, autoSample: true };
    });

    React.useEffect(() => {
        localStorage.setItem('flowsense_events', JSON.stringify(events));
    }, [events]);

    React.useEffect(() => {
        localStorage.setItem('flowsense_settings', JSON.stringify(settings));
    }, [settings]);

    React.useEffect(() => {
        fluvioStream.connect();
        const unsubscribe = fluvioStream.subscribe((event) => {
            const normalized = {
                timestamp: event.timestamp || new Date().toISOString(),
                type: event.type || 'unknown',
                sessionId: event.sessionId || `s-${Math.floor(Math.random() * 30) + 1}`,
                page: event.page || event.url || '/',
                details: event.details || ''
            };
            setEvents((prev) => [...prev, normalized].slice(-settings.maxBuffer));
        });

        return () => {
            unsubscribe();
            fluvioStream.disconnect();
        };
    }, [settings.maxBuffer]);

    React.useEffect(() => {
        if (!settings.autoSample) return undefined;

        const timer = setInterval(() => {
            const fakeEventTypes = ['click', 'navigation', 'form_start', 'form_abandon', 'rage_click', 'dead_click'];
            const fakePages = ['/home', '/pricing', '/signup', '/checkout', '/dashboard'];
            const next = {
                timestamp: new Date().toISOString(),
                type: fakeEventTypes[Math.floor(Math.random() * fakeEventTypes.length)],
                page: fakePages[Math.floor(Math.random() * fakePages.length)],
                sessionId: `s-${Math.floor(Math.random() * 50) + 1}`,
                duration: Math.floor(Math.random() * 600),
                details: 'Auto-generated sample event'
            };
            setEvents((prev) => [...prev, next].slice(-settings.maxBuffer));
        }, settings.refreshInterval);

        return () => clearInterval(timer);
    }, [settings.refreshInterval, settings.maxBuffer, settings.autoSample]);

    const generateSampleBatch = () => {
        const now = Date.now();
        const batch = Array.from({ length: 25 }).map((_, index) => ({
            timestamp: new Date(now - index * 10000).toISOString(),
            type: ['click', 'rage_click', 'form_start', 'form_abandon', 'navigation'][index % 5],
            page: ['/home', '/pricing', '/checkout', '/signup'][index % 4],
            sessionId: `seed-${(index % 8) + 1}`,
            duration: 60 + index * 5,
            details: 'Seed batch event'
        }));

        setEvents((prev) => [...prev, ...batch].slice(-settings.maxBuffer));
    };

    const clearData = () => {
        setEvents([]);
        localStorage.removeItem('flowsense_events');
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Header totalEvents={events.length} onGenerateSample={generateSampleBatch} />
            <div className="flex">
                <Sidebar activePage={activePage} onPageChange={setActivePage} />
                <main className="flex-1">
                    <MainContent
                        activePage={activePage}
                        events={events}
                        settings={settings}
                        onUpdateSettings={(partial) => setSettings((prev) => ({ ...prev, ...partial }))}
                        onClearData={clearData}
                    />
                </main>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
