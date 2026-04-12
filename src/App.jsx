import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CaseListPage from './pages/CaseListPage';
import CaseDetailPage from './pages/CaseDetailPage';
import NewsPage from './pages/NewsPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import ReportPage from './pages/ReportPage';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cases" element={<CaseListPage />} />
            <Route path="/cases/:caseId" element={<CaseDetailPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer />
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}
