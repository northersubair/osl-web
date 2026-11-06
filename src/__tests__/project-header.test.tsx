import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getInitials,
  ProjectHeader,
  shortenAddress,
} from "@/components/ProjectHeader";

const ADDRESS = "GABCDEFGHIJKLMNOPQRSTUVWXYZ234567ABCDEFGHIJKLMNOPQRSTUVW";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function stubClipboard(writeText: (text: string) => Promise<void>) {
  vi.stubGlobal("navigator", { clipboard: { writeText } });
}

describe("ProjectHeader", () => {
  it("shows the name as a heading and the description", () => {
    render(
      <ProjectHeader
        name="Acme"
        description="Tools for everyone"
        paymentAddress={ADDRESS}
      />,
    );
    expect(screen.getByRole("heading", { name: "Acme" })).toBeDefined();
    expect(screen.getByText("Tools for everyone")).toBeDefined();
  });

  it("omits the description when absent", () => {
    render(<ProjectHeader name="Acme" paymentAddress={ADDRESS} />);
    expect(screen.queryByTestId("description")).toBeNull();
  });

  it("renders the logo without a referrer", () => {
    const { container } = render(
      <ProjectHeader
        name="Acme"
        logoUrl="https://example.com/logo.png"
        paymentAddress={ADDRESS}
      />,
    );
    const img = container.querySelector("img");
    expect(img?.getAttribute("src")).toBe("https://example.com/logo.png");
    expect(img?.getAttribute("referrerpolicy")).toBe("no-referrer");
    expect(screen.queryByTestId("logo-fallback")).toBeNull();
  });

  it("falls back to initials when there is no logo", () => {
    render(<ProjectHeader name="Open Support" paymentAddress={ADDRESS} />);
    expect(screen.getByTestId("logo-fallback").textContent).toBe("OS");
  });

  it("falls back to initials when the logo fails to load", () => {
    const { container } = render(
      <ProjectHeader
        name="Acme Tools"
        logoUrl="https://example.com/broken.png"
        paymentAddress={ADDRESS}
      />,
    );
    fireEvent.error(container.querySelector("img")!);
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByTestId("logo-fallback").textContent).toBe("AT");
  });

  it("shows a shortened address and exposes the full one", () => {
    render(<ProjectHeader name="Acme" paymentAddress={ADDRESS} />);
    expect(screen.getByText(shortenAddress(ADDRESS))).toBeDefined();
    // Full address is in the DOM for screen readers and as the hover title.
    expect(screen.getByText(ADDRESS, { selector: ".sr-only" })).toBeDefined();
    expect(screen.getByTitle(ADDRESS)).toBeDefined();
    expect(screen.getByTitle(ADDRESS).tabIndex).toBe(0);
  });

  it("copies the full address and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    stubClipboard(writeText);
    render(<ProjectHeader name="Acme" paymentAddress={ADDRESS} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy address" }));

    expect(writeText).toHaveBeenCalledWith(ADDRESS);
    expect(await screen.findByText(/Address copied/)).toBeDefined();
    expect(screen.getByRole("status").textContent).toMatch(/Address copied/);
  });

  it("shows a visible message and a selectable address when copy fails", async () => {
    stubClipboard(vi.fn().mockRejectedValue(new Error("denied")));
    render(<ProjectHeader name="Acme" paymentAddress={ADDRESS} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy address" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toMatch(/Could not copy/);
    expect(alert.textContent).toContain(ADDRESS);
  });
});

describe("helpers", () => {
  it("shortens only long addresses", () => {
    expect(shortenAddress(ADDRESS)).toBe(
      "GABCDE…OPQRSTUVW".replace("OPQRSTUVW", ADDRESS.slice(-6)),
    );
    expect(shortenAddress("SHORT")).toBe("SHORT");
  });

  it("builds initials", () => {
    expect(getInitials("acme")).toBe("A");
    expect(getInitials("  ")).toBe("?");
  });
});
