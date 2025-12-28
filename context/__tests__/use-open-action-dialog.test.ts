/**
 * @file use-open-action-dialog.test.ts
 * @description Tests para el hook useOpenActionDialog
 */

import { renderHook, act } from '@testing-library/react';
import { useOpenActionDialog } from '@/context/pages/use-open-action-dialog';

describe('useOpenActionDialog', () => {
  describe('Inicialización', () => {
    it('debe inicializar con el diálogo cerrado', () => {
      const { result } = renderHook(() => useOpenActionDialog());

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('Funcionalidad de apertura', () => {
    it('debe abrir el diálogo', () => {
      const { result } = renderHook(() => useOpenActionDialog());

      act(() => {
        result.current.openDialog();
      });

      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('Funcionalidad de cierre', () => {
    it('debe cerrar el diálogo', () => {
      const { result } = renderHook(() => useOpenActionDialog());

      // Primero abrir
      act(() => {
        result.current.openDialog();
      });

      expect(result.current.isOpen).toBe(true);

      // Luego cerrar
      act(() => {
        result.current.closeDialog();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('Casos de uso múltiples', () => {
    it('debe manejar múltiples aperturas y cierres', () => {
      const { result } = renderHook(() => useOpenActionDialog());

      // Secuencia de aperturas y cierres
      act(() => {
        result.current.openDialog();
      });
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.closeDialog();
      });
      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.openDialog();
      });
      expect(result.current.isOpen).toBe(true);
    });
  });

  describe('Estados del hook', () => {
    it('debe mantener el estado entre renderizados', () => {
      const { result, rerender } = renderHook(() => useOpenActionDialog());

      act(() => {
        result.current.openDialog();
      });

      rerender();

      expect(result.current.isOpen).toBe(true);
    });
  });
});
