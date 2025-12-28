import { render } from '@testing-library/react';
import { ThemeProvider } from '@/context/theme';
import { ThemeProviderProps } from 'next-themes';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({
    children,
    ...props
  }: React.PropsWithChildren<Record<string, unknown>>) => (
    <div data-testid='next-theme-provider' data-props={JSON.stringify(props)}>
      {children}
    </div>
  ),
}));

describe('ThemeProvider', () => {
  it('renders children correctly', () => {
    const testChild = <div data-testid='test-child'>Test Child</div>;
    const { getByTestId } = render(<ThemeProvider>{testChild}</ThemeProvider>);

    expect(getByTestId('test-child')).toBeInTheDocument();
    expect(getByTestId('next-theme-provider')).toBeInTheDocument();
  });

  it('passes props to NextThemesProvider', () => {
    // Using props that match the expected ThemeProviderProps type
    const testProps: Partial<ThemeProviderProps> = {
      defaultTheme: 'system',
      enableSystem: true,
      storageKey: 'theme',
    };

    const { getByTestId } = render(
      <ThemeProvider {...testProps}>
        <div>Test Child</div>
      </ThemeProvider>
    );

    const nextThemeProvider = getByTestId('next-theme-provider');
    const passedProps = JSON.parse(
      nextThemeProvider.getAttribute('data-props') || '{}'
    );

    expect(passedProps).toEqual(testProps);
  });
});
