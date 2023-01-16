export type CanNavigateStatus = 'go' | 'block' | 'loading'

export type GuardAction = (status: CanNavigateStatus) => void
export type GuardFunction = (go: GuardAction) => void
