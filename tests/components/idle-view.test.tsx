import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { IdleView } from "@/components/idle-view";

describe("IdleView", () => {
  it("renders the input, examples, and research-only framing", () => {
    render(<IdleView onSubmit={() => undefined} />);

    expect(screen.getByLabelText(/market url or ticker/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^research$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: /examples/i })).toBeInTheDocument();
  });

  it("calls onSubmit with the typed value when the form is submitted", async () => {
    const onSubmit = vi.fn();
    render(<IdleView onSubmit={onSubmit} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/market url or ticker/i), "KX-DEMO");
    await user.click(screen.getByRole("button", { name: /^research$/i }));

    expect(onSubmit).toHaveBeenCalledWith("KX-DEMO");
  });
});
