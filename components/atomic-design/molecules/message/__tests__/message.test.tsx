import React from 'react'
import { render, screen } from '@testing-library/react'
import { Message } from '../index'

// Mock Title and Text components
jest.mock('@/components/atomic-design/atoms', () => ({
  Title: ({
    children,
    level,
    className,
    ...props
  }: {
    children: React.ReactNode
    level?: number
    className?: string
    [key: string]: unknown
  }) => (
    <h4
      data-testid="message-title"
      data-level={level}
      className={className}
      {...props}
    >
      {children}
    </h4>
  ),
  Text: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode
    className?: string
    [key: string]: unknown
  }) => (
    <p data-testid="message-text" className={className} {...props}>
      {children}
    </p>
  ),
}))

describe('Message', () => {
  const MockIcon = ({
    className,
    ...props
  }: {
    className?: string
    [key: string]: unknown
  }) => <div data-testid="test-icon" className={className} {...props} />

  it('renderiza el componente correctamente', () => {
    render(
      <Message
        icon={MockIcon}
        title="Mensaje de prueba"
        description="Descripción del mensaje"
      />
    )
    expect(screen.getByText('Mensaje de prueba')).toBeInTheDocument()
    expect(screen.getByText('Descripción del mensaje')).toBeInTheDocument()
  })

  it('renderiza como elemento div', () => {
    const { container } = render(
      <Message icon={MockIcon} title="Título" description="Descripción" />
    )
    const div = container.querySelector('div')
    expect(div).toBeInTheDocument()
  })

  describe('icon', () => {
    it('renderiza el icono correctamente', () => {
      render(
        <Message icon={MockIcon} title="Título" description="Descripción" />
      )
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    it('renderiza cualquier ReactNode como icono', () => {
      render(
        <Message
          icon={({
            className,
            ...props
          }: {
            className?: string
            [key: string]: unknown
          }) => (
            <div data-testid="custom-icon" className={className} {...props}>
              Icon
            </div>
          )}
          title="Título"
          description="Descripción"
        />
      )
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('title', () => {
    it('no renderiza el título si no se proporciona', () => {
      render(<Message icon={MockIcon} description="Descripción" />)
      expect(screen.queryByTestId('message-title')).not.toBeInTheDocument()
    })

    it('renderiza el título cuando se proporciona', () => {
      render(
        <Message
          icon={MockIcon}
          title="Título del mensaje"
          description="Descripción"
        />
      )
      expect(screen.getByText('Título del mensaje')).toBeInTheDocument()
    })

    it('aplica level 4 al título', () => {
      render(
        <Message icon={MockIcon} title="Título" description="Descripción" />
      )
      const heading = screen.getByTestId('message-title')
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Título')
      expect(heading).toHaveAttribute('data-level', '4')
    })
  })

  describe('description', () => {
    it('no renderiza la descripción si no se proporciona', () => {
      render(<Message icon={MockIcon} title="Título" />)
      expect(screen.queryByTestId('message-text')).not.toBeInTheDocument()
    })

    it('renderiza la descripción cuando se proporciona', () => {
      render(
        <Message
          icon={MockIcon}
          title="Título"
          description="Descripción del mensaje"
        />
      )
      expect(screen.getByText('Descripción del mensaje')).toBeInTheDocument()
    })

    it('aplica las clases correctas a la descripción', () => {
      render(
        <Message icon={MockIcon} title="Título" description="Descripción" />
      )
      const text = screen.getByTestId('message-text')
      expect(text).toBeInTheDocument()
      expect(text).toHaveTextContent('Descripción')
      expect(text).toHaveClass('m-0!')
      expect(text).toHaveClass('p-0!')
    })
  })

  describe('clases base', () => {
    it('aplica las clases base correctamente al contenedor principal', () => {
      const { container } = render(
        <Message icon={MockIcon} title="Título" description="Descripción" />
      )
      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('flex')
      expect(mainDiv).toHaveClass('flex-col')
      expect(mainDiv).toHaveClass('items-center')
      expect(mainDiv).toHaveClass('opacity-50')
    })

    it('aplica las clases correctas al contenedor interno', () => {
      const { container } = render(
        <Message icon={MockIcon} title="Título" description="Descripción" />
      )
      const innerDiv = container.querySelector('div > div')
      expect(innerDiv).toHaveClass('flex')
      expect(innerDiv).toHaveClass('flex-col')
      expect(innerDiv).toHaveClass('items-center')
    })
  })

  describe('className', () => {
    it('aplica clases personalizadas', () => {
      const { container } = render(
        <Message
          icon={MockIcon}
          title="Título"
          description="Descripción"
          className="custom-class"
        />
      )
      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('custom-class')
    })

    it('combina clases personalizadas con las clases por defecto', () => {
      const { container } = render(
        <Message
          icon={MockIcon}
          title="Título"
          description="Descripción"
          className="custom-class border-2"
        />
      )
      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('flex')
      expect(mainDiv).toHaveClass('flex-col')
      expect(mainDiv).toHaveClass('custom-class')
      expect(mainDiv).toHaveClass('border-2')
    })
  })

  describe('combinación de props', () => {
    it('renderiza correctamente solo con icono', () => {
      render(<Message icon={MockIcon} />)
      expect(screen.getByTestId('test-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('message-title')).not.toBeInTheDocument()
      expect(screen.queryByTestId('message-text')).not.toBeInTheDocument()
    })

    it('renderiza correctamente con icono y título', () => {
      render(<Message icon={MockIcon} title="Solo título" />)
      expect(screen.getByText('Solo título')).toBeInTheDocument()
      expect(screen.queryByTestId('message-text')).not.toBeInTheDocument()
    })

    it('renderiza correctamente con icono y descripción', () => {
      render(<Message icon={MockIcon} description="Solo descripción" />)
      expect(screen.getByText('Solo descripción')).toBeInTheDocument()
      expect(screen.queryByTestId('message-title')).not.toBeInTheDocument()
    })

    it('aplica múltiples props correctamente', () => {
      const { container } = render(
        <Message
          icon={MockIcon}
          title="Título completo"
          description="Descripción completa"
          className="custom-message"
        />
      )
      const mainDiv = container.firstChild as HTMLElement
      expect(mainDiv).toHaveClass('custom-message')
      expect(mainDiv).toHaveClass('flex')
      expect(mainDiv).toHaveClass('flex-col')

      const heading = screen.getByTestId('message-title')
      expect(heading).toHaveTextContent('Título completo')
      expect(heading).toHaveAttribute('data-level', '4')

      const text = screen.getByTestId('message-text')
      expect(text).toHaveTextContent('Descripción completa')
      expect(text).toHaveClass('m-0!')
      expect(text).toHaveClass('p-0!')
    })
  })
})
