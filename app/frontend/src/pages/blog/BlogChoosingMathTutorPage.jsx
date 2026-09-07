import BlogPostLayout from '../../components/BlogPostLayout';

export default function BlogChoosingMathTutorPage() {
  return (
    <BlogPostLayout
      slug="/blog-choosing-online-math-tutor.html"
      category="Math"
      title="How to Choose the Right Online Math Tutor for Your Child"
      description="A short, practical checklist for parents choosing an online Math tutor — what actually matters, and what to skip, for 1st to 10th Std students."
      meta="19 Aug 2026 · 5 min read"
      ctaHeading="Tell us the topic your child is stuck on"
      ctaBody="Share your child's grade, board and the specific Math topic that's causing trouble, and we'll tell you honestly how we'd approach it."
      ctaWhatsAppText="Hi, I'd like help finding the right Math support for my child"
    >
      <p>"My child needs a Math tutor" is one of the most common messages we get — and one of the least specific, because Math tuition covers a huge range of actual needs: a Class 3 student still shaky on multiplication tables, a Class 7 student lost on fractions, and a Class 10 student cramming for boards all technically "need a Math tutor," but they need very different things from one.</p>
      <p>Before picking a tutor — online or otherwise — it helps to know what actually predicts a good outcome versus what's just marketing.</p>

      <h2>What actually matters</h2>
      <ul className="checklist">
        <li><span className="mark">✓</span><span><strong>They diagnose before they teach.</strong> A good tutor spends the first session or two figuring out exactly where the gap is — not just "Class 7 Math" but the specific concept (e.g., fraction division, not "fractions" broadly) that's causing downstream confusion.</span></li>
        <li><span className="mark">✓</span><span><strong>They match your child's board and textbook.</strong> CBSE, ICSE and Karnataka State Board sequence topics differently across the year. A tutor working from the wrong textbook wastes time re-teaching things out of order.</span></li>
        <li><span className="mark">✓</span><span><strong>They check understanding, not just answers.</strong> A child can get the right answer using a memorised trick without understanding why it works — which collapses the moment the question is phrased differently in an exam. Ask how the tutor checks for real understanding, not just correct homework.</span></li>
        <li><span className="mark">✓</span><span><strong>Sessions are genuinely one-on-one or small-batch.</strong> Math gaps are usually specific to the individual child. In a large batch, a tutor simply can't slow down for one student's fraction confusion without losing everyone else.</span></li>
        <li><span className="mark">✓</span><span><strong>You get honest, specific feedback.</strong> A tutor who only ever reports "doing well" isn't giving you anything actionable. Look for specific updates — "confident with linear equations, still shaky on word problems" — that tell you what's actually happening.</span></li>
      </ul>

      <h2>What matters less than you'd think</h2>
      <ul>
        <li><strong>Flashy tech or apps.</strong> A tutor with a clear explanation and a shared whiteboard teaches Math just as well as one with elaborate software — sometimes better, since less time is spent navigating tools.</li>
        <li><strong>Teaching every subject.</strong> A tutor who also "teaches everything" is rarely as sharp on Math specifically as one who focuses on it. Depth beats breadth here.</li>
        <li><strong>Formal certifications alone.</strong> They're a reasonable filter, but they don't tell you whether a tutor is patient with a frustrated 10-year-old, which matters more day to day than the credential itself.</li>
      </ul>

      <h2>A simple test before you commit</h2>
      <p>Ask a prospective tutor to explain, in one or two sentences, how they'd approach your child's current weak topic. A vague answer ("we'll do lots of practice") is a warning sign. A specific answer ("I'd first check if they understand equivalent fractions before touching addition/subtraction of fractions, since that's usually where the real gap is") tells you they actually know the subject's teaching sequence, not just the subject itself.</p>
    </BlogPostLayout>
  );
}
