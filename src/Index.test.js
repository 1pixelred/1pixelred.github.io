import { render, screen } from "@testing-library/react";
import Index from "./routes/index";

test("RED PIXEL", () => {
  render(<Index />);
  const linkElement = screen.getByText(/RED/i);
  expect(linkElement).toBeInTheDocument();
});
