import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupPayloadSchema, signupSchema, type SignupSchema } from "../schema/auth.schema";
import { DEPARTMENTS, ROLES, } from "../types/auth.type";
import { Link } from "react-router";
import Auth from "../apis/auth.api";
import FormInput from "../../../components/ui/form-input";
import { EyeIcon, LockIcon, MailIcon, UserIcon } from "../../../assets/icons/Icons";
import FormSelect from "../../../components/ui/form-select";




// --- Main Signup Component (LOGIC UNCHANGED) ---
const Signup = ({ onSuccess }: any) => {
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const { control, handleSubmit } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: undefined,
      department: undefined,
      experience_years: 0,
      location: "",
    },
  });

  const onSubmit:SubmitHandler<SignupSchema> = async (data: SignupSchema) => {
    const payload = signupPayloadSchema.parse(data);
    setIsSubmitting(true);
    setApiError(null);
    try {
      console.log("Submitting signup data:", data);
      const result = await Auth.signupApi(payload);
      console.log("Signup successful:", result);
      onSuccess?.(data);
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Signup failed";
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-2">

  {/* Row 1 */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <FormInput name="name" control={control} label="Full Name" placeholder="Riya Sharma" autoComplete="name" leftIcon={<UserIcon />} />
    <FormInput name="email" control={control} label="Email Address" type="email" placeholder="riya@company.com" autoComplete="email" leftIcon={<MailIcon />} />
  </div>

  {/* Row 2 */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <FormInput
      name="password"
      control={control}
      label="Password"
      type={showPwd ? "text" : "password"}
      placeholder="Create a password"
      autoComplete="new-password"
      leftIcon={<LockIcon />}
      rightElement={
        <button type="button" onClick={() => setShowPwd((v) => !v)} className="text-slate-400 hover:text-slate-600 transition-colors" tabIndex={-1}>
          <EyeIcon off={showPwd} />
        </button>
      }
    />

    <FormInput
      name="confirmPassword"
      control={control}
      label="Confirm Password"
      type={showConfirmPwd ? "text" : "password"}
      placeholder="Re-enter password"
      autoComplete="new-password"
      leftIcon={<LockIcon />}
      rightElement={
        <button type="button" onClick={() => setShowConfirmPwd((v) => !v)} className="text-slate-400 hover:text-slate-600 transition-colors" tabIndex={-1}>
          <EyeIcon off={showConfirmPwd} />
        </button>
      }
    />
  </div>

  {/* Row 3 */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <FormSelect name="role" control={control} label="Role" options={ROLES} />
    <FormSelect name="department" control={control} label="Department" options={DEPARTMENTS} />
  </div>

  {/* Row 4 */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <FormInput name="experience_years" control={control} label="Experience (Years)" type="number" placeholder="0" />
    <FormInput name="location" control={control} label="Location" placeholder="Bangalore, India" />
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
      {isSubmitting ? "Creating account…" : "Create Account →"}
    </button>

    <p className="text-center text-xs sm:text-sm text-slate-500">
      Already have an account?{" "}
      <Link to={"/login"} className="text-[var(--brand-primary)] hover:opacity-80 font-medium">
        Sign in
      </Link>
    </p>
  </div>

</form>
  );
};

export default Signup;