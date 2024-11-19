import { z } from "zod";

export const formSchema = z.object({
	files: z
		.custom<FileList>()
		.refine((files) => files.length > 0, {
			message: "Please select at least one file",
		})
		.transform((files) => Array.from(files)),
});

export const loginSchema = z.object({
	email: z.string().email().refine((email) => email.search("@"), {
		message: "Please enter a valid email",
	}),
	password: z.string(),
});

export const signupSchema = z.object({
	name: z.string(),
	email: z.string().email().refine((email) => email.search("@"), {
		message: "Please enter a valid email",
	}),
	password: z.string().min(8).max(32).refine((password) => password.search(/[A-Z]/) !== -1, {
		message: "Password must contain at least one uppercase letter",
	}).refine((password) => password.search(/[a-z]/) !== -1, {
		message: "Password must contain at least one lowercase letter",
	}).refine((password) => password.search(/[0-9]/) !== -1, {
		message: "Password must contain at least one number",
	}).refine((password) => password.search(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) !== -1, {
		message: "Password must contain at least one special character",
	}),
	confirmPassword: z.string().min(8).max(32),
});
