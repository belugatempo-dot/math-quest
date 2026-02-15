-- Child profiles (belong to a parent, no auth account — COPPA compliant)
CREATE TABLE public.child_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar TEXT NOT NULL,         -- emoji
  age INTEGER,
  grade INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: parents can only manage their own children
ALTER TABLE public.child_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can manage own children"
  ON public.child_profiles FOR ALL USING (auth.uid() = parent_id);

-- Auto-update updated_at
CREATE TRIGGER child_profiles_updated_at
  BEFORE UPDATE ON public.child_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
