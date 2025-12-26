import { render, screen } from "@testing-library/react";
import { Title } from "../index";

describe("Title", () => {
  it("should render title with content", () => {
    render(<Title>Test Title</Title>);
    const title = screen.getByText("Test Title");
    expect(title).toBeInTheDocument();
  });

  it("should render h1 by default", () => {
    render(<Title>Default Title</Title>);
    const title = screen.getByText("Default Title");
    expect(title.tagName).toBe("H1");
  });

  it("should render h1 when level is 1", () => {
    render(<Title level={1}>Level 1 Title</Title>);
    const title = screen.getByText("Level 1 Title");
    expect(title.tagName).toBe("H1");
  });

  it("should render h2 when level is 2", () => {
    render(<Title level={2}>Level 2 Title</Title>);
    const title = screen.getByText("Level 2 Title");
    expect(title.tagName).toBe("H2");
  });

  it("should render h3 when level is 3", () => {
    render(<Title level={3}>Level 3 Title</Title>);
    const title = screen.getByText("Level 3 Title");
    expect(title.tagName).toBe("H3");
  });

  it("should render h4 when level is 4", () => {
    render(<Title level={4}>Level 4 Title</Title>);
    const title = screen.getByText("Level 4 Title");
    expect(title.tagName).toBe("H4");
  });

  it("should render with default variant", () => {
    render(<Title variant="default">Default Variant</Title>);
    const title = screen.getByText("Default Variant");
    expect(title).toBeInTheDocument();
  });

  it("should render with accent variant", () => {
    render(<Title variant="accent">Accent Variant</Title>);
    const title = screen.getByText("Accent Variant");
    expect(title).toHaveClass("text-primary");
  });

  it("should render with gradient variant", () => {
    render(<Title variant="gradient">Gradient Variant</Title>);
    const title = screen.getByText("Gradient Variant");
    expect(title).toHaveClass("bg-gradient-to-r");
  });

  it("should render with default color", () => {
    render(<Title color="default">Default Color</Title>);
    const title = screen.getByText("Default Color");
    expect(title).toBeInTheDocument();
  });

  it("should render with primary color", () => {
    render(<Title color="primary">Primary Color</Title>);
    const title = screen.getByText("Primary Color");
    expect(title).toHaveClass("text-primary");
  });

  it("should render with secondary color", () => {
    render(<Title color="secondary">Secondary Color</Title>);
    const title = screen.getByText("Secondary Color");
    expect(title).toHaveClass("text-secondary-foreground");
  });

  it("should render with accent color", () => {
    render(<Title color="accent">Accent Color</Title>);
    const title = screen.getByText("Accent Color");
    expect(title).toHaveClass("text-accent-foreground");
  });

  it("should apply custom className", () => {
    render(<Title className="custom-class">Custom Class</Title>);
    const title = screen.getByText("Custom Class");
    expect(title).toHaveClass("custom-class");
  });

  it("should combine variant and color classes", () => {
    render(
      <Title variant="accent" color="primary">
        Combined
      </Title>
    );
    const title = screen.getByText("Combined");
    expect(title).toHaveClass("text-primary");
  });

  it("should have font-title class", () => {
    render(<Title>Font Title</Title>);
    const title = screen.getByText("Font Title");
    expect(title).toHaveClass("font-title");
  });
});
