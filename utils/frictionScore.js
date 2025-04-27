function calculateFrictionScore(events, pageUrl) {
    try {
        const pageEvents = events.filter(event => event.url === pageUrl);
        let score = 100; // Start with perfect score

        // Rage clicks (-10 points each)
        const rageClicks = pageEvents.filter(e => e.type === 'rage_click').length;
        score -= rageClicks * 10;

        // Dead clicks (-5 points each)
        const deadClicks = pageEvents.filter(e => e.type === 'dead_click').length;
        score -= deadClicks * 5;

        // Form abandonment (-15 points each)
        const formAbandons = pageEvents.filter(e => e.type === 'form_abandon').length;
        score -= formAbandons * 15;

        // Back button usage (-3 points each)
        const backNavigations = pageEvents.filter(e => e.type === 'navigation' && e.data.backButton).length;
        score -= backNavigations * 3;

        // Long pauses (-2 points each)
        const longPauses = pageEvents.filter(e => e.type === 'idle' && e.data.duration > 30000).length;
        score -= longPauses * 2;

        return Math.max(0, Math.min(100, score)); // Ensure score is between 0 and 100
    } catch (error) {
        console.error('Error calculating friction score:', error);
        return 0;
    }
}

function getFrictionLevel(score) {
    if (score >= 90) return { level: 'excellent', color: 'green' };
    if (score >= 70) return { level: 'good', color: 'blue' };
    if (score >= 50) return { level: 'moderate', color: 'yellow' };
    if (score >= 30) return { level: 'poor', color: 'orange' };
    return { level: 'critical', color: 'red' };
}
