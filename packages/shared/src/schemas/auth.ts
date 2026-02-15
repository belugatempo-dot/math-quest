import { z } from 'zod';

/** Zod schema for SupabaseProfile */
export const SupabaseProfileSchema = z.object({
  id: z.string().uuid(),
  displayName: z.string().min(1).max(100),
  email: z.string().email().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/** Zod schema for ChildProfile */
export const ChildProfileSchema = z.object({
  id: z.string().uuid(),
  parentId: z.string().uuid(),
  displayName: z.string().min(1).max(50),
  avatar: z.string().min(1).max(10),
  age: z.number().int().min(4).max(18).nullable(),
  grade: z.number().int().min(0).max(12).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/** Zod schema for CloudLevelProgress */
export const CloudLevelProgressSchema = z.object({
  stars: z.number().int().min(0).max(3),
  completedAt: z.string().datetime(),
  attempts: z.number().int().min(1),
  hintsUsed: z.number().int().min(0),
});

/** Zod schema for CloudProgress */
export const CloudProgressSchema = z.object({
  id: z.string().uuid(),
  childId: z.string().uuid(),
  completedLevels: z.record(z.string(), CloudLevelProgressSchema),
  totalStars: z.number().int().min(0),
  lastPlayedLevelId: z.string().nullable(),
  lastPlayedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/** Zod schema for creating a child profile */
export const CreateChildInputSchema = z.object({
  displayName: z.string().min(1, 'Name is required').max(50, 'Name too long'),
  avatar: z.string().min(1, 'Avatar is required').max(10),
  age: z.number().int().min(4).max(18).nullable().optional(),
  grade: z.number().int().min(0).max(12).nullable().optional(),
});

/** Zod schema for updating a child profile */
export const UpdateChildInputSchema = z.object({
  displayName: z.string().min(1).max(50).optional(),
  avatar: z.string().min(1).max(10).optional(),
  age: z.number().int().min(4).max(18).nullable().optional(),
  grade: z.number().int().min(0).max(12).nullable().optional(),
});

/** Zod schema for sign-up input */
export const SignUpInputSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  displayName: z.string().min(1, 'Name is required').max(100, 'Name too long'),
});

/** Zod schema for sign-in input */
export const SignInInputSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});
