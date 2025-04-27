async function analyzeUserBehavior(events) {
    try {
        const patterns = detectPatterns(events);
        const insights = await generateAIInsights(patterns);
        return insights;
    } catch (error) {
        console.error('AI analysis error:', error);
        return [];
    }
}

function detectPatterns(events) {
    try {
        const patterns = {
            rageClicks: [],
            deadClicks: [],
            formAbandonment: [],
            navigationIssues: []
        };

        events.forEach((event, index) => {
            // Detect rage clicks (multiple rapid clicks in same area)
            if (event.type === 'click' && index > 0) {
                const prevClick = events[index - 1];
                if (prevClick.type === 'click' && 
                    Date.parse(event.timestamp) - Date.parse(prevClick.timestamp) < 500) {
                    patterns.rageClicks.push({
                        timestamp: event.timestamp,
                        location: event.data.location,
                        frequency: 'high'
                    });
                }
            }

            // Detect dead clicks (clicks with no effect)
            if (event.type === 'click' && !event.data.hasEffect) {
                patterns.deadClicks.push({
                    timestamp: event.timestamp,
                    element: event.data.element
                });
            }

            // Detect form abandonment
            if (event.type === 'form_abandon') {
                patterns.formAbandonment.push({
                    timestamp: event.timestamp,
                    formId: event.data.formId,
                    completionRate: event.data.completionRate
                });
            }

            // Detect navigation issues
            if (event.type === 'navigation' && event.data.backButton) {
                patterns.navigationIssues.push({
                    timestamp: event.timestamp,
                    from: event.data.from,
                    to: event.data.to
                });
            }
        });

        return patterns;
    } catch (error) {
        console.error('Pattern detection error:', error);
        return null;
    }
}

async function generateAIInsights(patterns) {
    try {
        const systemPrompt = `You are a UX expert analyzing user behavior patterns. 
        Provide specific suggestions for improving user experience based on the detected patterns.`;
        
        const userPrompt = JSON.stringify(patterns);
        
        const insights = await invokeAIAgent(systemPrompt, userPrompt);
        return JSON.parse(insights);
    } catch (error) {
        console.error('AI insights generation error:', error);
        return [];
    }
}
