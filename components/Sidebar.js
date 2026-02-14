function Sidebar({ activePage, onPageChange }) {
    const menuItems = [
        { id: 'overview', icon: 'fa-house', label: 'Overview' },
        { id: 'analytics', icon: 'fa-chart-simple', label: 'Analytics' },
        { id: 'issues', icon: 'fa-triangle-exclamation', label: 'Issues' },
        { id: 'live-feed', icon: 'fa-tower-broadcast', label: 'Live Feed' },
        { id: 'data-export', icon: 'fa-file-export', label: 'Data Export' },
        { id: 'settings', icon: 'fa-gear', label: 'Settings' }
    ];

    return (
        <aside className="w-64 bg-slate-900 text-slate-100 min-h-[calc(100vh-73px)]">
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onPageChange(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition ${
                            activePage === item.id ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
                        }`}
                    >
                        <i className={`fas ${item.icon} mr-3`}></i>
                        {item.label}
                    </button>
                ))}
            </nav>
        </aside>
    );
}
