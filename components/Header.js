function Header({ onToggleSettings }) {
    try {
        const [showNotifications, setShowNotifications] = React.useState(false);
        const [notifications, setNotifications] = React.useState([
            {
                id: 1,
                type: 'alert',
                message: 'High rage clicks detected on checkout page',
                time: '2 mins ago',
                unread: true
            },
            {
                id: 2,
                type: 'warning',
                message: 'Form abandonment rate increased by 15%',
                time: '5 mins ago',
                unread: true
            }
        ]);

        const notificationRef = React.useRef(null);

        React.useEffect(() => {
            const handleClickOutside = (event) => {
                if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                    setShowNotifications(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const markAllAsRead = () => {
            setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
        };

        const unreadCount = notifications.filter(n => n.unread).length;

        return (
            <header data-name="header" className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div data-name="logo-section" className="flex items-center">
                            <i className="fas fa-chart-line text-blue-600 text-2xl mr-2"></i>
                            <h1 className="text-xl font-semibold text-gray-900">FlowSense</h1>
                        </div>
                        <div data-name="header-actions" className="flex items-center space-x-4">
                            <div className="relative" ref={notificationRef}>
                                <button 
                                    data-name="notifications-btn"
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className="p-2 rounded-full hover:bg-gray-100 relative"
                                >
                                    <i className="fas fa-bell text-gray-600"></i>
                                    {unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg">
                                        <div className="p-4 border-b">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-semibold">Notifications</h3>
                                                <button 
                                                    onClick={markAllAsRead}
                                                    className="text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    Mark all as read
                                                </button>
                                            </div>
                                        </div>
                                        <div className="max-h-96 overflow-y-auto">
                                            {notifications.map(notification => (
                                                <div 
                                                    key={notification.id}
                                                    className={`p-4 border-b hover:bg-gray-50 ${notification.unread ? 'bg-blue-50' : ''}`}
                                                >
                                                    <div className="flex items-start">
                                                        <i className={`fas fa-${notification.type === 'alert' ? 'exclamation-circle text-red-500' : 'exclamation-triangle text-yellow-500'} mt-1`}></i>
                                                        <div className="ml-3">
                                                            <p className="text-sm">{notification.message}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button 
                                data-name="settings-btn"
                                onClick={onToggleSettings}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <i className="fas fa-cog text-gray-600"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
        return null;
    }
}
