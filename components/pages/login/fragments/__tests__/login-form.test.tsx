import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '../login-form'

jest.mock('next/link')

describe('LoginForm', () => {
  it('should render the form with all elements', () => {
    render(<LoginForm />)

    // Verificar título
    expect(screen.getByText('Login to your account')).toBeInTheDocument()

    // Verificar descripción
    expect(
      screen.getByText('Enter your email below to login to your account')
    ).toBeInTheDocument()

    // Verificar inputs por placeholder
    expect(screen.getByPlaceholderText('m@example.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('********')).toBeInTheDocument()

    // Verificar botón de login
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()

    // Verificar links
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument()
    expect(screen.getByText('Sign up')).toBeInTheDocument()
  })

  it('should render email input with correct attributes', () => {
    render(<LoginForm />)

    const emailInput = screen.getByPlaceholderText('m@example.com')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(emailInput).toHaveAttribute('placeholder', 'm@example.com')
    expect(emailInput).toBeRequired()
  })

  it('should render password input with correct attributes', () => {
    render(<LoginForm />)

    const passwordInput = screen.getByPlaceholderText('********')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('id', 'password')
    expect(passwordInput).toHaveAttribute('placeholder', '********')
    expect(passwordInput).toBeRequired()
  })

  it('should allow typing in email input', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const emailInput = screen.getByPlaceholderText('m@example.com')
    await user.type(emailInput, 'test@example.com')

    expect(emailInput).toHaveValue('test@example.com')
  })

  it('should allow typing in password input', async () => {
    const user = userEvent.setup()
    render(<LoginForm />)

    const passwordInput = screen.getByPlaceholderText('********')
    await user.type(passwordInput, 'password123')

    expect(passwordInput).toHaveValue('password123')
  })

  it('should render login button as submit type', () => {
    render(<LoginForm />)

    const loginButton = screen.getByRole('button', { name: 'Login' })
    expect(loginButton).toHaveAttribute('type', 'submit')
  })

  it('should render forgot password link with correct href', () => {
    render(<LoginForm />)

    const forgotPasswordLink = screen
      .getByText('Forgot your password?')
      .closest('a')
    expect(forgotPasswordLink).toHaveAttribute('href', '#')
  })

  it('should render sign up link with correct href', () => {
    render(<LoginForm />)

    const signUpLink = screen.getByText('Sign up').closest('a')
    expect(signUpLink).toHaveAttribute('href', '#')
  })

  it('should apply custom className when provided', () => {
    const { container } = render(<LoginForm className="custom-class" />)

    const form = container.querySelector('form')
    expect(form).toHaveClass('custom-class')
  })

  it('should pass through form props', () => {
    render(<LoginForm data-testid="login-form" />)

    const form = screen.getByTestId('login-form')
    expect(form).toBeInTheDocument()
  })

  it('should render form with correct structure', () => {
    const { container } = render(<LoginForm />)

    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()

    // Verificar que hay un FieldGroup
    const fieldGroup = container.querySelector('[data-slot="field-group"]')
    expect(fieldGroup).toBeInTheDocument()

    // Verificar que hay múltiples Fields
    const fields = container.querySelectorAll('[data-slot="field"]')
    expect(fields.length).toBeGreaterThan(0)
  })

  it('should render header with title and description', () => {
    render(<LoginForm />)

    const header = screen.getByText('Login to your account').closest('header')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'gap-1',
      'text-center'
    )
  })
})
