import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LanguageSwitcher from "./LanguageSwitcher";

const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    refreshMock.mockClear();
    document.cookie = "NEXT_LOCALE=; Max-Age=0; path=/";
  });

  it("sets NEXT_LOCALE to en when clicking EN", async () => {
    render(<LanguageSwitcher />);

    await userEvent.click(screen.getByRole("button", { name: "EN" }));

    expect(document.cookie).toContain("NEXT_LOCALE=en");
    expect(refreshMock).toHaveBeenCalled();
  });

  it("sets NEXT_LOCALE to fr when clicking FR", async () => {
    render(<LanguageSwitcher />);

    await userEvent.click(screen.getByRole("button", { name: "FR" }));

    expect(document.cookie).toContain("NEXT_LOCALE=fr");
    expect(refreshMock).toHaveBeenCalled();
  });
});