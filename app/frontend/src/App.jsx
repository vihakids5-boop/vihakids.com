import { Suspense } from 'react';
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import TeachPage from './pages/TeachPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import ChatWidget from './components/ChatWidget';
import ConsentBanner from './components/ConsentBanner';
import SideBookTab from './components/SideBookTab';
import { useScrollToHash } from './lib/useScrollToHash';
import { lazyWithReload } from './lib/lazyWithReload';
import { ALL_TUITION_PAGES } from './data/tuitionLandingPages';
import { PRACTICE_WORKSHEET_ROUTES } from './data/practiceWorksheetRoutes';

// Lazy-loaded: none of these are needed for the first paint of the
// pages people actually land on, so keeping them out of the main
// bundle shrinks what every visitor downloads.
// - AdminPage pulls in the Firebase Auth SDK (~100KB+), relevant only
//   to the site owner, never to a parent/teacher visitor.
// - The blog/legal pages are long-form, rarely-visited static content.
// - TuitionLandingPage carries ~18 pages worth of copy in its data file.
const AdminPage = lazyWithReload(() => import('./pages/AdminPage'));
const BlogIndexPage = lazyWithReload(() => import('./pages/BlogIndexPage'));
const TermsPage = lazyWithReload(() => import('./pages/TermsPage'));
const PrivacyPage = lazyWithReload(() => import('./pages/PrivacyPage'));
const CookiesPage = lazyWithReload(() => import('./pages/CookiesPage'));
const BlogKannadaReadingTipsPage = lazyWithReload(() => import('./pages/blog/BlogKannadaReadingTipsPage'));
const BlogCbseIcseStateBoardPage = lazyWithReload(() => import('./pages/blog/BlogCbseIcseStateBoardPage'));
const BlogChoosingMathTutorPage = lazyWithReload(() => import('./pages/blog/BlogChoosingMathTutorPage'));
const BlogScienceLearningTipsPage = lazyWithReload(() => import('./pages/blog/BlogScienceLearningTipsPage'));
const BlogExamStressConfidencePage = lazyWithReload(() => import('./pages/blog/BlogExamStressConfidencePage'));
const BlogEnglishGrammarBasicsPage = lazyWithReload(() => import('./pages/blog/BlogEnglishGrammarBasicsPage'));
const KannadaAlphabetWorksheetPage = lazyWithReload(() => import('./pages/resources/KannadaAlphabetWorksheetPage'));
const HindiVarnamalaWorksheetPage = lazyWithReload(() => import('./pages/resources/HindiVarnamalaWorksheetPage'));
const EnglishAlphabetWorksheetPage = lazyWithReload(() => import('./pages/resources/EnglishAlphabetWorksheetPage'));
const PracticeWorksheetPage = lazyWithReload(() => import('./pages/resources/PracticeWorksheetPage'));
const WorksheetsHubPage = lazyWithReload(() => import('./pages/resources/WorksheetsHubPage'));
const TuitionLandingPage = lazyWithReload(() => import('./pages/TuitionLandingPage'));
const FeesPage = lazyWithReload(() => import('./pages/FeesPage'));
const FaqPage = lazyWithReload(() => import('./pages/FaqPage'));

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
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/worksheets" element={<WorksheetsHubPage />} />
            <Route path="/blog.html" element={<BlogIndexPage />} />
            {ALL_TUITION_PAGES.map((page) => (
              <Route key={page.slug} path={`/${page.slug}`} element={<TuitionLandingPage data={page} />} />
            ))}
            {/* Unknown URLs get a real "not found" page instead of a silent
                redirect to the homepage (Google reports those as soft 404s). */}
            <Route path="*" element={<NotFoundPage />} />
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
          <Route path="/hindi-varnamala-tracing-worksheet" element={<HindiVarnamalaWorksheetPage />} />
          <Route path="/english-alphabet-tracing-worksheet" element={<EnglishAlphabetWorksheetPage />} />
          {PRACTICE_WORKSHEET_ROUTES.map(({ slug }) => (
            <Route key={slug} path={`/${slug}`} element={<PracticeWorksheetPage slug={slug} />} />
          ))}
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
      {pathname !== '/admin' && <ChatWidget />}
      {/* Right-edge booking tab: every page except the admin and the booking
          page itself, which already is the form. */}
      {pathname !== '/admin' && pathname !== '/register' && <SideBookTab />}
      {pathname !== '/admin' && <ConsentBanner />}
    </>
  );
}
