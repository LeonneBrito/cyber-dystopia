import type { Metadata } from 'next'

import CraftingCalculator from '@/components/crafting-calculator'

export const metadata: Metadata = {
  title: 'Calculadora de Crafting',
}

export default function Home() {
  return <CraftingCalculator />
}
