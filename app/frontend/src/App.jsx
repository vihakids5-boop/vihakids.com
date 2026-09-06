import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import TeachPage from './pages/TeachPage';
import AdminPage from './pages/AdminPage';
import { useScrollToHash } from './lib/useScrollToHash';

function SiteLayout() {
  useScrollToHash();
  return (
    <>
      <a href="#top" className="skip-link">Skip to content</a>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/teach" element={<TeachPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}
