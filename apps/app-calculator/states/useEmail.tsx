import { create } from "zustand";

interface EmailState {
  readonly email: string,
  readonly isAnEmail: () => boolean
  readonly set: (email: string) => void
}

export const useEmail = create<EmailState>((set, get) => ({
  email: '',
  isAnEmail: () => {
    return !!String(get().email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  },
  set: (email: string) => set(() => ({ email }))
}))