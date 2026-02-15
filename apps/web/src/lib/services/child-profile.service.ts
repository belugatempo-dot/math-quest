import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import type { ChildProfile, CreateChildInput } from '@mathquest/shared/types';

/** Map snake_case DB row to camelCase ChildProfile */
function mapDbChildProfile(row: Record<string, unknown>): ChildProfile {
  return {
    id: row.id as string,
    parentId: row.parent_id as string,
    displayName: row.display_name as string,
    avatar: row.avatar as string,
    age: (row.age as number) ?? null,
    grade: (row.grade as number) ?? null,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

/**
 * Fetch all child profiles for the current authenticated parent.
 */
export async function getChildProfiles(): Promise<ChildProfile[]> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('child_profiles')
    .select('*')
    .order('created_at', { ascending: true });

  if (error || !data) return [];

  return data.map((row: Record<string, unknown>) => mapDbChildProfile(row));
}

/**
 * Create a new child profile for the current authenticated parent.
 */
export async function createChildProfile(
  input: CreateChildInput
): Promise<ChildProfile | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('child_profiles')
    .insert({
      parent_id: user.id,
      display_name: input.displayName,
      avatar: input.avatar,
      age: input.age ?? null,
      grade: input.grade ?? null,
    })
    .select()
    .single();

  if (error || !data) return null;

  return mapDbChildProfile(data as Record<string, unknown>);
}

/**
 * Delete a child profile by ID.
 * RLS ensures only the parent can delete their own children's profiles.
 */
export async function deleteChildProfile(childId: string): Promise<boolean> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from('child_profiles')
    .delete()
    .eq('id', childId);

  return !error;
}
