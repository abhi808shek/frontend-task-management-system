import Login from "../components/Login";

const LoginPage = () => {
  return (
 <div className="relative min-h-screen w-full bg-[var(--brand-surface)] overflow-hidden">
  {/* Background glow */}
  <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--brand-primary)]/15 blur-3xl" />
  <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[var(--brand-primary)]/10 blur-3xl" />

  <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
    <div className="w-full max-w-md sm:max-w-lg">
      <div className="relative rounded-2xl border border-black/5 bg-white p-6 sm:p-8 md:p-10 shadow-xl backdrop-blur">
        {/* Subtle inner glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/10 to-transparent" />

        <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-slate-800">
          Welcome back 👋
        </h1>
        <p className="mb-6 text-sm text-slate-500">
          Sign in to manage your tasks efficiently
        </p>

        <Login />
      </div>
    </div>
  </div>
</div>
  );
};

export default LoginPage;