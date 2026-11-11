import BlogPostLayout from '../../components/BlogPostLayout';

export default function BlogQuestionsAfterSchoolPage() {
  return (
    <BlogPostLayout
      slug="/blog-questions-after-school.html"
      category="Parent Guide"
      title="Stop Asking “How Was School?” — 7 Questions That Actually Get Children Talking"
      metaTitle="7 Better Questions Than “How Was School?” | Vihakids"
      description="Seven after-school questions that get more than “fine” from children in Classes 1–10, why each one works, and what the answers tell you."
      meta="11 Nov 2026 · 5 min read"
      ctaHeading="Heard an answer that worries you?"
      ctaBody="If the same subject keeps coming up as the hard part, tell us your child's class and board. A free 30-minute demo class on their own textbook shows where the difficulty really is — and you are welcome to watch it."
      ctaWhatsAppText="Hi, my child keeps saying one subject is hard. I'd like a free demo class to see where the difficulty is"
      relatedLinks={[
        { to: '/blog-learning-gap-signs.html', label: '7 Signs Your Child Is Quietly Falling Behind in School' },
        { to: '/blog-exam-stress-confidence.html', label: 'How to Help Your Child Build Real Confidence, Not Just Chase Marks' },
      ]}
    >
      <p>“How was school?” “Fine.” “What did you do?” “Nothing.” Most parents have this exact conversation every afternoon. It is not that children have nothing to say. The question is simply too big, it arrives at the wrong moment, and “fine” is the fastest way to end it.</p>
      <p>A better question is small, specific and impossible to answer in one word. Here are seven that work from Class 1 to Class 10, and what each one quietly tells you about how school is really going.</p>

      <h2>Seven questions to try</h2>
      <ul className="checklist">
        <li><span className="mark">1</span><span><strong>“What made you think hard today?”</strong> It treats difficulty as normal and interesting, not as failure. The subject that comes up most often over a few weeks is the one that needs your attention.</span></li>
        <li><span className="mark">2</span><span><strong>“Can you teach me one thing from class?”</strong> Explaining is the best test of understanding there is. A child who can teach it has it. A child who says “I know it but I can’t explain it” has memorised it.</span></li>
        <li><span className="mark">3</span><span><strong>“What did you get wrong today, and what did it teach you?”</strong> Asked lightly, it makes mistakes ordinary dinner-table talk instead of something to hide. Share one of your own first.</span></li>
        <li><span className="mark">4</span><span><strong>“Which question did you want to ask, but didn’t?”</strong> Many children stay silent in a class of forty. This is where the unasked doubts come out — and they are usually small and easy to clear at home.</span></li>
        <li><span className="mark">5</span><span><strong>“What felt easier than last week?”</strong> Children rarely notice their own progress. Pointing at it does more for confidence than any amount of praise.</span></li>
        <li><span className="mark">6</span><span><strong>“If you were the teacher tomorrow, what would you change?”</strong> You hear what is boring, what is too fast and what is confusing, without your child feeling they are complaining.</span></li>
        <li><span className="mark">7</span><span><strong>“Who did you help today, or who helped you?”</strong> School is also friendships. A child who cannot name anyone, week after week, may be struggling with something other than studies.</span></li>
      </ul>

      <h2>How you ask matters as much as what you ask</h2>
      <ul>
        <li><strong>Not at the door.</strong> A child walking in from school is tired and hungry. Ask over a snack, on a walk, or at bedtime, when there is nothing else to do but talk.</li>
        <li><strong>One question a day.</strong> Seven questions in a row is an interview. Pick one, and rotate.</li>
        <li><strong>Listen without fixing.</strong> If the answer is “I didn’t understand fractions,” resist starting a lesson that minute. “That sounds annoying — show me later?” keeps them talking tomorrow.</li>
        <li><strong>Answer it yourself too.</strong> “I got something wrong at work today” makes it a conversation between two people, not a check-up.</li>
        <li><strong>Accept “nothing” sometimes.</strong> Some days really are ordinary. The habit matters more than any single answer.</li>
      </ul>

      <h2>What the answers tell you</h2>
      <p>After two or three weeks, patterns appear. The same subject keeps turning up under “hard”. They can never teach you anything from one particular class. There is always a question they did not ask the Maths teacher. None of these is a crisis. They are early, gentle signs of a gap — the kind that is easy to close now and much harder in exam week.</p>
      <p>If you notice one, go back to that chapter in the school textbook and ask them to explain a single idea in their own words. Where the explanation stops is exactly where the help is needed.</p>

      <h2>Start tonight</h2>
      <p>Pick one question from the list and ask it once, at a calm moment. Do not worry if the first answer is a shrug. By the end of the week you will know more about your child’s school day than a term of “How was school?” ever told you.</p>
    </BlogPostLayout>
  );
}
