import { Link } from 'react-router-dom';
import { useDocumentHead } from '../lib/useDocumentHead';
import RegisterFormWizard from '../components/RegisterFormWizard';
import { BOARD_PAGES, CLASS_PAGES, SUBJECT_PAGES, COUNTRY_PAGES, CITY_PAGES } from '../data/tuitionLandingPages';

const CATEGORY_LABEL = {
  board: 'Explore by board',
  class: 'Explore by class',
  subject: 'Explore by subject',
  country: 'Explore by country',
  city: 'Explore by city',
};

const RELATED_BLOG_POSTS = {
  'cbse-online-tuition': [{ to: '/blog-cbse-icse-state-board-kannada-hindi.html', label: 'CBSE, ICSE and State Board: Meaning in Kannada, and What Each Means for Your Child' }],
  'icse-online-tuition': [{ to: '/blog-cbse-icse-state-board-kannada-hindi.html', label: 'CBSE, ICSE and State Board: Meaning in Kannada, and What Each Means for Your Child' }],
  'state-board-online-tuition': [{ to: '/blog-cbse-icse-state-board-kannada-hindi.html', label: 'CBSE, ICSE and State Board: Meaning in Kannada, and What Each Means for Your Child' }, { to: '/blog-kannada-reading-tips.html', label: '5 Simple Ways to Help Your Child Read Kannada Confidently at Home' }],
  'math-online-tuition': [{ to: '/blog-choosing-online-math-tutor.html', label: 'How to Choose the Right Online Math Tutor for Your Child' }, { to: '/class-7-8-linear-equations-worksheet', label: 'Free Class 7–8 linear equations worksheet' }, { to: '/class-10-quadratic-equations-worksheet', label: 'Free Class 10 quadratic equations worksheet' }],
  'science-online-tuition': [{ to: '/blog-science-learning-tips.html', label: 'How to Help Your Child Understand Science — Not Just Memorise It' }, { to: '/class-9-motion-numericals-worksheet', label: 'Free Class 9 motion numericals worksheet' }, { to: '/class-10-balancing-chemical-equations-worksheet', label: 'Free Class 10 chemical equations worksheet' }],
  'english-online-tuition': [{ to: '/blog-english-grammar-basics.html', label: 'English Grammar Basics for Kids: Parts of Speech & Present Tense' }, { to: '/english-alphabet-tracing-worksheet', label: 'Free English A to Z tracing worksheet' }, { to: '/class-5-8-english-tenses-worksheet', label: 'Free English tenses worksheet' }],
  'kannada-online-tuition': [{ to: '/blog-kannada-reading-tips.html', label: '5 Simple Ways to Help Your Child Read Kannada Confidently at Home' }, { to: '/kannada-alphabet-tracing-worksheet', label: 'Free Kannada Varnamale tracing worksheet' }],
  'hindi-online-tuition': [{ to: '/blog-cbse-icse-state-board-kannada-hindi.html', label: 'CBSE, ICSE and State Board: Meaning in Kannada, and What Each Means for Your Child' }, { to: '/hindi-varnamala-tracing-worksheet', label: 'Free Hindi Varnamala tracing worksheet' }],
  'online-tuition-class-9': [{ to: '/blog-exam-stress-confidence.html', label: 'How to Help Your Child Build Real Confidence, Not Just Chase Marks' }, { to: '/class-9-motion-numericals-worksheet', label: 'Free Class 9 motion numericals worksheet' }],
  'online-tuition-class-10': [{ to: '/blog-exam-stress-confidence.html', label: 'How to Help Your Child Build Real Confidence, Not Just Chase Marks' }, { to: '/class-10-quadratic-equations-worksheet', label: 'Free Class 10 quadratic equations worksheet' }, { to: '/class-10-trigonometry-worksheet', label: 'Free Class 10 trigonometry worksheet' }, { to: '/class-10-balancing-chemical-equations-worksheet', label: 'Free Class 10 chemical equations worksheet' }],
  'online-tuition-class-1': [{ to: '/class-1-3-plurals-s-es-worksheet', label: 'Free plurals worksheet' }, { to: '/class-1-3-nouns-worksheet', label: 'Free nouns worksheet' }],
  'online-tuition-class-2': [{ to: '/class-1-3-nouns-worksheet', label: 'Free nouns worksheet' }, { to: '/class-2-4-prepositions-worksheet', label: 'Free prepositions worksheet' }],
  'online-tuition-class-3': [{ to: '/class-2-4-adjectives-comparatives-superlatives-worksheet', label: 'Free adjectives worksheet' }, { to: '/class-2-4-contractions-worksheet', label: 'Free contractions worksheet' }],
  'online-tuition-class-4': [{ to: '/class-4-5-multiplication-division-worksheet', label: 'Free multiplication and division worksheet' }, { to: '/class-2-4-adjectives-comparatives-superlatives-worksheet', label: 'Free adjectives worksheet' }],
  'online-tuition-class-5': [{ to: '/class-4-5-multiplication-division-worksheet', label: 'Free multiplication and division worksheet' }, { to: '/class-5-6-fractions-decimals-worksheet', label: 'Free fractions and decimals worksheet' }],
  'online-tuition-class-6': [{ to: '/class-5-6-fractions-decimals-worksheet', label: 'Free fractions and decimals worksheet' }, { to: '/class-6-7-integers-bodmas-worksheet', label: 'Free integers and BODMAS worksheet' }],
  'online-tuition-class-7': [{ to: '/class-6-7-integers-bodmas-worksheet', label: 'Free integers and BODMAS worksheet' }, { to: '/class-7-8-linear-equations-worksheet', label: 'Free linear equations worksheet' }],
  'online-tuition-class-8': [{ to: '/class-7-8-linear-equations-worksheet', label: 'Free linear equations worksheet' }, { to: '/class-5-8-verb-collocations-worksheet', label: 'Free make, do, have, take worksheet' }],
  'online-tuition-bengaluru': [{ to: '/blog-kannada-reading-tips.html', label: '5 Simple Ways to Help Your Child Read Kannada Confidently at Home' }],
};

