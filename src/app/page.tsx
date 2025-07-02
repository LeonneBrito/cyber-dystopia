import type { Metadata } from 'next'

import { CraftingCalculator } from '@/components/crafting'
import { Order } from '@/components/order'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const metadata: Metadata = {
  title: 'Calculadora de Crafting',
}

export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full min-h-screen mx-auto space-y-8">
        <Tabs
          defaultValue="calculator"
          className="w-full min-h-screen max-w-6xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 border border-gray-700">
            <TabsTrigger
              value="calculator"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <span>🧮</span>
                <span>Calculadora</span>
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="order"
              className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-300 transition-all duration-300"
            >
              <span className="flex items-center space-x-2">
                <span>📝</span>
                <span>Nova Encomenda</span>
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6 mt-6">
            <CraftingCalculator />
          </TabsContent>

          <TabsContent value="order" className="space-y-6 mt-6">
            <Order />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
