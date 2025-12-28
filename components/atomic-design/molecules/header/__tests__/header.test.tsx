import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';

// Import component custom
import { Header } from '@/components/atomic-design/molecules/headers';

// Mocks para los componentes Title y Text
jest.mock('@/components/atomic-design/atoms/typography/title', () => ({
  Title: (props: Record<string, unknown>) => (
    <div data-testid='header-title' aria-label={props['aria-label'] as string}>
      {props.title as ReactNode}
    </div>
  ),
}));
jest.mock('@/components/atomic-design/atoms/typography/text', () => ({
  Text: (props: Record<string, unknown>) => {
    // Mapear ariaLabel a aria-label y exponer color como data-color
    const ariaLabel = props.ariaLabel as string | undefined;
    const color = props.color as string | undefined;
    return (
      <div data-testid='header-text' aria-label={ariaLabel} data-color={color}>
        {props.text as ReactNode}
      </div>
    );
  },
}));

// Mock del hook useThemeSwitcher
jest.mock('@/hooks/use-theme', () => ({
  useThemeSwitcher: jest.fn(),
}));

import { useThemeSwitcher } from '@/hooks/use-theme';

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('usa textColor="gray" por defecto en modo claro', () => {
    (useThemeSwitcher as jest.Mock).mockReturnValue({ theme: 'light' });
    render(<Header title='Claro' text='Texto claro' />);
    const text = screen.getByTestId('header-text');
    expect(text.getAttribute('data-color')).toBe('gray');
  });

  it('usa textColor="default" por defecto en modo oscuro', () => {
    (useThemeSwitcher as jest.Mock).mockReturnValue({ theme: 'dark' });
    render(<Header title='Oscuro' text='Texto oscuro' />);
    const text = screen.getByTestId('header-text');
    expect(text.getAttribute('data-color')).toBe('default');
  });

  it('renderiza solo el título correctamente', () => {
    render(<Header title='Mi Título' />);
    expect(screen.getByTestId('header-title')).toHaveTextContent('Mi Título');
    expect(screen.queryByTestId('header-text')).not.toBeInTheDocument();
  });

  it('renderiza el texto opcional si se pasa', () => {
    render(<Header title='Mi Título' text='Descripción' />);
    expect(screen.getByTestId('header-title')).toHaveTextContent('Mi Título');
    expect(screen.getByTestId('header-text')).toHaveTextContent('Descripción');
  });

  it('renderiza los children si se pasan', () => {
    render(
      <Header title='Mi Título'>
        <span data-testid='header-child'>Soy un child</span>
      </Header>
    );
    expect(screen.getByTestId('header-title')).toBeInTheDocument();
    expect(screen.getByTestId('header-child')).toHaveTextContent(
      'Soy un child'
    );
  });

  it('aplica props de personalización correctamente', () => {
    render(
      <Header
        title='Personalizado'
        text='Texto'
        titleColor='primary'
        titleSize='xl'
        titleAlign='center'
        textColor='gray'
        textSize='lg'
        textAlign='right'
        outline
        ariaLabel='Descripción personalizada'
        extraClassName='mi-clase-extra'
      />
    );
    const title = screen.getByTestId('header-title');
    const text = screen.getByTestId('header-text');
    expect(title).toHaveTextContent('Personalizado');
    expect(text).toHaveTextContent('Texto');
    expect(text).toHaveAttribute('aria-label', 'Descripción personalizada');
  });

  it('aplica la clase extraClassName al section', () => {
    const { container } = render(
      <Header title='Con clase' extraClassName='clase-prueba' />
    );
    const section = container.querySelector('section');
    expect(section).toHaveClass('clase-prueba');
  });

  it('usa aria-label por defecto si no se pasa', () => {
    render(<Header title='Accesible' text='Texto accesible' />);
    const text = screen.getByTestId('header-text');
    expect(text).toHaveAttribute('aria-label', 'Text');
  });
});
