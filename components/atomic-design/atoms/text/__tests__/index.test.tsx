import { render, screen } from "@testing-library/react";
import { Text } from "../index";

describe("Text", () => {
  it("should render text with content", () => {
    render(<Text>Texto de prueba</Text>);
    const text = screen.getByText("Texto de prueba");
    expect(text).toBeInTheDocument();
  });

  it("should render paragraph by default", () => {
    render(<Text>Default Text</Text>);
    const text = screen.getByText("Default Text");
    expect(text.tagName).toBe("P");
  });

  it("should render with p variant", () => {
    render(<Text variant="p">Paragraph Text</Text>);
    const text = screen.getByText("Paragraph Text");
    expect(text.tagName).toBe("P");
  });

  it("should render with lead variant", () => {
    render(<Text variant="lead">Lead Text</Text>);
    const text = screen.getByText("Lead Text");
    expect(text.tagName).toBe("P");
    expect(text).toBeInTheDocument();
  });

  it("should render with large variant", () => {
    render(<Text variant="large">Large Text</Text>);
    const text = screen.getByText("Large Text");
    expect(text.tagName).toBe("DIV");
  });

  it("should render with small variant", () => {
    render(<Text variant="small">Small Text</Text>);
    const text = screen.getByText("Small Text");
    expect(text.tagName).toBe("SMALL");
  });

  it("should render with muted variant", () => {
    render(<Text variant="muted">Muted Text</Text>);
    const text = screen.getByText("Muted Text");
    expect(text.tagName).toBe("P");
    expect(text).toBeInTheDocument();
  });

  it("should render with default color", () => {
    render(<Text color="default">Default Color</Text>);
    const text = screen.getByText("Default Color");
    expect(text).toBeInTheDocument();
  });

  it("should render with primary color", () => {
    render(<Text color="primary">Primary Color</Text>);
    const text = screen.getByText("Primary Color");
    expect(text).toHaveClass("text-primary");
  });

  it("should render with secondary color", () => {
    render(<Text color="secondary">Secondary Color</Text>);
    const text = screen.getByText("Secondary Color");
    expect(text).toHaveClass("text-secondary-foreground");
  });

  it("should render with accent color", () => {
    render(<Text color="accent">Accent Color</Text>);
    const text = screen.getByText("Accent Color");
    expect(text).toHaveClass("text-accent-foreground");
  });

  it("should accept custom className", () => {
    render(<Text className="custom-class">Custom Text</Text>);
    const text = screen.getByText("Custom Text");
    expect(text).toHaveClass("custom-class");
  });

  it("should combine variant and color", () => {
    render(
      <Text variant="lead" color="primary">
        Combined Text
      </Text>
    );
    const text = screen.getByText("Combined Text");
    expect(text).toHaveClass("text-primary");
  });

  it("should combine variant, color and className", () => {
    render(
      <Text variant="muted" color="accent" className="custom-class">
        Full Combined Text
      </Text>
    );
    const text = screen.getByText("Full Combined Text");
    expect(text).toHaveClass("text-accent-foreground");
    expect(text).toHaveClass("custom-class");
  });

  it("should pass through additional props", () => {
    render(
      <Text data-testid="custom-text" id="text-1">
        Text with Props
      </Text>
    );
    const text = screen.getByTestId("custom-text");
    expect(text).toHaveAttribute("id", "text-1");
  });
});
