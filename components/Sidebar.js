function Sidebar({ activePage, onPageChange }) {
    try {
        const [collapsed, setCollapsed] = React.useState(false);

        const menuItems = [
            { id: 'overview', icon: 'fa-house', label: 'Overview' },
            { id: 'issues', icon: 'fa-triangle-exclamation', label: 'Issues' },
            { id: 'analytics', icon: 'fa-chart-simple', label: 'Analytics' },
            { id: 'settings', icon: 'fa-gear', label: 'Settings' }
        ];

        const handleNavigation = (pageId) => {
            onPageChange(pageId);
            const event = {
                type: 'navigation',
                data: {
                    from: activePage,
                    to: pageId,
                    timestamp: new Date().toISOString()
                }
            };
            fluvioStream.processEvent(event);
        };

        return (
            <aside data-name="sidebar" 
                   className={`bg-white shadow-sm transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    {!collapsed && <h2 className="font-semibold text-gray-800">Navigation</h2>}
                    <button data-name="collapse-btn"
                            onClick={() => setCollapsed(!collapsed)}
                            className="p-2 rounded-lg hover:bg-gray-100">
                        <i className={`fas fa-${collapsed ? 'chevron-right' : 'chevron-left'}`}></i>
                    </button>
                </div>
                <nav className="mt-4">
                    <ul className="space-y-2">
                        {menuItems.map(item => (
                            <li key={item.id} data-name={`sidebar-item-${item.id}`}>
                                <button
                                    onClick={() => handleNavigation(item.id)}
                                    className={`w-full flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors
                                              ${activePage === item.id ? 'bg-blue-50 text-blue-600' : ''}`}>
                                    <i className={`fas ${item.icon} w-5`}></i>
                                    {!collapsed && <span className="ml-3">{item.label}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        reportError(error);
        return null;
    }
}
