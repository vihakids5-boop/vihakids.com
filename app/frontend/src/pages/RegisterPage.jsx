import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow">Free demo class</span>
          <h1>Register your child for a free demo</h1>
          <p className="lead">Takes 30 seconds. No payment required — we'll message you on WhatsApp to fix a time.</p>
        </div>
      </section>
      <div className="page-form-wrap">
        <RegisterForm variant="page" />
      </div>
    </main>
  );
}
