// Terminal-voice empty state used on routes whose content hasn't landed yet
// (/fab and /music in phase 1, sections inside /projects when filtered).
//
// Usage:
//   <EmptyState command="ls ./fab" message="no such file or directory yet." />

export function EmptyState({
  command,
  message = "no such file or directory yet.",
  hint,
}: {
  command: string;
  message?: string;
  hint?: string;
}) {
  return (
    <div className="font-mono text-sm py-16 text-muted-foreground/70">
      <div>
        <span className="text-primary/60">$</span> {command}
      </div>
      <div className="text-muted-foreground/50 mt-1 italic">{message}</div>
      {hint && (
        <div className="text-muted-foreground/40 mt-4 text-xs">— {hint}</div>
      )}
    </div>
  );
}
