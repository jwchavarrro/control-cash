import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card } from '../index'

describe('Card', () => {
  it('should render card component as div by default', () => {
    const { container } = render(<Card>Card Content</Card>)
    const card = container.querySelector('div[class*="rounded-xl"]')
    expect(card).toBeInTheDocument()
    expect(card?.tagName).toBe('DIV')
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('should render card as button when as="button"', () => {
    render(<Card as="button">Card Content</Card>)
    const button = screen.getByRole('button')
    expect(button.tagName).toBe('BUTTON')
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })

  it('should apply base classes to div', () => {
    const { container } = render(<Card>Content</Card>)
    const card = container.querySelector('div')
    expect(card).toHaveClass('rounded-xl', 'border', 'min-h-20', 'shadow-lg')
  })

  it('should apply base classes to button', () => {
    const { container } = render(<Card as="button">Content</Card>)
    const button = container.querySelector('button')
    expect(button).toHaveClass(
      'rounded-xl',
      'border',
      'min-h-20',
      'shadow-lg',
      'cursor-pointer'
    )
  })

  it('should accept custom className', () => {
    const { container } = render(<Card className="custom-card">Content</Card>)
    const card = container.querySelector('.custom-card')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('custom-card')
  })

  it('should handle button click when as="button"', async () => {
    const handleClick = jest.fn()
    const user = userEvent.setup()
    render(
      <Card as="button" onClick={handleClick}>
        Click me
      </Card>
    )
    const button = screen.getByRole('button')
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should render children correctly', () => {
    render(
      <Card>
        <div data-testid="child">Child Content</div>
      </Card>
    )
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  it('should pass HTML attributes to div', () => {
    const { container } = render(
      <Card data-testid="card-div" id="test-card">
        Content
      </Card>
    )
    const card = container.querySelector('#test-card')
    expect(card).toHaveAttribute('data-testid', 'card-div')
  })

  it('should pass HTML attributes to button', () => {
    render(
      <Card as="button" data-testid="card-button" type="submit">
        Content
      </Card>
    )
    const button = screen.getByTestId('card-button')
    expect(button).toHaveAttribute('type', 'submit')
  })
})
