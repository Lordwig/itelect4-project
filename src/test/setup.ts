// Adds matchers like toBeInTheDocument() to Vitest's expect.
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Removes whatever the last test rendered. Without it, a second test
// would find the button twice: the old copy is still on the page.
afterEach(() => {
  cleanup();
});