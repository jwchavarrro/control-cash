import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LoginForm } from '../login-form'

jest.mock('next/link')

// Helper para crear un QueryClient para los tests
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

// Helper para renderizar con QueryClientProvider
const renderWithQueryClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient()
  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  )
}

describe('LoginForm', () => {
  it('should render the form with all elements', () => {
    renderWithQueryClient(<LoginForm />)

    // Verificar título
    expect(screen.getByText('Login to your account')).toBeInTheDocument()

    // Verificar descripción
    expect(
      screen.getByText('Enter your email below to login to your account')
    ).toBeInTheDocument()

    // Verificar inputs por placeholder
    expect(
      screen.getByPlaceholderText('ctrlcash@example.com')
    ).toBeInTheDocument()
    expect(screen.getByPlaceholderText('●●●●●●●●')).toBeInTheDocument()

    // Verificar botón de login
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument()

    // Verificar links
    expect(screen.getByText('Forgot your password?')).toBeInTheDocument()
    expect(screen.getByText('Sign up')).toBeInTheDocument()
  })

  it('should render email input with correct attributes', () => {
    renderWithQueryClient(<LoginForm />)

    const emailInput = screen.getByPlaceholderText('ctrlcash@example.com')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('id', 'email')
    expect(emailInput).toHaveAttribute('placeholder', 'ctrlcash@example.com')
  })

  it('should render password input with correct attributes', () => {
    renderWithQueryClient(<LoginForm />)

    const passwordInput = screen.getByPlaceholderText('●●●●●●●●')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('id', 'password')
    expect(passwordInput).toHaveAttribute('placeholder', '●●●●●●●●')
  })

  it('should allow typing in email input', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<LoginForm />)

    const emailInput = screen.getByPlaceholderText('ctrlcash@example.com')
    await user.type(emailInput, 'test@example.com')

    expect(emailInput).toHaveValue('test@example.com')
  })

  it('should allow typing in password input', async () => {
    const user = userEvent.setup()
    renderWithQueryClient(<LoginForm />)

    const passwordInput = screen.getByPlaceholderText('●●●●●●●●')
    await user.type(passwordInput, 'password123')

    expect(passwordInput).toHaveValue('password123')
  })

  it('should render login button as submit type', () => {
    renderWithQueryClient(<LoginForm />)

    const loginButton = screen.getByRole('button', { name: 'Login' })
    expect(loginButton).toHaveAttribute('type', 'submit')
  })

  it('should render forgot password link with correct href', () => {
    renderWithQueryClient(<LoginForm />)

    const forgotPasswordLink = screen
      .getByText('Forgot your password?')
      .closest('a')
    expect(forgotPasswordLink).toHaveAttribute('href', '/forgot')
  })

  it('should render sign up link with correct href', () => {
    renderWithQueryClient(<LoginForm />)

    const signUpLink = screen.getByText('Sign up').closest('a')
    expect(signUpLink).toHaveAttribute('href', '/register')
  })

  it('should render form element', () => {
    const { container } = renderWithQueryClient(<LoginForm />)

    const form = container.querySelector('form')
    expect(form).toBeInTheDocument()
  })

  it('should render form with correct structure', () => {
    const { container } = renderWithQueryClient(<LoginForm />)

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
    renderWithQueryClient(<LoginForm />)

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
