import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "../index";

describe("Card", () => {
  it("should render card component", () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText("Card Content");
    expect(card).toBeInTheDocument();
  });

  it("should render card with title", () => {
    render(<Card title="Card Title">Content</Card>);
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render card with description", () => {
    render(<Card description="Card Description">Content</Card>);
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render card with title and description", () => {
    render(
      <Card title="Card Title" description="Card Description">
        Content
      </Card>
    );
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render card with button", () => {
    render(
      <Card title="Card Title" buttonText="Click me">
        Content
      </Card>
    );
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should handle button click", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();
    render(
      <Card
        title="Card Title"
        buttonText="Click me"
        onButtonClick={handleClick}
      >
        Content
      </Card>
    );
    const button = screen.getByRole("button");
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render card with different button variants", () => {
    const { rerender } = render(
      <Card title="Card" buttonText="Button" buttonVariant="default">
        Content
      </Card>
    );
    let button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary");

    rerender(
      <Card title="Card" buttonText="Button" buttonVariant="destructive">
        Content
      </Card>
    );
    button = screen.getByRole("button");
    expect(button).toHaveClass("bg-destructive");

    rerender(
      <Card title="Card" buttonText="Button" buttonVariant="outline">
        Content
      </Card>
    );
    button = screen.getByRole("button");
    expect(button).toHaveClass("border");
  });

  it("should render card with header action", () => {
    render(
      <Card
        title="Card Title"
        showHeaderAction
        headerAction={<button>Action</button>}
      >
        Content
      </Card>
    );
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
  });

  it("should not render header when no title, description or action", () => {
    render(<Card>Content Only</Card>);
    expect(screen.getByText("Content Only")).toBeInTheDocument();
    // No header should be rendered
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("should not render footer when no buttonText", () => {
    render(<Card title="Card Title">Content</Card>);
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should accept custom className", () => {
    render(<Card className="custom-card">Content</Card>);
    const card = screen.getByText("Content").closest('[data-slot="card"]');
    expect(card).toHaveClass("custom-card");
  });

  it("should render card with all props", () => {
    const handleClick = jest.fn();
    render(
      <Card
        title="Full Card"
        description="Full Description"
        buttonText="Full Button"
        onButtonClick={handleClick}
        buttonVariant="secondary"
        className="custom-class"
      >
        Full Content
      </Card>
    );
    expect(screen.getByText("Full Card")).toBeInTheDocument();
    expect(screen.getByText("Full Description")).toBeInTheDocument();
    expect(screen.getByText("Full Content")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /full button/i })
    ).toBeInTheDocument();
  });

  it("should not render header action when showHeaderAction is false", () => {
    render(
      <Card
        title="Card Title"
        showHeaderAction={false}
        headerAction={<button>Action</button>}
      >
        Content
      </Card>
    );
    expect(
      screen.queryByRole("button", { name: /action/i })
    ).not.toBeInTheDocument();
  });

  it("should not render header action when headerAction is not provided", () => {
    render(
      <Card title="Card Title" showHeaderAction>
        Content
      </Card>
    );
    expect(screen.getByText("Card Title")).toBeInTheDocument();
    // No action button should be rendered
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
