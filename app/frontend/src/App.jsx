import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
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

// The old static site's pages all link back to "index.html" (with an
// optional #anchor) — that's not a route React Router knows about, so
// visiting it directly rendered a blank page. Redirect it to "/" while
// preserving the hash so #reality/#subjects/etc. still scroll correctly.
function LegacyIndexRedirect() {
  const { hash } = useLocation();
  return <Navigate to={`/${hash}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/index.html" element={<LegacyIndexRedirect />} />
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/teach" element={<TeachPage />} />
      </Route>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
