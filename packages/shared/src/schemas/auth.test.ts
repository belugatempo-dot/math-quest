import { describe, it, expect } from 'vitest';
import {
  SupabaseProfileSchema,
  ChildProfileSchema,
  CloudLevelProgressSchema,
  CloudProgressSchema,
  CreateChildInputSchema,
  UpdateChildInputSchema,
  SignUpInputSchema,
  SignInInputSchema,
} from './auth';

describe('SupabaseProfileSchema', () => {
  const validProfile = {
    id: '550e8400-e29b-41d4-a716-446655440000',
    displayName: 'Test Parent',
    email: 'parent@example.com',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };

  it('should accept a valid profile', () => {
    expect(SupabaseProfileSchema.safeParse(validProfile).success).toBe(true);
  });

  it('should accept null email', () => {
    const result = SupabaseProfileSchema.safeParse({
      ...validProfile,
      email: null,
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid UUID', () => {
    const result = SupabaseProfileSchema.safeParse({
      ...validProfile,
      id: 'not-a-uuid',
    });
    expect(result.success).toBe(false);
  });

  it('should reject empty displayName', () => {
    const result = SupabaseProfileSchema.safeParse({
      ...validProfile,
      displayName: '',
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid email format', () => {
    const result = SupabaseProfileSchema.safeParse({
      ...validProfile,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('should reject missing fields', () => {
    const result = SupabaseProfileSchema.safeParse({
      id: validProfile.id,
    });
    expect(result.success).toBe(false);
  });
});

describe('ChildProfileSchema', () => {
  const validChild = {
    id: '550e8400-e29b-41d4-a716-446655440001',
    parentId: '550e8400-e29b-41d4-a716-446655440000',
    displayName: 'Little Timmy',
    avatar: '🧒',
    age: 8,
    grade: 3,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };

  it('should accept a valid child profile', () => {
    expect(ChildProfileSchema.safeParse(validChild).success).toBe(true);
  });

  it('should accept null age and grade', () => {
    const result = ChildProfileSchema.safeParse({
      ...validChild,
      age: null,
      grade: null,
    });
    expect(result.success).toBe(true);
  });

  it('should reject age below 4', () => {
    const result = ChildProfileSchema.safeParse({
      ...validChild,
      age: 3,
    });
    expect(result.success).toBe(false);
  });

  it('should reject age above 18', () => {
    const result = ChildProfileSchema.safeParse({
      ...validChild,
      age: 19,
    });
    expect(result.success).toBe(false);
  });

  it('should reject grade below 0', () => {
    const result = ChildProfileSchema.safeParse({
      ...validChild,
      grade: -1,
    });
    expect(result.success).toBe(false);
  });

  it('should reject grade above 12', () => {
    const result = ChildProfileSchema.safeParse({
      ...validChild,
      grade: 13,
    });
    expect(result.success).toBe(false);
  });

  it('should reject empty displayName', () => {
    const result = ChildProfileSchema.safeParse({
      ...validChild,
      displayName: '',
    });
    expect(result.success).toBe(false);
  });

  it('should reject displayName over 50 chars', () => {
    const result = ChildProfileSchema.safeParse({
      ...validChild,
      displayName: 'a'.repeat(51),
    });
    expect(result.success).toBe(false);
  });

  it('should reject empty avatar', () => {
    const result = ChildProfileSchema.safeParse({
      ...validChild,
      avatar: '',
    });
    expect(result.success).toBe(false);
  });

  it('should reject invalid parentId', () => {
    const result = ChildProfileSchema.safeParse({
      ...validChild,
      parentId: 'bad',
    });
    expect(result.success).toBe(false);
  });
});

describe('CloudLevelProgressSchema', () => {
  const valid = {
    stars: 3,
    completedAt: '2026-01-01T00:00:00.000Z',
    attempts: 1,
    hintsUsed: 0,
  };

  it('should accept valid level progress', () => {
    expect(CloudLevelProgressSchema.safeParse(valid).success).toBe(true);
  });

  it('should reject stars > 3', () => {
    expect(
      CloudLevelProgressSchema.safeParse({ ...valid, stars: 4 }).success
    ).toBe(false);
  });

  it('should reject stars < 0', () => {
    expect(
      CloudLevelProgressSchema.safeParse({ ...valid, stars: -1 }).success
    ).toBe(false);
  });

  it('should reject attempts < 1', () => {
    expect(
      CloudLevelProgressSchema.safeParse({ ...valid, attempts: 0 }).success
    ).toBe(false);
  });

  it('should reject negative hintsUsed', () => {
    expect(
      CloudLevelProgressSchema.safeParse({ ...valid, hintsUsed: -1 }).success
    ).toBe(false);
  });
});

describe('CloudProgressSchema', () => {
  const valid = {
    id: '550e8400-e29b-41d4-a716-446655440002',
    childId: '550e8400-e29b-41d4-a716-446655440001',
    completedLevels: {
      'level-3-1-1': {
        stars: 3,
        completedAt: '2026-01-01T00:00:00.000Z',
        attempts: 1,
        hintsUsed: 0,
      },
    },
    totalStars: 3,
    lastPlayedLevelId: 'level-3-1-1',
    lastPlayedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };

  it('should accept valid cloud progress', () => {
    expect(CloudProgressSchema.safeParse(valid).success).toBe(true);
  });

  it('should accept empty completedLevels', () => {
    const result = CloudProgressSchema.safeParse({
      ...valid,
      completedLevels: {},
      totalStars: 0,
      lastPlayedLevelId: null,
      lastPlayedAt: null,
    });
    expect(result.success).toBe(true);
  });

  it('should reject negative totalStars', () => {
    expect(
      CloudProgressSchema.safeParse({ ...valid, totalStars: -1 }).success
    ).toBe(false);
  });

  it('should reject invalid childId', () => {
    expect(
      CloudProgressSchema.safeParse({ ...valid, childId: 'bad' }).success
    ).toBe(false);
  });
});

describe('CreateChildInputSchema', () => {
  it('should accept valid input', () => {
    const result = CreateChildInputSchema.safeParse({
      displayName: 'Timmy',
      avatar: '🧒',
    });
    expect(result.success).toBe(true);
  });

  it('should accept optional age and grade', () => {
    const result = CreateChildInputSchema.safeParse({
      displayName: 'Timmy',
      avatar: '🧒',
      age: 8,
      grade: 3,
    });
    expect(result.success).toBe(true);
  });

  it('should reject empty displayName with custom message', () => {
    const result = CreateChildInputSchema.safeParse({
      displayName: '',
      avatar: '🧒',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name is required');
    }
  });

  it('should reject displayName over 50 chars', () => {
    const result = CreateChildInputSchema.safeParse({
      displayName: 'a'.repeat(51),
      avatar: '🧒',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name too long');
    }
  });

  it('should reject empty avatar', () => {
    const result = CreateChildInputSchema.safeParse({
      displayName: 'Timmy',
      avatar: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Avatar is required');
    }
  });
});

describe('UpdateChildInputSchema', () => {
  it('should accept partial updates', () => {
    expect(
      UpdateChildInputSchema.safeParse({ displayName: 'New Name' }).success
    ).toBe(true);
    expect(
      UpdateChildInputSchema.safeParse({ avatar: '🦊' }).success
    ).toBe(true);
    expect(
      UpdateChildInputSchema.safeParse({ age: 10 }).success
    ).toBe(true);
  });

  it('should accept empty object', () => {
    expect(UpdateChildInputSchema.safeParse({}).success).toBe(true);
  });

  it('should reject invalid age', () => {
    expect(
      UpdateChildInputSchema.safeParse({ age: 2 }).success
    ).toBe(false);
  });
});

describe('SignUpInputSchema', () => {
  const valid = {
    email: 'parent@example.com',
    password: 'securepass123',
    displayName: 'Test Parent',
  };

  it('should accept valid sign-up input', () => {
    expect(SignUpInputSchema.safeParse(valid).success).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = SignUpInputSchema.safeParse({
      ...valid,
      email: 'not-email',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Invalid email address');
    }
  });

  it('should reject short password', () => {
    const result = SignUpInputSchema.safeParse({
      ...valid,
      password: '1234567',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        'Password must be at least 8 characters'
      );
    }
  });

  it('should reject empty displayName', () => {
    const result = SignUpInputSchema.safeParse({
      ...valid,
      displayName: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name is required');
    }
  });

  it('should reject displayName over 100 chars', () => {
    const result = SignUpInputSchema.safeParse({
      ...valid,
      displayName: 'a'.repeat(101),
    });
    expect(result.success).toBe(false);
  });
});

describe('SignInInputSchema', () => {
  it('should accept valid sign-in input', () => {
    const result = SignInInputSchema.safeParse({
      email: 'parent@example.com',
      password: 'any-password',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid email', () => {
    const result = SignInInputSchema.safeParse({
      email: 'bad',
      password: 'x',
    });
    expect(result.success).toBe(false);
  });

  it('should reject empty password', () => {
    const result = SignInInputSchema.safeParse({
      email: 'valid@test.com',
      password: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Password is required');
    }
  });
});
