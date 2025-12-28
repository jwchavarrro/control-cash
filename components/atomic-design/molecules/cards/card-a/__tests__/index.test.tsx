import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CardA } from '../index'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock Title and Text
jest.mock('@/components/atomic-design/atoms', () => ({
  Title: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="card-a-title">{children}</h3>
  ),
  Text: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="card-a-text">{children}</p>
  ),
}))

// Mock Card
jest.mock('@/components/atomic-design/molecules/cards/card', () => ({
  Card: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode
    onClick?: () => void
  }) => (
    <button data-testid="card-a-button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}))

describe('CardA', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render card with icon, title and description', () => {
    const icon = <span data-testid="test-icon">Icon</span>
    render(
      <CardA
        icon={icon}
        title="Test Title"
        description="Test Description"
        link="/test"
      />
    )

    expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    expect(screen.getByTestId('card-a-title')).toHaveTextContent('Test Title')
    expect(screen.getByTestId('card-a-text')).toHaveTextContent(
      'Test Description'
    )
  })

  it('should navigate to link when clicked', async () => {
    const user = userEvent.setup()
    const icon = <span>Icon</span>
    render(
      <CardA
        icon={icon}
        title="Test Title"
        description="Test Description"
        link="/dashboard/test"
      />
    )

    const button = screen.getByTestId('card-a-button')
    await user.click(button)

    expect(mockPush).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('/dashboard/test')
  })

  it('should render as button', () => {
    const icon = <span>Icon</span>
    render(
      <CardA
        icon={icon}
        title="Test Title"
        description="Test Description"
        link="/test"
      />
    )

    const button = screen.getByTestId('card-a-button')
    expect(button.tagName).toBe('BUTTON')
  })

  it('should apply custom className', () => {
    const icon = <span>Icon</span>
    const { container } = render(
      <CardA
        icon={icon}
        title="Test Title"
        description="Test Description"
        link="/test"
      />
    )

    const button = container.querySelector('button')
    expect(button).toHaveClass('hover:bg-primary/10', 'border-primary')
  })
})
