export default function RealitySection() {
  return (
    <section id="reality">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Why bright kids still fall behind</span>
          <h2>Most children don't struggle because they are weak. They struggle because nobody waited for them.</h2>
          <p>English and Hindi are often not spoken much at home, Kannada needs steady practice, and Math at school moves on whether or not your child understood last week's chapter. One missed step becomes a gap, the gap becomes fear, and fear looks like “I hate this subject.” That is where we start.</p>
        </div>
        <div className="contrast">
          <div className="contrast-card" style={{ '--card-accent': 'var(--sky)' }}>
            <h3>In a class of 40</h3>
            <p>One teacher, forty children. A quiet “I didn't get it” goes unheard, and the gap grows a little every week.</p>
          </div>
          <div className="vs">vs</div>
          <div className="contrast-card" style={{ '--card-accent': 'var(--oxide)' }}>
            <h3>In a Vihakids class</h3>
            <p>One tutor, one child. Every doubt is cleared the moment it appears, in English, Hindi, Math, Science or Kannada, at your child's own pace.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
