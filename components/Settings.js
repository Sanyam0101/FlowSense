function Settings({ isOpen, onClose }) {
    try {
        const [settings, setSettings] = React.useState({
            notifications: true,
            emailAlerts: true,
            rageClickThreshold: 5,
            deadClickThreshold: 3,
            formAbandonmentThreshold: 50,
            refreshInterval: 5000
        });

        const handleChange = (key, value) => {
            setSettings(prev => ({
                ...prev,
                [key]: value
            }));
        };

        const handleSave = () => {
            localStorage.setItem('flowsense_settings', JSON.stringify(settings));
            onClose();
        };

        if (!isOpen) return null;

        return (
            <div data-name="settings-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg w-full max-w-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Settings</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="font-medium">Notifications</h3>
                            <div className="flex items-center justify-between">
                                <span>Enable Notifications</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.notifications}
                                        onChange={(e) => handleChange('notifications', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Email Alerts</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailAlerts}
                                        onChange={(e) => handleChange('emailAlerts', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-medium">Thresholds</h3>
                            <div className="grid gap-4">
                                <div>
                                    <label className="block text-sm mb-1">Rage Click Threshold</label>
                                    <input
                                        type="number"
                                        value={settings.rageClickThreshold}
                                        onChange={(e) => handleChange('rageClickThreshold', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Dead Click Threshold</label>
                                    <input
                                        type="number"
                                        value={settings.deadClickThreshold}
                                        onChange={(e) => handleChange('deadClickThreshold', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Form Abandonment Threshold (%)</label>
                                    <input
                                        type="number"
                                        value={settings.formAbandonmentThreshold}
                                        onChange={(e) => handleChange('formAbandonmentThreshold', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-medium mb-2">Refresh Interval</h3>
                            <select
                                value={settings.refreshInterval}
                                onChange={(e) => handleChange('refreshInterval', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                <option value={2000}>2 seconds</option>
                                <option value={5000}>5 seconds</option>
                                <option value={10000}>10 seconds</option>
                                <option value={30000}>30 seconds</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Settings component error:', error);
        reportError(error);
        return null;
    }
}
