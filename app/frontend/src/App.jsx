import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import TeachPage from './pages/TeachPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import BlogIndexPage from './pages/BlogIndexPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import CookiesPage from './pages/CookiesPage';
import BlogKannadaReadingTipsPage from './pages/blog/BlogKannadaReadingTipsPage';
import BlogCbseIcseStateBoardPage from './pages/blog/BlogCbseIcseStateBoardPage';
import BlogChoosingMathTutorPage from './pages/blog/BlogChoosingMathTutorPage';
import BlogScienceLearningTipsPage from './pages/blog/BlogScienceLearningTipsPage';
import ChatWidget from './components/ChatWidget';
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
  const { pathname } = useLocation();

  return (
    <>
      <Routes>
        <Route path="/index.html" element={<LegacyIndexRedirect />} />
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/teach" element={<TeachPage />} />
          <Route path="/about.html" element={<AboutPage />} />
          <Route path="/blog.html" element={<BlogIndexPage />} />
        </Route>
        <Route path="/terms.html" element={<TermsPage />} />
        <Route path="/privacy.html" element={<PrivacyPage />} />
        <Route path="/cookies.html" element={<CookiesPage />} />
        <Route path="/blog-kannada-reading-tips.html" element={<BlogKannadaReadingTipsPage />} />
        <Route path="/blog-cbse-icse-state-board-kannada-hindi.html" element={<BlogCbseIcseStateBoardPage />} />
        <Route path="/blog-choosing-online-math-tutor.html" element={<BlogChoosingMathTutorPage />} />
        <Route path="/blog-science-learning-tips.html" element={<BlogScienceLearningTipsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {pathname !== '/admin' && <ChatWidget />}
    </>
  );
}
