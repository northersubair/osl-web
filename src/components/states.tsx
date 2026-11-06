import type { ReactNode } from "react";

const boxClass =
  "w-full max-w-xl rounded-lg border px-4 py-6 text-left text-sm";

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      className={`${boxClass} flex items-center gap-3 border-zinc-300 dark:border-zinc-700`}
    >
      <span
        aria-hidden="true"
        className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent motion-reduce:animate-none"
      />
      <span>{label}</span>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
}: {
  title?: string;
  message: string;
  /** When given, a "Try again" button calls it. */
  onRetry?: () => void;
}) {
  return (
    <div
      role="alert"
      className={`${boxClass} border-red-400 bg-red-50 text-red-950 dark:border-red-800 dark:bg-red-950/40 dark:text-red-100`}
    >
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-1">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-md bg-red-700 px-3 py-2 font-medium text-white hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  /** Optional call to action, such as a link or button. */
  action?: ReactNode;
}) {
  return (
    <div
      className={`${boxClass} border-dashed border-zinc-400 text-center dark:border-zinc-600`}
    >
      <h2 className="font-semibold">{title}</h2>
      {description ? (
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">{description}</p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
