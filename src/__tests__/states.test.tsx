import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EmptyState, ErrorState, LoadingState } from "@/components";

afterEach(cleanup);

describe("LoadingState", () => {
  it("announces a default and a custom label", () => {
    render(<LoadingState />);
    expect(screen.getByRole("status").textContent).toContain("Loading…");
    cleanup();
    render(<LoadingState label="Loading payments…" />);
    expect(screen.getByRole("status").textContent).toContain(
      "Loading payments…",
    );
  });
});

describe("ErrorState", () => {
  it("shows the message as an alert", () => {
    render(<ErrorState message="Could not load the project." />);
    expect(screen.getByRole("alert").textContent).toContain(
      "Could not load the project.",
    );
    expect(
      screen.getByRole("heading", { name: "Something went wrong" }),
    ).toBeDefined();
  });

  it("calls the retry callback", () => {
    const onRetry = vi.fn();
    render(<ErrorState message="Failed" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("has no retry button without a callback", () => {
    render(<ErrorState message="Failed" />);
    expect(screen.queryByRole("button")).toBeNull();
  });
});

describe("EmptyState", () => {
  it("shows the title, description and action", () => {
    render(
      <EmptyState
        title="No payments yet"
        description="Payments appear here."
        action={<a href="/create">Create a project</a>}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "No payments yet" }),
    ).toBeDefined();
    expect(screen.getByText("Payments appear here.")).toBeDefined();
    expect(
      screen.getByRole("link", { name: "Create a project" }),
    ).toBeDefined();
  });

  it("works with only a title", () => {
    render(<EmptyState title="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeDefined();
  });
});
