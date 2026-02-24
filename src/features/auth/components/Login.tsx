import { useState } from "react";
import { useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../schema/auth.schema";
import { Link } from "react-router";
import Auth from "../apis/auth.api";
import FormInput from "../../../components/ui/form-input";
import { EyeIcon, LockIcon, MailIcon } from "../../../assets/icons/Icons";
import type { LoginFormProps } from "../types/auth.type";


const Login = ({ onSuccess }: LoginFormProps) => {
  const [showPwd, setShowPwd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
     const result = await Auth.loginApi(data);
     console.log("Login successful:", result);
      onSuccess?.(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Invalid email or password";
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
  <FormInput
    name="email"
    control={control}
    label="Email Address"
    type="email"
    placeholder="riya@company.com"
    autoComplete="email"
    leftIcon={<MailIcon />}
  />

  <FormInput
    name="password"
    control={control}
    label="Password"
    type={showPwd ? "text" : "password"}
    placeholder="Your password"
    autoComplete="current-password"
    leftIcon={<LockIcon />}
    rightElement={
      <button
        type="button"
        onClick={() => setShowPwd((v) => !v)}
        className="text-slate-400 hover:text-slate-600 transition-colors"
        tabIndex={-1}
      >
        <EyeIcon off={showPwd} />
      </button>
    }
  />

  <div className="flex justify-end -mt-1">
    <Link
      to={"/forgot-password"}
      className="text-xs sm:text-sm text-slate-500 hover:text-[var(--brand-primary)] transition-colors"
    >
      Forgot password?
    </Link>
  </div>

  {apiError && (
    <div className="flex items-center gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
      <p className="text-sm text-red-500">{apiError}</p>
    </div>
  )}

  <div className="space-y-4 pt-1">
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full rounded-xl py-3 sm:py-3.5 text-sm sm:text-base font-bold tracking-wide transition-all duration-200 
                 bg-[var(--brand-primary)] hover:opacity-90 active:scale-[0.98] 
                 text-white shadow-lg shadow-[var(--brand-primary)]/20 disabled:opacity-60"
    >
      {isSubmitting ? "Signing in…" : "Sign In →"}
    </button>

    <p className="text-center text-xs sm:text-sm text-slate-500">
      Don't have an account?{" "}
      <Link
        to={"/signup"}
        className="text-[var(--brand-primary)] hover:opacity-80 font-medium"
      >
        Sign up
      </Link>
    </p>
  </div>
</form>
  );
};

export default Login;