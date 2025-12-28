import { atom, useAtom } from 'jotai'

const isLoggingOutAtom = atom<boolean>(false)
const isVerifyingSignOutAtom = atom<boolean>(false)

export const useIsLoggingOut = () => {
  const [isLoggingOut, setIsLoggingOut] = useAtom(isLoggingOutAtom)
  return { isLoggingOut, setIsLoggingOut }
}

export const useIsVerifyingSignOut = () => {
  const [isVerifyingSignOut, setIsVerifyingSignOut] = useAtom(
    isVerifyingSignOutAtom
  )
  return { isVerifyingSignOut, setIsVerifyingSignOut }
}
