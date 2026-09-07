import TeachForm from '../components/TeachForm';

export default function TeachPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Are you a tutor?</span>
          <h1>Teach with Vihakids</h1>
          <p className="lead">We're always looking for patient, skilled English, Hindi, Math, Science and Kannada tutors for online classes — teach students from anywhere in India.</p>
        </div>
      </section>
      <div className="page-form-wrap">
        <TeachForm />
      </div>
    </main>
  );
}
