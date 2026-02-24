import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router";
import { forgotPasswordSchema } from "../schema/auth.schema";
import FormInput from "../../../components/ui/form-input";
import { MailIcon } from "../../../assets/icons/Icons";
import { ArrowLeft } from "lucide-react";
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage =()=> {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordValues) => {
    console.log("Forgot Password Payload:", data);
    // TODO: call API -> POST /auth/forgot-password
  };

  return (
    <div className="min-h-screen bg-[var(--brand-surface)] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <Link
          to="/login"
          className="inline-flex items-center gap-1 text-sm text-[var(--brand-primary)] hover:underline"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-800">
          Forgot your password?
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Enter your email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          <FormInput
            name="email"
            control={control}
            label="Email Address"
            type="email"
            placeholder="user@example.com"
            leftIcon={<MailIcon />}
          />

          <button
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-[var(--brand-primary)] py-2.5 text-white font-medium
            hover:opacity-90 transition disabled:opacity-60"
          >
            {isSubmitting ? "Sending reset link..." : "Send reset link"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default  ForgotPasswordPage