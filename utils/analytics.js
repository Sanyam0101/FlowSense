function getSafeEvents(events) {
    return Array.isArray(events) ? events : [];
}

function calculateOverviewMetrics(events) {
    const safeEvents = getSafeEvents(events);
    const sessions = new Set(safeEvents.map((event) => event.sessionId).filter(Boolean));
    const rageClicks = safeEvents.filter((event) => event.type === 'rage_click').length;
    const formStarts = safeEvents.filter((event) => event.type === 'form_start').length;
    const formAbandons = safeEvents.filter((event) => event.type === 'form_abandon').length;
    const sessionDurations = safeEvents
        .filter((event) => event.type === 'session_end' && typeof event.duration === 'number')
        .map((event) => event.duration);

    const avgSessionSeconds = sessionDurations.length
        ? Math.round(sessionDurations.reduce((sum, value) => sum + value, 0) / sessionDurations.length)
        : 0;

    return {
        activeUsers: sessions.size,
        rageClicks,
        formAbandonmentRate: formStarts ? Math.round((formAbandons / formStarts) * 100) : 0,
        avgSessionSeconds
    };
}

function formatSessionTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

function getTopIssues(events) {
    const safeEvents = getSafeEvents(events);
    const issueMap = new Map();

    safeEvents.forEach((event) => {
        if (!['rage_click', 'form_abandon', 'dead_click', 'error'].includes(event.type)) {
            return;
        }
        const key = `${event.type}-${event.page || event.url || '/'}`;
        const existing = issueMap.get(key) || {
            id: key,
            type: event.type,
            page: event.page || event.url || '/',
            count: 0
        };
        existing.count += 1;
        issueMap.set(key, existing);
    });

    return Array.from(issueMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);
}

function getPageBreakdown(events) {
    const safeEvents = getSafeEvents(events);
    const grouped = {};

    safeEvents.forEach((event) => {
        const page = event.page || event.url || '/';
        if (!grouped[page]) {
            grouped[page] = { page, totalEvents: 0, rageClicks: 0, formAbandons: 0 };
        }
        grouped[page].totalEvents += 1;
        if (event.type === 'rage_click') grouped[page].rageClicks += 1;
        if (event.type === 'form_abandon') grouped[page].formAbandons += 1;
    });

    return Object.values(grouped).sort((a, b) => b.totalEvents - a.totalEvents);
}
