/**
 * @file use-open-action-dialog.ts
 * @description Contexto para el uso del diálogo de acción
 * @module context/pages/use-open-action-dialog
 */

import { context, useContext } from '@/context'
import { SetStateAction } from 'react'

// Imports of types
import { ENUM_ACTION_TYPE } from '@/app/utils'

interface ActionDialogState {
  open: boolean
  action: ENUM_ACTION_TYPE
}

const initialState: ActionDialogState = {
  open: false,
  action: ENUM_ACTION_TYPE.IDLE,
}

const actionDialogContext = context<ActionDialogState>(initialState)

export const useOpenActionDialog = () => {
  const [state, setState] = useContext(actionDialogContext)

  return {
    open: state.open,
    isOpen: state.open,
    action: state.action,
    setOpen: (value: SetStateAction<boolean>) =>
      setState(prev => ({
        ...prev,
        open: typeof value === 'function' ? value(prev.open) : value,
      })),
    setAction: (action: ENUM_ACTION_TYPE) =>
      setState(prev => ({ ...prev, action })),
    openDialog: () =>
      setState(prev => ({
        ...prev,
        open: true,
      })),
    closeDialog: () =>
      setState(prev => ({
        ...prev,
        open: false,
      })),
  }
}
