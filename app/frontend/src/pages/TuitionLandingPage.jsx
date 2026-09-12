import { Link } from 'react-router-dom';
import { useDocumentHead } from '../lib/useDocumentHead';
import RegisterForm from '../components/RegisterForm';
import { BOARD_PAGES, CLASS_PAGES, SUBJECT_PAGES, COUNTRY_PAGES, CITY_PAGES } from '../data/tuitionLandingPages';

const CATEGORY_LABEL = {
  board: 'Explore by board',
  class: 'Explore by class',
  subject: 'Explore by subject',
  country: 'Explore by country',
  city: 'Explore by city',
};

const RELATED_BLOG_POSTS = {
  'cbse-online-tuition': [{ to: '/blog-cbse-icse-state-board-kannada-hindi.html', label: 'CBSE vs ICSE vs State Board: What It Means for Kannada and Hindi Learning' }],
  'icse-online-tuition': [{ to: '/blog-cbse-icse-state-board-kannada-hindi.html', label: 'CBSE vs ICSE vs State Board: What It Means for Kannada and Hindi Learning' }],
  'state-board-online-tuition': [{ to: '/blog-cbse-icse-state-board-kannada-hindi.html', label: 'CBSE vs ICSE vs State Board: What It Means for Kannada and Hindi Learning' }, { to: '/blog-kannada-reading-tips.html', label: '5 Simple Ways to Help Your Child Read Kannada Confidently at Home' }],
  'math-online-tuition': [{ to: '/blog-choosing-online-math-tutor.html', label: 'How to Choose the Right Online Math Tutor for Your Child' }],
  'science-online-tuition': [{ to: '/blog-science-learning-tips.html', label: 'How to Help Your Child Understand Science — Not Just Memorise It' }],
  'english-online-tuition': [{ to: '/blog-english-grammar-basics.html', label: 'English Grammar Basics for Kids: Parts of Speech & Present Tense' }],
  'kannada-online-tuition': [{ to: '/blog-kannada-reading-tips.html', label: '5 Simple Ways to Help Your Child Read Kannada Confidently at Home' }, { to: '/kannada-alphabet-tracing-worksheet', label: 'Free Kannada Varnamale tracing worksheet' }],
  'hindi-online-tuition': [{ to: '/blog-cbse-icse-state-board-kannada-hindi.html', label: 'CBSE vs ICSE vs State Board: What It Means for Kannada and Hindi Learning' }],
  'online-tuition-class-9': [{ to: '/blog-exam-stress-confidence.html', label: 'How to Help Your Child Build Real Confidence, Not Just Chase Marks' }],
  'online-tuition-class-10': [{ to: '/blog-exam-stress-confidence.html', label: 'How to Help Your Child Build Real Confidence, Not Just Chase Marks' }],
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
        <RegisterForm variant="page" />
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
