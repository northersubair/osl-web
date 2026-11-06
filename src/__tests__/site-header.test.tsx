import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NAV_ITEMS, SiteFooter, SiteHeader } from "@/components";

const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

afterEach(cleanup);

describe("SiteHeader navigation", () => {
  it("links to every route from a labelled navigation landmark", () => {
    render(<SiteHeader />);
    const nav = screen.getByRole("navigation", { name: "Main" });
    for (const { href, label } of NAV_ITEMS) {
      const link = screen.getByRole("link", { name: label });
      expect(nav.contains(link)).toBe(true);
      expect(link.getAttribute("href")).toBe(href);
    }
    expect(NAV_ITEMS.map((item) => item.label)).toEqual([
      "Home",
      "Create a project",
      "About",
    ]);
  });

  it("marks the current page", () => {
    pathname.current = "/about";
    render(<SiteHeader />);
    expect(
      screen.getByRole("link", { name: "About" }).getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByRole("link", { name: "Home" }).getAttribute("aria-current"),
    ).toBeNull();
    pathname.current = "/";
  });

  it("uses only native links, so it is keyboard navigable", () => {
    render(<SiteHeader />);
    for (const link of screen.getAllByRole("link")) {
      expect(link.tagName).toBe("A");
      expect(link.getAttribute("tabindex")).not.toBe("-1");
    }
  });

  it("renders a header landmark and the footer a contentinfo landmark", () => {
    render(
      <>
        <SiteHeader />
        <SiteFooter />
      </>,
    );
    expect(screen.getByRole("banner")).toBeDefined();
    expect(screen.getByRole("contentinfo")).toBeDefined();
  });
});
