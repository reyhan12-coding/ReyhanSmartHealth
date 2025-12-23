import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { LABELS } from '../../utils/constants';
import {
    LayoutDashboard,
    Heart,
    User,
    MessageCircle,
    Lightbulb,
    LogOut,
    Moon,
    Sun,
    Menu,
    X,
} from 'lucide-react';

const MainLayout = () => {
    const { user, signOut } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: LABELS.dashboard, href: '/', icon: LayoutDashboard },
        { name: LABELS.healthData, href: '/health-data', icon: Heart },
        { name: LABELS.insights, href: '/insights', icon: Lightbulb },
        { name: LABELS.chatbot, href: '/chatbot', icon: MessageCircle },
        { name: LABELS.profile, href: '/profile', icon: User },
    ];

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                                    ReyhanSmartHealth
                                </h1>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${active
                                            ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        <button
                            onClick={toggleTheme}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                        >
                            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                            <span className="font-medium">
                                {isDark ? LABELS.lightMode : LABELS.darkMode}
                            </span>
                        </button>
                        <button
                            onClick={handleSignOut}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-medium">{LABELS.logout}</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:pl-64">
                {/* Top Bar */}
                <header className="sticky top-0 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between px-4 py-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                        </button>

                        <div className="flex-1 lg:flex-none">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                {navigation.find((item) => isActive(item.href))?.name || LABELS.dashboard}
                            </h2>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user?.user_metadata?.full_name || user?.email}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {user?.email}
                                </p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                                {(user?.user_metadata?.full_name || user?.email || '?')[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
