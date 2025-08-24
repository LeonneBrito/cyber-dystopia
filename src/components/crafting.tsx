"use client";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { pricing } from "@/constants/pricing";
import { recipes } from "@/constants/recipes";
import { ScrollArea } from "./ui/scroll-area";

export function CraftingCalculator() {
  const [coleteQuantity, setColeteQuantity] = useState(0);
  const [trojanQuantity, setTrojanQuantity] = useState(0);
  const [notebookQuantity, setNotebookQuantity] = useState(0);
  const [celularQuantity, setCelularQuantity] = useState(0);
  const [usbHackingQuantity, setUsbHackingQuantity] = useState(0);
  const [donatedClothes, setDonatedClothes] = useState(0);

  // Handlers
  const handleColeteChange = (value: string) =>
    setColeteQuantity(Math.max(0, Number.parseInt(value) || 0));
  const handleTrojanChange = (value: string) =>
    setTrojanQuantity(Math.max(0, Number.parseInt(value) || 0));
  const handleNotebookChange = (value: string) =>
    setNotebookQuantity(Math.max(0, Number.parseInt(value) || 0));
  const handleCelularChange = (value: string) =>
    setCelularQuantity(Math.max(0, Number.parseInt(value) || 0));
  const handleUsbHackingChange = (value: string) =>
    setUsbHackingQuantity(Math.max(0, Number.parseInt(value) || 0));

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US").format(amount);

  // Totais de materiais
  const totalAluminum =
    coleteQuantity * recipes.COLETE.aluminum +
    trojanQuantity * recipes.TROJAN.aluminum +
    notebookQuantity * recipes.NOTEBOOK.aluminum +
    celularQuantity * recipes.CELULAR_DESCARTAVEL.aluminum +
    usbHackingQuantity * recipes.USB_HACKING.aluminum;

  const totalRubber =
    coleteQuantity * recipes.COLETE.rubber +
    trojanQuantity * recipes.TROJAN.rubber +
    notebookQuantity * recipes.NOTEBOOK.rubber +
    celularQuantity * recipes.CELULAR_DESCARTAVEL.rubber +
    usbHackingQuantity * recipes.USB_HACKING.rubber;

  const totalClothes =
    coleteQuantity * recipes.COLETE.clothes +
    trojanQuantity * recipes.TROJAN.clothes +
    notebookQuantity * recipes.NOTEBOOK.clothes +
    celularQuantity * recipes.CELULAR_DESCARTAVEL.clothes +
    usbHackingQuantity * recipes.USB_HACKING.clothes;

  // Totais de preço
  const allyTotal =
    coleteQuantity * pricing.COLETE.ally +
    trojanQuantity * pricing.TROJAN.ally +
    notebookQuantity * pricing.NOTEBOOK.ally +
    celularQuantity * pricing.CELULAR_DESCARTAVEL.ally +
    usbHackingQuantity * pricing.USB_HACKING.ally;

  const nonAllyTotal =
    coleteQuantity * pricing.COLETE.nonAlly +
    trojanQuantity * pricing.TROJAN.nonAlly +
    notebookQuantity * pricing.NOTEBOOK.nonAlly +
    celularQuantity * pricing.CELULAR_DESCARTAVEL.nonAlly +
    usbHackingQuantity * pricing.USB_HACKING.nonAlly;

  // Desconto por doação (cada 10 roupas = -500)
  const donationDiscount = Math.floor(donatedClothes / 10) * 500;
  const allyTotalWithDiscount = Math.max(0, allyTotal - donationDiscount);
  const nonAllyTotalWithDiscount = Math.max(0, nonAllyTotal - donationDiscount);

  const hasAnyItem =
    coleteQuantity > 0 ||
    trojanQuantity > 0 ||
    notebookQuantity > 0 ||
    celularQuantity > 0 ||
    usbHackingQuantity > 0;

  return (
    <>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Coluna 1: Entradas */}
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
            <ScrollArea className="h-96 pr-2">
              {/* COLETE */}
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
                  Receita: {recipes.COLETE.aluminum} Alumínio,{" "}
                  {recipes.COLETE.rubber} Borracha, {recipes.COLETE.clothes}{" "}
                  Roupas
                </div>
                <div className="flex flex-wrap gap-2">
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

              <Separator className="bg-gray-700 my-4" />

              {/* TROJAN */}
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
                  Receita: {recipes.TROJAN.aluminum} Alumínio,{" "}
                  {recipes.TROJAN.rubber} Borracha
                </div>
                <div className="flex flex-wrap gap-2">
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

              <Separator className="bg-gray-700 my-4" />

              {/* NOTEBOOK */}
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
                  Receita: {recipes.NOTEBOOK.aluminum} Alumínio,{" "}
                  {recipes.NOTEBOOK.rubber} Borracha
                </div>
                <div className="flex flex-wrap gap-2">
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

              <Separator className="bg-gray-700 my-4" />

              {/* CELULAR DESCARTÁVEL */}
              <div className="space-y-3">
                <Label htmlFor="celular" className="text-white font-medium">
                  CELULAR DESCARTÁVEL
                </Label>
                <Input
                  id="celular"
                  type="number"
                  min="0"
                  value={celularQuantity}
                  onChange={(e) => handleCelularChange(e.target.value)}
                  placeholder="0"
                  className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="text-sm text-gray-400 bg-gray-700/30 p-2 rounded">
                  Receita: {recipes.CELULAR_DESCARTAVEL.aluminum} Alumínio,{" "}
                  {recipes.CELULAR_DESCARTAVEL.rubber} Borracha,{" "}
                  {recipes.CELULAR_DESCARTAVEL.clothes} Roupas
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-600/20 text-green-400 border-green-600/30"
                  >
                    Aliado: {formatCurrency(pricing.CELULAR_DESCARTAVEL.ally)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-red-600/20 text-red-400 border-red-600/30"
                  >
                    Não-aliado:{" "}
                    {formatCurrency(pricing.CELULAR_DESCARTAVEL.nonAlly)}
                  </Badge>
                </div>
              </div>

              <Separator className="bg-gray-700 my-4" />

              {/* USB HACKING */}
              <div className="space-y-3">
                <Label htmlFor="usbHacking" className="text-white font-medium">
                  USB HACKING
                </Label>
                <Input
                  id="usbHacking"
                  type="number"
                  min="0"
                  value={usbHackingQuantity}
                  onChange={(e) => handleUsbHackingChange(e.target.value)}
                  placeholder="0"
                  className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
                />
                <div className="text-sm text-gray-400 bg-gray-700/30 p-2 rounded">
                  Receita: {recipes.USB_HACKING.aluminum} Alumínio,{" "}
                  {recipes.USB_HACKING.rubber} Borracha,{" "}
                  {recipes.USB_HACKING.clothes} Roupas
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-600/20 text-green-400 border-green-600/30"
                  >
                    Aliado: {formatCurrency(pricing.USB_HACKING.ally)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-red-600/20 text-red-400 border-red-600/30"
                  >
                    Não-aliado: {formatCurrency(pricing.USB_HACKING.nonAlly)}
                  </Badge>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Coluna 2: Materiais */}
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

            <Separator className="bg-gray-700 my-4" />

            <div className="bg-gradient-to-r from-gray-700/50 to-gray-600/50 p-4 rounded-lg border border-gray-600/50">
              <h3 className="font-semibold text-white mb-3 flex items-center space-x-2">
                <span className="text-lg">📊</span>
                <span>Resumo</span>
              </h3>
              <div className="text-sm text-gray-300 space-y-2">
                <div className="flex justify-between">
                  <span>Total de Itens:</span>
                  <span className="font-medium">
                    {coleteQuantity +
                      trojanQuantity +
                      notebookQuantity +
                      celularQuantity +
                      usbHackingQuantity}
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

        {/* Coluna 3: Valores */}
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
              {/* Aliado */}
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
                {hasAnyItem && (
                  <div className="text-sm text-green-300/80 mt-2 space-y-1">
                    {coleteQuantity > 0 && (
                      <div>
                        COLETE: {coleteQuantity} ×{" "}
                        {formatCurrency(pricing.COLETE.ally)} ={" "}
                        {formatCurrency(coleteQuantity * pricing.COLETE.ally)}
                      </div>
                    )}
                    {trojanQuantity > 0 && (
                      <div>
                        TROJAN: {trojanQuantity} ×{" "}
                        {formatCurrency(pricing.TROJAN.ally)} ={" "}
                        {formatCurrency(trojanQuantity * pricing.TROJAN.ally)}
                      </div>
                    )}
                    {notebookQuantity > 0 && (
                      <div>
                        NOTEBOOK: {notebookQuantity} ×{" "}
                        {formatCurrency(pricing.NOTEBOOK.ally)} ={" "}
                        {formatCurrency(
                          notebookQuantity * pricing.NOTEBOOK.ally,
                        )}
                      </div>
                    )}
                    {celularQuantity > 0 && (
                      <div>
                        CELULAR DESC.: {celularQuantity} ×{" "}
                        {formatCurrency(pricing.CELULAR_DESCARTAVEL.ally)} ={" "}
                        {formatCurrency(
                          celularQuantity * pricing.CELULAR_DESCARTAVEL.ally,
                        )}
                      </div>
                    )}
                    {usbHackingQuantity > 0 && (
                      <div>
                        USB HACKING: {usbHackingQuantity} ×{" "}
                        {formatCurrency(pricing.USB_HACKING.ally)} ={" "}
                        {formatCurrency(
                          usbHackingQuantity * pricing.USB_HACKING.ally,
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Não-aliado */}
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
                {hasAnyItem && (
                  <div className="text-sm text-red-300/80 mt-2 space-y-1">
                    {coleteQuantity > 0 && (
                      <div>
                        COLETE: {coleteQuantity} ×{" "}
                        {formatCurrency(pricing.COLETE.nonAlly)} ={" "}
                        {formatCurrency(
                          coleteQuantity * pricing.COLETE.nonAlly,
                        )}
                      </div>
                    )}
                    {trojanQuantity > 0 && (
                      <div>
                        TROJAN: {trojanQuantity} ×{" "}
                        {formatCurrency(pricing.TROJAN.nonAlly)} ={" "}
                        {formatCurrency(
                          trojanQuantity * pricing.TROJAN.nonAlly,
                        )}
                      </div>
                    )}
                    {notebookQuantity > 0 && (
                      <div>
                        NOTEBOOK: {notebookQuantity} ×{" "}
                        {formatCurrency(pricing.NOTEBOOK.nonAlly)} ={" "}
                        {formatCurrency(
                          notebookQuantity * pricing.NOTEBOOK.nonAlly,
                        )}
                      </div>
                    )}
                    {celularQuantity > 0 && (
                      <div>
                        CELULAR DESC.: {celularQuantity} ×{" "}
                        {formatCurrency(pricing.CELULAR_DESCARTAVEL.nonAlly)} ={" "}
                        {formatCurrency(
                          celularQuantity * pricing.CELULAR_DESCARTAVEL.nonAlly,
                        )}
                      </div>
                    )}
                    {usbHackingQuantity > 0 && (
                      <div>
                        USB HACKING: {usbHackingQuantity} ×{" "}
                        {formatCurrency(pricing.USB_HACKING.nonAlly)} ={" "}
                        {formatCurrency(
                          usbHackingQuantity * pricing.USB_HACKING.nonAlly,
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
                    Economize{" "}
                    {(
                      ((nonAllyTotalWithDiscount - allyTotalWithDiscount) /
                        Math.max(1, nonAllyTotalWithDiscount)) *
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

      {hasAnyItem && (
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
              {/* Detalhe: COLETE */}
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
                        {coleteQuantity} × {recipes.COLETE.aluminum} ={" "}
                        <span className="text-blue-400 font-medium">
                          {coleteQuantity * recipes.COLETE.aluminum}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Borracha:</span>
                      <span>
                        {coleteQuantity} × {recipes.COLETE.rubber} ={" "}
                        <span className="text-green-400 font-medium">
                          {coleteQuantity * recipes.COLETE.rubber}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Roupas:</span>
                      <span>
                        {coleteQuantity} × {recipes.COLETE.clothes} ={" "}
                        <span className="text-purple-400 font-medium">
                          {coleteQuantity * recipes.COLETE.clothes}
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

              {/* Detalhe: TROJAN */}
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
                        {trojanQuantity} × {recipes.TROJAN.aluminum} ={" "}
                        <span className="text-blue-400 font-medium">
                          {trojanQuantity * recipes.TROJAN.aluminum}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Borracha:</span>
                      <span>
                        {trojanQuantity} × {recipes.TROJAN.rubber} ={" "}
                        <span className="text-green-400 font-medium">
                          {trojanQuantity * recipes.TROJAN.rubber}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Roupas:</span>
                      <span>
                        {trojanQuantity} × 0 ={" "}
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

              {/* Detalhe: NOTEBOOK */}
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
                        {notebookQuantity} × {recipes.NOTEBOOK.aluminum} ={" "}
                        <span className="text-blue-400 font-medium">
                          {notebookQuantity * recipes.NOTEBOOK.aluminum}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Borracha:</span>
                      <span>
                        {notebookQuantity} × {recipes.NOTEBOOK.rubber} ={" "}
                        <span className="text-green-400 font-medium">
                          {notebookQuantity * recipes.NOTEBOOK.rubber}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Roupas:</span>
                      <span>
                        {notebookQuantity} × 0 ={" "}
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

              {/* Detalhe: CELULAR DESCARTÁVEL */}
              {celularQuantity > 0 && (
                <div className="space-y-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                  <h4 className="font-semibold text-lg text-white flex items-center space-x-2">
                    <span>📱</span>
                    <span>CELULAR DESCARTÁVEL × {celularQuantity}</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Alumínio:</span>
                      <span>
                        {celularQuantity} ×{" "}
                        {recipes.CELULAR_DESCARTAVEL.aluminum} ={" "}
                        <span className="text-blue-400 font-medium">
                          {celularQuantity *
                            recipes.CELULAR_DESCARTAVEL.aluminum}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Borracha:</span>
                      <span>
                        {celularQuantity} × {recipes.CELULAR_DESCARTAVEL.rubber}{" "}
                        ={" "}
                        <span className="text-green-400 font-medium">
                          {celularQuantity * recipes.CELULAR_DESCARTAVEL.rubber}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Roupas:</span>
                      <span>
                        {celularQuantity} ×{" "}
                        {recipes.CELULAR_DESCARTAVEL.clothes} ={" "}
                        <span className="text-purple-400 font-medium">
                          {celularQuantity *
                            recipes.CELULAR_DESCARTAVEL.clothes}
                        </span>
                      </span>
                    </div>
                    <Separator className="bg-gray-600" />
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Aliado:</span>
                      <span className="text-green-400 font-medium">
                        {formatCurrency(
                          celularQuantity * pricing.CELULAR_DESCARTAVEL.ally,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Não-Aliado:</span>
                      <span className="text-red-400 font-medium">
                        {formatCurrency(
                          celularQuantity * pricing.CELULAR_DESCARTAVEL.nonAlly,
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Detalhe: USB HACKING */}
              {usbHackingQuantity > 0 && (
                <div className="space-y-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                  <h4 className="font-semibold text-lg text-white flex items-center space-x-2">
                    <span>🧬</span>
                    <span>USB HACKING × {usbHackingQuantity}</span>
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Alumínio:</span>
                      <span>
                        {usbHackingQuantity} × {recipes.USB_HACKING.aluminum} ={" "}
                        <span className="text-blue-400 font-medium">
                          {usbHackingQuantity * recipes.USB_HACKING.aluminum}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Borracha:</span>
                      <span>
                        {usbHackingQuantity} × {recipes.USB_HACKING.rubber} ={" "}
                        <span className="text-green-400 font-medium">
                          {usbHackingQuantity * recipes.USB_HACKING.rubber}
                        </span>
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Roupas:</span>
                      <span>
                        {usbHackingQuantity} × {recipes.USB_HACKING.clothes} ={" "}
                        <span className="text-purple-400 font-medium">
                          {usbHackingQuantity * recipes.USB_HACKING.clothes}
                        </span>
                      </span>
                    </div>
                    <Separator className="bg-gray-600" />
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Aliado:</span>
                      <span className="text-green-400 font-medium">
                        {formatCurrency(
                          usbHackingQuantity * pricing.USB_HACKING.ally,
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Valor Não-Aliado:</span>
                      <span className="text-red-400 font-medium">
                        {formatCurrency(
                          usbHackingQuantity * pricing.USB_HACKING.nonAlly,
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
  );
}
