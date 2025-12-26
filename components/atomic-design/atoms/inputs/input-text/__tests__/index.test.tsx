import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputText } from "../index";

describe("InputText", () => {
  it("should render input without label", () => {
    render(<InputText placeholder="Enter text" />);
    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("should render input with label", () => {
    render(<InputText label="Email" placeholder="Enter email" />);
    const label = screen.getByText("Email");
    const input = screen.getByPlaceholderText("Enter email");
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it("should show required indicator when required is true", () => {
    render(<InputText label="Email" required />);
    const requiredIndicator = screen.getByText("*");
    expect(requiredIndicator).toBeInTheDocument();
  });

  it("should display error message", () => {
    render(<InputText label="Email" error="Email is required" />);
    const error = screen.getByText("Email is required");
    expect(error).toBeInTheDocument();
    expect(error).toHaveAttribute("role", "alert");
  });

  it("should display helper text when no error", () => {
    render(<InputText label="Email" helperText="Enter your email address" />);
    const helperText = screen.getByText("Enter your email address");
    expect(helperText).toBeInTheDocument();
  });

  it("should not display helper text when error is present", () => {
    render(
      <InputText
        label="Email"
        error="Email is required"
        helperText="Enter your email address"
      />
    );
    const error = screen.getByText("Email is required");
    const helperText = screen.queryByText("Enter your email address");
    expect(error).toBeInTheDocument();
    expect(helperText).not.toBeInTheDocument();
  });

  it("should apply error styles when error is present", () => {
    render(<InputText label="Email" error="Error message" />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("should handle input changes", async () => {
    const user = userEvent.setup();
    render(<InputText label="Email" />);
    const input = screen.getByLabelText("Email");
    await user.type(input, "test@example.com");
    expect(input).toHaveValue("test@example.com");
  });

  it("should apply size styles", () => {
    const { rerender } = render(<InputText size="sm" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-8");

    rerender(<InputText size="md" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-9");

    rerender(<InputText size="lg" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveClass("h-11");
  });

  it("should apply variant styles", () => {
    const { rerender } = render(<InputText variant="outline" />);
    let input = screen.getByRole("textbox");
    expect(input).toHaveClass("border-2");

    rerender(<InputText variant="filled" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveClass("bg-muted/50");
  });

  it("should associate label with input", () => {
    render(<InputText label="Email" id="email-input" />);
    const label = screen.getByText("Email");
    const input = screen.getByLabelText("Email");
    expect(label).toHaveAttribute("for", "email-input");
    expect(input).toHaveAttribute("id", "email-input");
  });

  it("should generate unique id when id is not provided", () => {
    render(<InputText label="Email" />);
    const label = screen.getByText("Email");
    const input = screen.getByLabelText("Email");
    const labelFor = label.getAttribute("for");
    const inputId = input.getAttribute("id");
    expect(labelFor).toBe(inputId);
    expect(inputId).toBeTruthy();
  });

  it("should pass through all input props", () => {
    render(
      <InputText
        type="email"
        disabled
        placeholder="Enter email"
        data-testid="custom-input"
      />
    );
    const input = screen.getByTestId("custom-input");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("placeholder", "Enter email");
  });
});