function RelatedLinks({ label, items, currentSlug }) {
  const others = items.filter((p) => p.slug !== currentSlug);
  if (!others.length) return null;
  return (
    <div className="related-links">
      <h2>{label}</h2>
      <ul>
        {others.map((p) => (
          <li key={p.slug}>
            <Link to={`/${p.slug}`}>{p.h1}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TuitionLandingPage({ data }) {
  const { slug, metaTitle, metaDescription, eyebrow, h1, lead, paragraphs, highlights, showBoardBadges } = data;

  useDocumentHead({ title: metaTitle, description: metaDescription });
  const relatedBlogPosts = RELATED_BLOG_POSTS[slug];

  return (
    <main id="top">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{h1}</h1>
          <p className="lead">{lead}</p>
          {showBoardBadges && (
            <div className="board-badges">
              <span className="board-badge b-cbse">CBSE</span>
              <span className="board-badge b-icse">ICSE</span>
              <span className="board-badge b-state">State Board</span>
            </div>
          )}
        </div>

        <div className="page-body prose">
          {paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}

          <h2>Why parents choose Vihakids for this</h2>
          <ul>
            {highlights.map((h) => <li key={h.slice(0, 24)}>{h}</li>)}
          </ul>

          {relatedBlogPosts?.length > 0 && (
            <>
              <h2>Further reading</h2>
              <ul>
                {relatedBlogPosts.map((p) => (
                  <li key={p.to}><Link to={p.to}>{p.label}</Link></li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <div className="page-form-wrap">
        <RegisterFormWizard />
      </div>

      <div className="wrap">
        <div className="related-links-grid">
          <RelatedLinks label={CATEGORY_LABEL.board} items={BOARD_PAGES} currentSlug={slug} />
          <RelatedLinks label={CATEGORY_LABEL.class} items={CLASS_PAGES} currentSlug={slug} />
          <RelatedLinks label={CATEGORY_LABEL.subject} items={SUBJECT_PAGES} currentSlug={slug} />
          <RelatedLinks label={CATEGORY_LABEL.country} items={COUNTRY_PAGES} currentSlug={slug} />
          <RelatedLinks label={CATEGORY_LABEL.city} items={CITY_PAGES} currentSlug={slug} />
        </div>
      </div>
    </main>
  );
}
