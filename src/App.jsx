import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';

// Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';

// Layout
import MainLayout from './components/layout/MainLayout';

// Pages
import Dashboard from './components/dashboard/Dashboard';
import HealthDataForm from './components/health/HealthDataForm';
import AIInsightsPage from './components/ai/AIInsightsPage';
import HealthChatbot from './components/chatbot/HealthChatbot';
import UserProfile from './components/profile/UserProfile';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner message="Memuat..." />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};

// Public Route wrapper (redirect if already logged in)
const PublicRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner message="Memuat..." />
            </div>
        );
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return children;
};

function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                }
            />
            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <Register />
                    </PublicRoute>
                }
            />

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="health-data" element={<HealthDataForm />} />
                <Route path="insights" element={<AIInsightsPage />} />
                <Route path="chatbot" element={<HealthChatbot />} />
                <Route path="profile" element={<UserProfile />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

function App() {
    return (
        <ErrorBoundary>
            <BrowserRouter>
                <ThemeProvider>
                    <AuthProvider>
                        <AppRoutes />
                    </AuthProvider>
                </ThemeProvider>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
