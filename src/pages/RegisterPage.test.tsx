import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RegisterPage from "./RegisterPage";

// RegisterPage needs a router (useNavigate, Link) and a query client
// (useMutation) around it, exactly as main.tsx gives the real app.
function renderPage() {
  const client = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <RegisterPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe("RegisterPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows every schema message when the form is sent empty", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(await screen.findByText("Enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
    expect(
      screen.getByText("Password needs at least 8 characters."),
    ).toBeInTheDocument();
  });

  it("sends nothing to the API while the form is invalid", async () => {
    const user = userEvent.setup();
    // Watches fetch without replacing it: any request would be recorded.
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    renderPage();

    await user.type(screen.getByLabelText("Name"), "Juan dela Cruz");
    await user.type(screen.getByLabelText("Email"), "juan@example.com");
    await user.type(screen.getByLabelText("Password"), "short");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    // Only the broken field complains; the two good ones stay quiet.
    expect(
      await screen.findByText("Password needs at least 8 characters."),
    ).toBeInTheDocument();
    expect(screen.queryByText("Enter your name.")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Enter a valid email address."),
    ).not.toBeInTheDocument();

    expect(fetchSpy).not.toHaveBeenCalled();
  });
});