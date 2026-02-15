-- Per-child progress (one row per child, JSONB for completedLevels)
CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  child_id UUID NOT NULL REFERENCES public.child_profiles(id) ON DELETE CASCADE,
  completed_levels JSONB NOT NULL DEFAULT '{}',
  total_stars INTEGER DEFAULT 0,
  last_played_level_id TEXT,
  last_played_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(child_id)
);

-- RLS: parents can manage their children's progress
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents can manage children's progress"
  ON public.user_progress FOR ALL
  USING (child_id IN (SELECT id FROM public.child_profiles WHERE parent_id = auth.uid()));

-- Auto-update updated_at
CREATE TRIGGER user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
