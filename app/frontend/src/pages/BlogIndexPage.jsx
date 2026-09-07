import { Link } from 'react-router-dom';
import { useDocumentHead } from '../lib/useDocumentHead';

const WHATSAPP_BASE = 'https://wa.me/919972577828?text=';

const POSTS = [
  {
    slug: '/blog-science-learning-tips.html',
    cat: 'Science',
    title: 'How to Help Your Child Understand Science — Not Just Memorise It',
    excerpt: 'Why Science homework often turns into rote memorising, and five practical ways to build real understanding at home instead.',
    date: '20 Aug 2026',
    read: '5 min read',
  },
  {
    slug: '/blog-kannada-reading-tips.html',
    cat: 'Kannada',
    title: '5 Simple Ways to Help Your Child Read Kannada Confidently at Home',
    excerpt: 'Small, everyday habits that build real reading confidence — no extra classes required, just 10 minutes a day done right.',
    date: '19 Aug 2026',
    read: '5 min read',
  },
  {
    slug: '/blog-cbse-icse-state-board-kannada-hindi.html',
    cat: 'Boards & Syllabus',
    title: 'CBSE vs ICSE vs State Board: What It Means for Kannada and Hindi Learning',
    excerpt: "Each board treats second-language learning differently. Here's what parents should know before choosing extra support.",
    date: '19 Aug 2026',
    read: '6 min read',
  },
  {
    slug: '/blog-choosing-online-math-tutor.html',
    cat: 'Math',
    title: 'How to Choose the Right Online Math Tutor for Your Child',
    excerpt: 'Not all tutoring is the same. A short checklist to help you spot a tutor who will actually move the needle.',
    date: '19 Aug 2026',
    read: '5 min read',
  },
];

export default function BlogIndexPage() {
  useDocumentHead({
    title: 'Blog | Vihakids — Online Kannada, Hindi, Math & Science Tuitions',
    description: 'Tips and guides for parents on helping kids with Kannada, Hindi, Math and Science — reading confidence, board differences, and choosing the right tutor. From Vihakids, Bengaluru.',
  });

  return (
    <main id="top">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">Vihakids Blog</span>
          <h1>Tips for Kannada, Hindi, Math &amp; Science learning</h1>
          <p className="lead">Practical guides for parents in Bengaluru — helping your child build reading confidence, understand board differences, and get the most out of tuition support.</p>
        </div>

        <div className="blog-grid">
          {POSTS.map((post) => (
            <Link key={post.slug} className="blog-card" to={post.slug}>
              <span className="cat">{post.cat}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="meta"><span>{post.date}</span> · <span>{post.read}</span> · <span className="read-more">Read more &rarr;</span></span>
            </Link>
          ))}
        </div>

        <div className="cta-band">
          <h2>Want help choosing the right starting point?</h2>
          <p>Message us with your child's grade, school, and the subject you'd like help with, and we'll suggest what fits best.</p>
          <a
            className="btn btn-primary"
            href={`${WHATSAPP_BASE}${encodeURIComponent("Hi, I'd like to know more about Kannada, Hindi, Math and Science tuitions")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message on WhatsApp (opens in a new tab)"
          >
            Message on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
