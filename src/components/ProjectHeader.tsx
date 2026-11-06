"use client";

import { useState } from "react";

export type ProjectHeaderProps = {
  name: string;
  description?: string;
  logoUrl?: string;
  paymentAddress: string;
  /** Heading level for the project name. Use 2 when the page already has an h1. */
  headingLevel?: 1 | 2;
};

const SHOWN_CHARS = 6;

/** Shortens a long address to its first and last 6 characters. */
export function shortenAddress(address: string): string {
  if (address.length <= SHOWN_CHARS * 2 + 1) return address;
  return `${address.slice(0, SHOWN_CHARS)}…${address.slice(-SHOWN_CHARS)}`;
}

/** Up to two uppercase initials from the first two words of a name. */
export function getInitials(name: string): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => Array.from(word)[0].toUpperCase());
  return letters.join("") || "?";
}

type CopyState = "idle" | "copied" | "failed";

export function ProjectHeader({
  name,
  description,
  logoUrl,
  paymentAddress,
  headingLevel = 1,
}: ProjectHeaderProps) {
  const [failedLogoUrl, setFailedLogoUrl] = useState<string | null>(null);
  const [copyState, setCopyState] = useState<CopyState>("idle");

  const showLogo = Boolean(logoUrl) && failedLogoUrl !== logoUrl;
  const Heading = headingLevel === 1 ? "h1" : "h2";

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(paymentAddress);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  return (
    <header className="flex w-full flex-wrap items-start gap-4 rounded-lg border border-zinc-300 p-4 dark:border-zinc-700">
      {showLogo ? (
        // A plain <img> is used on purpose: remote image optimization is out
        // of scope. Third-party logos leak the visitor's IP address to the
        // logo host, so no referrer is sent and the host should be trusted.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt=""
          width={64}
          height={64}
          referrerPolicy="no-referrer"
          onError={() => setFailedLogoUrl(logoUrl ?? null)}
          className="h-16 w-16 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          data-testid="logo-fallback"
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-zinc-200 text-xl font-semibold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
        >
          {getInitials(name)}
        </div>
      )}

      <div className="min-w-0 flex-1 basis-56">
        <Heading className="text-2xl font-semibold tracking-tight break-words">
          {name}
        </Heading>
        {description ? (
          <p
            data-testid="description"
            className="mt-1 text-zinc-600 dark:text-zinc-400"
          >
            {description}
          </p>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium">Payment address:</span>
          <span className="group relative">
            <code
              tabIndex={0}
              title={paymentAddress}
              className="rounded bg-zinc-100 px-2 py-1 font-mono text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-zinc-900"
            >
              <span aria-hidden="true">{shortenAddress(paymentAddress)}</span>
              <span className="sr-only">{paymentAddress}</span>
            </code>
            <span
              aria-hidden="true"
              className="absolute top-full left-0 z-10 mt-1 hidden w-max max-w-[min(20rem,calc(100vw-3rem))] rounded border border-zinc-300 bg-white p-2 font-mono text-xs break-all shadow group-focus-within:block group-hover:block dark:border-zinc-600 dark:bg-zinc-900"
            >
              {paymentAddress}
            </span>
          </span>
          <button
            type="button"
            onClick={copyAddress}
            className="rounded border border-zinc-400 px-3 py-1 text-sm font-medium hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-zinc-500 dark:hover:bg-zinc-800"
          >
            Copy address
          </button>
        </div>

        <p role="status" className="mt-2 text-sm">
          {copyState === "copied" ? "✓ Address copied to clipboard." : null}
        </p>
        {copyState === "failed" ? (
          <div role="alert" className="mt-2 text-sm">
            <p className="font-medium">
              ✕ Could not copy automatically. Select the address below and copy
              it manually.
            </p>
            <p className="mt-1 font-mono break-all select-all">
              {paymentAddress}
            </p>
          </div>
        ) : null}
      </div>
    </header>
  );
}
