export interface Combo {
  _id: string
  name: string
  description: string
  price: number
  type: ComboType
  status: number
}

export enum ComboType {
  COMBO = 1,
  DRINK = 2,
  POPCORN = 3
}

export const comboType = ['Combo', 'Drink', 'Popcorn']
