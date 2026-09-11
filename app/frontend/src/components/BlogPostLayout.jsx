import { Link } from 'react-router-dom';
import MinimalPageLayout from './MinimalPageLayout';
import { useDocumentHead } from '../lib/useDocumentHead';

const WHATSAPP_BASE = 'https://wa.me/919972577828?text=';

const ALL_POSTS = [
  { slug: '/blog-kannada-reading-tips.html', title: '5 Simple Ways to Help Your Child Read Kannada Confidently at Home' },
  { slug: '/blog-cbse-icse-state-board-kannada-hindi.html', title: 'CBSE vs ICSE vs State Board: What It Means for Kannada and Hindi Learning' },
  { slug: '/blog-choosing-online-math-tutor.html', title: 'How to Choose the Right Online Math Tutor for Your Child' },
  { slug: '/blog-science-learning-tips.html', title: 'How to Help Your Child Understand Science — Not Just Memorise It' },
  { slug: '/blog-exam-stress-confidence.html', title: 'How to Help Your Child Build Real Confidence, Not Just Chase Marks' },
];

export default function BlogPostLayout({ slug, category, title, description, meta, ctaHeading, ctaBody, ctaWhatsAppText, children }) {
  useDocumentHead({ title: `${title} | Vihakids`, description });
  const morePosts = ALL_POSTS.filter((p) => p.slug !== slug);

  return (
    <MinimalPageLayout backTo="/blog.html" backLabel="Back to blog">
      <div className="page-head">
        <span className="eyebrow">{category}</span>
        <h1>{title}</h1>
        <p className="post-meta">{meta}</p>
      </div>

      <article className="prose page-body">
        {children}

        <div className="cta-band">
          <h2>{ctaHeading}</h2>
          <p>{ctaBody}</p>
          <a
            className="btn btn-primary"
            href={`${WHATSAPP_BASE}${encodeURIComponent(ctaWhatsAppText)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message on WhatsApp (opens in a new tab)"
          >
            Message on WhatsApp
          </a>
        </div>
      </article>

      <div className="more-posts">
        <h2>More from the blog</h2>
        {morePosts.map((p) => (
          <Link key={p.slug} to={p.slug}>{p.title}</Link>
        ))}
      </div>
    </MinimalPageLayout>
  );
}
