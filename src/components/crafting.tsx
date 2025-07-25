'use client'
import { useState } from 'react'

import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { pricing } from '@/constants/pricing'
import { recipes } from '@/constants/recipes'

export function CraftingCalculator() {
  const [coleteQuantity, setColeteQuantity] = useState(0)
  const [trojanQuantity, setTrojanQuantity] = useState(0)
  const [notebookQuantity, setNotebookQuantity] = useState(0)
  const [donatedClothes, setDonatedClothes] = useState(0)

  const totalAluminum =
    coleteQuantity * recipes.COLETE.aluminum +
    trojanQuantity * recipes.TROJAN.aluminum +
    notebookQuantity * recipes.NOTEBOOK.aluminum

  const totalRubber =
    coleteQuantity * recipes.COLETE.rubber +
    trojanQuantity * recipes.TROJAN.rubber +
    notebookQuantity * recipes.NOTEBOOK.rubber

  const totalClothes =
    coleteQuantity * recipes.COLETE.clothes +
    trojanQuantity * recipes.TROJAN.clothes +
    notebookQuantity * recipes.NOTEBOOK.clothes

  const allyTotal =
    coleteQuantity * pricing.COLETE.ally +
    trojanQuantity * pricing.TROJAN.ally +
    notebookQuantity * pricing.NOTEBOOK.ally

  const nonAllyTotal =
    coleteQuantity * pricing.COLETE.nonAlly +
    trojanQuantity * pricing.TROJAN.nonAlly +
    notebookQuantity * pricing.NOTEBOOK.nonAlly

  const donationDiscount = Math.floor(donatedClothes / 10) * 500
  const allyTotalWithDiscount = Math.max(0, allyTotal - donationDiscount)
  const nonAllyTotalWithDiscount = Math.max(0, nonAllyTotal - donationDiscount)

  const handleColeteChange = (value: string) => {
    const num = Number.parseInt(value) || 0
    setColeteQuantity(Math.max(0, num))
  }

  const handleTrojanChange = (value: string) => {
    const num = Number.parseInt(value) || 0
    setTrojanQuantity(Math.max(0, num))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount)
  }

  const handleNotebookChange = (value: string) => {
    const num = Number.parseInt(value) || 0
    setNotebookQuantity(Math.max(0, num))
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center space-x-2">
              <span className="text-xl">📦</span>
              <span>Itens para Craftar</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Digite a quantidade de cada item que você quer fazer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="colete" className="text-white font-medium">
                COLETE
              </Label>
              <Input
                id="colete"
                type="number"
                min="0"
                value={coleteQuantity}
                onChange={(e) => handleColeteChange(e.target.value)}
                placeholder="0"
                className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="text-sm text-gray-400 bg-gray-700/30 p-2 rounded">
                Receita: 20 Alumínio, 20 Borracha, 2 Roupas
              </div>
              <div className="flex space-x-2">
                <Badge
                  variant="secondary"
                  className="bg-green-600/20 text-green-400 border-green-600/30"
                >
                  Aliado: {formatCurrency(pricing.COLETE.ally)}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-red-600/20 text-red-400 border-red-600/30"
                >
                  Não-aliado: {formatCurrency(pricing.COLETE.nonAlly)}
                </Badge>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-3">
              <Label htmlFor="trojan" className="text-white font-medium">
                TROJAN
              </Label>
              <Input
                id="trojan"
                type="number"
                min="0"
                value={trojanQuantity}
                onChange={(e) => handleTrojanChange(e.target.value)}
                placeholder="0"
                className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="text-sm text-gray-400 bg-gray-700/30 p-2 rounded">
                Receita: 50 Alumínio, 50 Borracha
              </div>
              <div className="flex space-x-2">
                <Badge
                  variant="secondary"
                  className="bg-green-600/20 text-green-400 border-green-600/30"
                >
                  Aliado: {formatCurrency(pricing.TROJAN.ally)}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-red-600/20 text-red-400 border-red-600/30"
                >
                  Não-aliado: {formatCurrency(pricing.TROJAN.nonAlly)}
                </Badge>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="space-y-3">
              <Label htmlFor="notebook" className="text-white font-medium">
                NOTEBOOK
              </Label>
              <Input
                id="notebook"
                type="number"
                min="0"
                value={notebookQuantity}
                onChange={(e) => handleNotebookChange(e.target.value)}
                placeholder="0"
                className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <div className="text-sm text-gray-400 bg-gray-700/30 p-2 rounded">
                Receita: 500 Alumínio, 500 Borracha
              </div>
              <div className="flex space-x-2">
                <Badge
                  variant="secondary"
                  className="bg-green-600/20 text-green-400 border-green-600/30"
                >
                  Aliado: {formatCurrency(pricing.NOTEBOOK.ally)}
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-red-600/20 text-red-400 border-red-600/30"
                >
                  Não-aliado: {formatCurrency(pricing.NOTEBOOK.nonAlly)}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center space-x-2">
              <span className="text-xl">🔧</span>
              <span>Materiais Necessários</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Total de materiais necessários para todos os itens
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🔩</span>
                  <span className="font-medium text-blue-300">Alumínio</span>
                </div>
                <span className="text-2xl font-bold text-blue-400">
                  {totalAluminum}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg border border-green-500/30">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">🛞</span>
                  <span className="font-medium text-green-300">Borracha</span>
                </div>
                <span className="text-2xl font-bold text-green-400">
                  {totalRubber}
                </span>
              </div>

              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">👕</span>
                  <span className="font-medium text-purple-300">Roupas</span>
                </div>
                <span className="text-2xl font-bold text-purple-400">
                  {totalClothes}
                </span>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 p-4 rounded-lg border border-gray-600/50">
              <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                <span className="text-lg">📊</span>
                <span>Resumo</span>
              </h3>
              <div className="text-sm text-gray-300 space-y-2">
                <div className="flex justify-between">
                  <span>Total de Itens:</span>
                  <span className="font-medium">
                    {coleteQuantity + trojanQuantity + notebookQuantity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total de Materiais:</span>
                  <span className="font-medium">
                    {totalAluminum + totalRubber + totalClothes}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-white flex items-center space-x-2">
              <span className="text-xl">💰</span>
              <span>Valor Total</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Preços para diferentes tipos de compradores
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="donatedClothes"
                className="text-white font-medium"
              >
                Quantidade de Roupas Doadas
              </Label>
              <Input
                id="donatedClothes"
                type="number"
                min="0"
                value={donatedClothes}
                onChange={(e) =>
                  setDonatedClothes(
                    Math.max(0, Number.parseInt(e.target.value) || 0),
                  )
                }
                placeholder="0"
                className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              {donationDiscount > 0 && (
                <div className="text-sm text-yellow-300">
                  Desconto aplicado: -{formatCurrency(donationDiscount)} (
                  {Math.floor(donatedClothes / 10) * 10} roupas)
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-600/20 to-emerald-500/20 rounded-lg border border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">🤝</span>
                    <span className="font-semibold text-green-300">
                      Preço Aliado
                    </span>
                  </div>
                  <Badge className="bg-green-600 text-white">-20%</Badge>
                </div>
                <div className="text-3xl font-bold text-green-400">
                  {formatCurrency(allyTotalWithDiscount)}
                </div>
                {(coleteQuantity > 0 || trojanQuantity > 0) && (
                  <div className="text-sm text-green-300/80 mt-2 space-y-1">
                    {coleteQuantity > 0 && (
                      <div>
                        COLETE: {coleteQuantity} ×{' '}
                        {formatCurrency(pricing.COLETE.ally)} ={' '}
                        {formatCurrency(coleteQuantity * pricing.COLETE.ally)}
                      </div>
                    )}
                    {trojanQuantity > 0 && (
                      <div>
                        TROJAN: {trojanQuantity} ×{' '}
                        {formatCurrency(pricing.TROJAN.ally)} ={' '}
                        {formatCurrency(trojanQuantity * pricing.TROJAN.ally)}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-4 bg-gradient-to-r from-red-600/20 to-orange-500/20 rounded-lg border border-red-500/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">⚔️</span>
                    <span className="font-semibold text-red-300">
                      Preço Não-Aliado
                    </span>
                  </div>
                  <Badge className="bg-red-600 text-white">Padrão</Badge>
                </div>
                <div className="text-3xl font-bold text-red-400">
                  {formatCurrency(nonAllyTotalWithDiscount)}
                </div>
                {(coleteQuantity > 0 || trojanQuantity > 0) && (
                  <div className="text-sm text-red-300/80 mt-2 space-y-1">
                    {coleteQuantity > 0 && (
                      <div>
                        COLETE: {coleteQuantity} ×{' '}
                        {formatCurrency(pricing.COLETE.nonAlly)} ={' '}
                        {formatCurrency(
                          coleteQuantity * pricing.COLETE.nonAlly,
                        )}
                      </div>
                    )}
                    {trojanQuantity > 0 && (
                      <div>
                        TROJAN: {trojanQuantity} ×{' '}
                        {formatCurrency(pricing.TROJAN.nonAlly)} ={' '}
                        {formatCurrency(
                          trojanQuantity * pricing.TROJAN.nonAlly,
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {allyTotal > 0 && nonAllyTotal > 0 && (
                <div className="p-3 bg-gradient-to-r from-yellow-600/20 to-amber-500/20 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">💡</span>
                    <span className="font-medium text-yellow-300">
                      Economia
                    </span>
                  </div>
                  <div className="text-lg font-bold text-yellow-400">
                    {formatCurrency(
                      nonAllyTotalWithDiscount - allyTotalWithDiscount,
                    )}
                  </div>
                  <div className="text-xs text-yellow-300/80">
                    Economize{' '}
                    {(
                      ((nonAllyTotalWithDiscount - allyTotalWithDiscount) /
                        nonAllyTotalWithDiscount) *
                      100
                    ).toFixed(1)}
                    % com preço de aliado
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {(coleteQuantity > 0 || trojanQuantity > 0) && (
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <span className="text-xl">📋</span>
              <span>Detalhamento</span>
            </CardTitle>
            <CardDescription className="text-gray-400">
              Requisitos de materiais e preços por tipo de item
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {coleteQuantity > 0 && (
                <div className="space-y-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                  <h4 className="font-semibold text-lg text-white flex items-center space-x-2">
                    <span>🛡️</span>
                    <span>COLETE × {coleteQuantity}</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Alumínio:</span>
                      <span>
                        {coleteQuantity} × 20 ={' '}
                        <span className="text-blue-400 font-medium">
                          {coleteQuantity * 20}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Borracha:</span>
                      <span>
                        {coleteQuantity} × 20 ={' '}
                        <span className="text-green-400 font-medium">
                          {coleteQuantity * 20}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Roupas:</span>
                      <span>
                        {coleteQuantity} × 2 ={' '}
                        <span className="text-purple-400 font-medium">
                          {coleteQuantity * 2}
                        </span>
                      </span>
                    </div>
                    <Separator className="bg-gray-600" />
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Aliado:</span>
                      <span className="text-green-400 font-medium">
                        {formatCurrency(coleteQuantity * pricing.COLETE.ally)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Não-Aliado:</span>
                      <span className="text-red-400 font-medium">
                        {formatCurrency(
                          coleteQuantity * pricing.COLETE.nonAlly,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {trojanQuantity > 0 && (
                <div className="space-y-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                  <h4 className="font-semibold text-lg text-white flex items-center space-x-2">
                    <span>🏛️</span>
                    <span>TROJAN × {trojanQuantity}</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Alumínio:</span>
                      <span>
                        {trojanQuantity} × 50 ={' '}
                        <span className="text-blue-400 font-medium">
                          {trojanQuantity * 50}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Borracha:</span>
                      <span>
                        {trojanQuantity} × 50 ={' '}
                        <span className="text-green-400 font-medium">
                          {trojanQuantity * 50}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Roupas:</span>
                      <span>
                        {trojanQuantity} × 0 ={' '}
                        <span className="text-purple-400 font-medium">0</span>
                      </span>
                    </div>
                    <Separator className="bg-gray-600" />
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Aliado:</span>
                      <span className="text-green-400 font-medium">
                        {formatCurrency(trojanQuantity * pricing.TROJAN.ally)}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Não-Aliado:</span>
                      <span className="text-red-400 font-medium">
                        {formatCurrency(
                          trojanQuantity * pricing.TROJAN.nonAlly,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {notebookQuantity > 0 && (
                <div className="space-y-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                  <h4 className="font-semibold text-lg text-white flex items-center space-x-2">
                    <span>💻</span>
                    <span>NOTEBOOK × {notebookQuantity}</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Alumínio:</span>
                      <span>
                        {notebookQuantity} × 500 ={' '}
                        <span className="text-blue-400 font-medium">
                          {notebookQuantity * 500}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Borracha:</span>
                      <span>
                        {notebookQuantity} × 500 ={' '}
                        <span className="text-green-400 font-medium">
                          {notebookQuantity * 500}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Roupas:</span>
                      <span>
                        {notebookQuantity} × 0 ={' '}
                        <span className="text-purple-400 font-medium">0</span>
                      </span>
                    </div>
                    <Separator className="bg-gray-600" />
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Aliado:</span>
                      <span className="text-green-400 font-medium">
                        {formatCurrency(
                          notebookQuantity * pricing.NOTEBOOK.ally,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Não-Aliado:</span>
                      <span className="text-red-400 font-medium">
                        {formatCurrency(
                          notebookQuantity * pricing.NOTEBOOK.nonAlly,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
