import { create } from "zustand"



const features = [
  'platform', 
  'design', 
  'login', 
  'customize', 
  'chat', 
  'pageDevelopment', 
  'revenue', 
  'language',
  'webapp',
  'api',
  'analytics',
  'integrations',
  'ai',
  'contents'
] as const

export type FeatureKeys = typeof features[number]

export interface Feature {
  readonly value?: string | number,
  readonly ignore?: boolean,
  readonly basePrice?: number,
  readonly pricePerPage?: number,
  readonly description: string,
}

type FeaturesMap = {
  [key in FeatureKeys]?: Feature
}

interface FeatureSummary {
  readonly description: string, 
  readonly finalPrice: number
}

type FeaturesState = FeaturesMap & {
  set: (key: FeatureKeys, feature: Feature) => void,
  toggle: (key: FeatureKeys) => void,
  setChecked: (key: FeatureKeys, status: boolean) => void,
  isChecked: (key: FeatureKeys) => boolean, 
  getFinalPrice: () => number,
  getSummary: () => FeatureSummary[],
}

export const usePreview = create<FeaturesState>((set, get) => ({ 
  set: (key, feature) => set(() => ({ [key]: feature })),
  toggle: (key) => set((state) => ({ [key]: { ...state[key], ignore: !state[key]?.ignore } })),
  setChecked: (key, status) => set((state) => ({ [key]: { ...state[key], ignore: !status } })),
  isChecked: (key) => !get()?.[key]?.ignore,
  getSummary: () => {
    return features
      .map(key => get()?.[key] as Feature)
      .filter(f => !!f)
      .filter(f => !f?.ignore)
      .map(f => {
        const basePrice = f?.basePrice ?? 0
        const pricePerPage = f?.pricePerPage ?? 0

        const finalPrice = 
          basePrice + 
          pricePerPage * (get().pageDevelopment?.value as number)

        return { 
          description: f.description, 
          finalPrice: Math.round(finalPrice),
        }
      })
  },
  getFinalPrice: () => {
    const price = get()
      .getSummary()
      .map(f => f.finalPrice)
      .reduce((prev, curr) => prev + curr, 0)
    
    return Math.round(price)
  }
}))
