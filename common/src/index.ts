import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("This is not a valid email."),
  password: z.string().min(6, "Password should have atleast 6 characters"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password should have atleast 6 characters"),
});

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string(),
  published: z.boolean().default(false),
});

export const updatePostSchema = postSchema.extend({
  id: z.string().uuid("Invalid ID format"),
});

export const idSchema = z.string().uuid("Invalid UUID");

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type SignInSchema = z.infer<typeof signInSchema>;
export type PostSchema = z.infer<typeof postSchema>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
export type IdSchema = z.infer<typeof idSchema>;
