import React from 'react'
import { render, screen } from '@testing-library/react'

// Import component custom
import { Header } from '@/components/atomic-design/molecules/header'

// Mocks para los componentes Title y Text
jest.mock('@/components/atomic-design/atoms', () => ({
  Title: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="header-title" {...props}>
      {children}
    </div>
  ),
  Text: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="header-text" {...props}>
      {children}
    </div>
  ),
}))

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renderiza solo el título correctamente', () => {
    render(<Header title="Mi Título" />)
    expect(screen.getByTestId('header-title')).toHaveTextContent('Mi Título')
    expect(screen.queryByTestId('header-text')).not.toBeInTheDocument()
  })

  it('renderiza el texto opcional si se pasa', () => {
    render(<Header title="Mi Título" text="Descripción" />)
    expect(screen.getByTestId('header-title')).toHaveTextContent('Mi Título')
    expect(screen.getByTestId('header-text')).toHaveTextContent('Descripción')
  })

  it('renderiza los children si se pasan', () => {
    render(
      <Header title="Mi Título">
        <span data-testid="header-child">Soy un child</span>
      </Header>
    )
    expect(screen.getByTestId('header-title')).toBeInTheDocument()
    expect(screen.getByTestId('header-child')).toHaveTextContent('Soy un child')
  })

  it('aplica props de personalización correctamente', () => {
    render(
      <Header
        title="Personalizado"
        text="Texto"
        titleColor="primary"
        titleVariant="accent"
        titleAlign="center"
        textColor="primary"
        textVariant="muted"
        textAlign="right"
        className="mi-clase-extra"
      />
    )
    const title = screen.getByTestId('header-title')
    const text = screen.getByTestId('header-text')
    expect(title).toHaveTextContent('Personalizado')
    expect(text).toHaveTextContent('Texto')
  })

  it('aplica la clase className al section', () => {
    const { container } = render(
      <Header title="Con clase" className="clase-prueba" />
    )
    const section = container.querySelector('section')
    expect(section).toHaveClass('clase-prueba')
  })
})
