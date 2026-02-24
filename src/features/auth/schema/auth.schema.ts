import { z } from "zod";
import { DEPARTMENTS, ROLES } from "../types/auth.type";

// ── Signup Schema ──────────────────────────────────────────────────
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(60, "Name must be under 60 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[0-9]/, "Must include at least one number"),

  confirmPassword: z.string().min(1, "Please confirm your password"),

  role: z.enum(ROLES, { message: "Please select a valid role" }),
  department: z.enum(DEPARTMENTS, { message: "Please select a department" }),

  experience_years: z.coerce.number().int().min(0).max(50),

  location: z
    .string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location is too long"),
});

// ── Login Schema ───────────────────────────────────────────────────
  export const loginSchema = z.object({
  email: z.string() .min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ── Forgot Password Schema ───────────────────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});


export const signupPayloadSchema = signupSchema.omit({
  confirmPassword: true,
});


export type SignupPayload = z.infer<typeof signupPayloadSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;