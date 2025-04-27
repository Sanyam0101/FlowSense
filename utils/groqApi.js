const groqApi = {
    async analyze(data) {
        try {
            const response = await fetch(`${CONFIG.API_ENDPOINT}/api/analyze`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.GROQ_API_KEY}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('GroqCloud API error:', error);
            return null;
        }
    }
};
