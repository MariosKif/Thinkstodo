// Placeholder Database type.
// Plan 1 replaces this file with output from `supabase gen types typescript --project-id <ref>`.
export type Database = {
  public: {
    Tables: Record<string, unknown>;
    Views: Record<string, unknown>;
    Functions: Record<string, unknown>;
  };
};
