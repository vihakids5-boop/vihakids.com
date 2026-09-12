import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import TeachPage from './pages/TeachPage';
import AboutPage from './pages/AboutPage';
import ChatWidget from './components/ChatWidget';
import { useScrollToHash } from './lib/useScrollToHash';
import { ALL_TUITION_PAGES } from './data/tuitionLandingPages';

// Lazy-loaded: none of these are needed for the first paint of the
// pages people actually land on, so keeping them out of the main
// bundle shrinks what every visitor downloads.
// - AdminPage pulls in the Firebase Auth SDK (~100KB+), relevant only
//   to the site owner, never to a parent/teacher visitor.
// - The blog/legal pages are long-form, rarely-visited static content.
// - TuitionLandingPage carries ~18 pages worth of copy in its data file.
const AdminPage = lazy(() => import('./pages/AdminPage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const CookiesPage = lazy(() => import('./pages/CookiesPage'));
const BlogKannadaReadingTipsPage = lazy(() => import('./pages/blog/BlogKannadaReadingTipsPage'));
const BlogCbseIcseStateBoardPage = lazy(() => import('./pages/blog/BlogCbseIcseStateBoardPage'));
const BlogChoosingMathTutorPage = lazy(() => import('./pages/blog/BlogChoosingMathTutorPage'));
const BlogScienceLearningTipsPage = lazy(() => import('./pages/blog/BlogScienceLearningTipsPage'));
const BlogExamStressConfidencePage = lazy(() => import('./pages/blog/BlogExamStressConfidencePage'));
const BlogEnglishGrammarBasicsPage = lazy(() => import('./pages/blog/BlogEnglishGrammarBasicsPage'));
const KannadaAlphabetWorksheetPage = lazy(() => import('./pages/resources/KannadaAlphabetWorksheetPage'));
const TuitionLandingPage = lazy(() => import('./pages/TuitionLandingPage'));

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
      <Suspense fallback={null}>
        <Routes>
          <Route path="/index.html" element={<LegacyIndexRedirect />} />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/teach" element={<TeachPage />} />
            <Route path="/about.html" element={<AboutPage />} />
            <Route path="/blog.html" element={<BlogIndexPage />} />
            {ALL_TUITION_PAGES.map((page) => (
              <Route key={page.slug} path={`/${page.slug}`} element={<TuitionLandingPage data={page} />} />
            ))}
          </Route>
          <Route path="/terms.html" element={<TermsPage />} />
          <Route path="/privacy.html" element={<PrivacyPage />} />
          <Route path="/cookies.html" element={<CookiesPage />} />
          <Route path="/blog-kannada-reading-tips.html" element={<BlogKannadaReadingTipsPage />} />
          <Route path="/blog-cbse-icse-state-board-kannada-hindi.html" element={<BlogCbseIcseStateBoardPage />} />
          <Route path="/blog-choosing-online-math-tutor.html" element={<BlogChoosingMathTutorPage />} />
          <Route path="/blog-science-learning-tips.html" element={<BlogScienceLearningTipsPage />} />
          <Route path="/blog-exam-stress-confidence.html" element={<BlogExamStressConfidencePage />} />
          <Route path="/blog-english-grammar-basics.html" element={<BlogEnglishGrammarBasicsPage />} />
          <Route path="/kannada-alphabet-tracing-worksheet" element={<KannadaAlphabetWorksheetPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      {pathname !== '/admin' && <ChatWidget />}
    </>
  );
}
