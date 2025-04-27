function IssuesList() {
    try {
        const issues = [
            {
                id: 1,
                severity: 'critical',
                title: 'High Rage Clicks Detected',
                description: 'Multiple users experiencing difficulty with payment form submission',
                location: '/checkout/payment',
                occurrences: 24
            },
            {
                id: 2,
                severity: 'warning',
                title: 'Form Abandonment',
                description: 'Users leaving signup form after email verification step',
                location: '/signup',
                occurrences: 12
            }
        ];

        return (
            <div data-name="issues-list" className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">Active Issues</h3>
                </div>
                <div className="p-4">
                    {issues.map(issue => (
                        <div key={issue.id} data-name={`issue-${issue.id}`} 
                             className={`issue-item ${issue.severity} mb-4`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium">{issue.title}</h4>
                                    <p className="text-sm text-gray-600 mt-1">{issue.description}</p>
                                    <p className="text-xs text-gray-500 mt-2">
                                        <i className="fas fa-map-marker-alt mr-1"></i>
                                        {issue.location}
                                    </p>
                                </div>
                                <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                                    {issue.occurrences} occurrences
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } catch (error) {
        console.error('IssuesList component error:', error);
        reportError(error);
        return null;
    }
}
