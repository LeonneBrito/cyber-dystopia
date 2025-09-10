"use client";
import { useMemo, useState } from "react";

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
import { ScrollArea } from "./ui/scroll-area";

import { pricing } from "@/constants/pricing";
import { recipes } from "@/constants/recipes";

const ITEMS = [
  { key: "COLETE", label: "COLETE", icon: "🛡️" },
  { key: "TROJAN", label: "TROJAN", icon: "🏛️" },
  { key: "NOTEBOOK", label: "NOTEBOOK", icon: "💻" },
  { key: "CELULAR_DESCARTAVEL", label: "CELULAR DESCARTÁVEL", icon: "📱" },
  { key: "USB_HACKING", label: "USB HACKING", icon: "🧬" },
  { key: "PLACA_BALISTICA", label: "PLACA BALÍSTICA", icon: "🧩" },
] as const;

type ItemKey = (typeof ITEMS)[number]["key"];

type Materials = { aluminum: number; rubber: number; clothes: number };

const fmt = (n: number) => new Intl.NumberFormat("en-US").format(n);

function getRecipe(item: ItemKey) {
  return recipes[item] as Materials;
}
function getPrice(item: ItemKey) {
  return pricing[item] as { ally: number; nonAlly: number };
}

function ItemInputRow({
  item,
  value,
  onChange,
}: {
  item: (typeof ITEMS)[number];
  value: number;
  onChange: (next: number) => void;
}) {
  const recipe = getRecipe(item.key);
  const price = getPrice(item.key);
  return (
    <div className="space-y-3">
      <Label htmlFor={item.key} className="text-white font-medium">
        {item.label}
      </Label>
      <Input
        id={item.key}
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value || "0")))}
        placeholder="0"
        className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
      />
      <div className="text-sm text-gray-400 bg-gray-700/30 p-2 rounded">
        Receita: {recipe.aluminum} Alumínio, {recipe.rubber} Borracha,{" "}
        {recipe.clothes} Roupas
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge
          variant="secondary"
          className="bg-green-600/20 text-green-400 border-green-600/30"
        >
          Aliado: {fmt(price.ally)}
        </Badge>
        <Badge
          variant="secondary"
          className="bg-red-600/20 text-red-400 border-red-600/30"
        >
          Não-aliado: {fmt(price.nonAlly)}
        </Badge>
      </div>
    </div>
  );
}

function ItemDetail({
  item,
  qty,
}: {
  item: (typeof ITEMS)[number];
  qty: number;
}) {
  const recipe = getRecipe(item.key);
  const price = getPrice(item.key);
  return (
    <div className="space-y-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
      <h4 className="font-semibold text-lg text-white flex items-center space-x-2">
        <span>{item.icon}</span>
        <span>
          {item.label} × {qty}
        </span>
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-300">
          <span>Alumínio:</span>
          <span>
            {qty} × {recipe.aluminum} ={" "}
            <span className="text-blue-400 font-medium">
              {qty * recipe.aluminum}
            </span>
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Borracha:</span>
          <span>
            {qty} × {recipe.rubber} ={" "}
            <span className="text-green-400 font-medium">
              {qty * recipe.rubber}
            </span>
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Roupas:</span>
          <span>
            {qty} × {recipe.clothes} ={" "}
            <span className="text-purple-400 font-medium">
              {qty * recipe.clothes}
            </span>
          </span>
        </div>
        <Separator className="bg-gray-600" />
        <div className="flex justify-between text-gray-300">
          <span>Valor Aliado:</span>
          <span className="text-green-400 font-medium">
            {fmt(qty * price.ally)}
          </span>
        </div>
        <div className="flex justify-between text-gray-300">
          <span>Valor Não-Aliado:</span>
          <span className="text-red-400 font-medium">
            {fmt(qty * price.nonAlly)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function CraftingCalculator() {
  // estado único e enxuto
  const [quantities, setQuantities] = useState<Record<ItemKey, number>>({
    COLETE: 0,
    TROJAN: 0,
    NOTEBOOK: 0,
    CELULAR_DESCARTAVEL: 0,
    USB_HACKING: 0,
    PLACA_BALISTICA: 0,
  });
  const [donatedClothes, setDonatedClothes] = useState(0);

  const setQty = (key: ItemKey, val: number) =>
    setQuantities((s) => ({ ...s, [key]: val }));

  const { totalAluminum, totalRubber, totalClothes, allyTotal, nonAllyTotal } =
    useMemo(() => {
      return ITEMS.reduce(
        (acc, it) => {
          const q = quantities[it.key] || 0;
          if (!q) return acc;

          const recipe = getRecipe(it.key);
          const price = getPrice(it.key);

          acc.totalAluminum += q * recipe.aluminum;
          acc.totalRubber += q * recipe.rubber;
          acc.totalClothes += q * recipe.clothes;

          acc.allyTotal += q * price.ally;
          acc.nonAllyTotal += q * price.nonAlly;

          return acc;
        },
        {
          totalAluminum: 0,
          totalRubber: 0,
          totalClothes: 0,
          allyTotal: 0,
          nonAllyTotal: 0,
        },
      );
    }, [quantities]);

  const donationDiscount = Math.floor(donatedClothes / 10) * 500;
  const allyTotalWithDiscount = Math.max(0, allyTotal - donationDiscount);
  const nonAllyTotalWithDiscount = Math.max(0, nonAllyTotal - donationDiscount);

  const hasAnyItem = useMemo(
    () => ITEMS.some((it) => (quantities[it.key] || 0) > 0),
    [quantities],
  );

  const totalItems = useMemo(
    () => ITEMS.reduce((sum, it) => sum + (quantities[it.key] || 0), 0),
    [quantities],
  );

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
              {ITEMS.map((item, idx) => (
                <div key={item.key}>
                  <ItemInputRow
                    item={item}
                    value={quantities[item.key] || 0}
                    onChange={(v) => setQty(item.key, v)}
                  />
                  {idx < ITEMS.length - 1 && (
                    <Separator className="bg-gray-700 my-4" />
                  )}
                </div>
              ))}
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
                  <span className="font-medium">{totalItems}</span>
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
                    Math.max(0, parseInt(e.target.value || "0")),
                  )
                }
                placeholder="0"
                className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              {donationDiscount > 0 && (
                <div className="text-sm text-yellow-300">
                  Desconto aplicado: -{fmt(donationDiscount)} (
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
                  {fmt(allyTotalWithDiscount)}
                </div>

                {hasAnyItem && (
                  <div className="text-sm text-green-300/80 mt-2 space-y-1">
                    {ITEMS.filter((it) => (quantities[it.key] || 0) > 0).map(
                      (it) => {
                        const q = quantities[it.key];
                        const p = getPrice(it.key).ally;
                        return (
                          <div key={it.key}>
                            {it.label}: {q} × {fmt(p)} = {fmt(q * p)}
                          </div>
                        );
                      },
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
                  {fmt(nonAllyTotalWithDiscount)}
                </div>

                {hasAnyItem && (
                  <div className="text-sm text-red-300/80 mt-2 space-y-1">
                    {ITEMS.filter((it) => (quantities[it.key] || 0) > 0).map(
                      (it) => {
                        const q = quantities[it.key];
                        const p = getPrice(it.key).nonAlly;
                        return (
                          <div key={it.key}>
                            {it.label}: {q} × {fmt(p)} = {fmt(q * p)}
                          </div>
                        );
                      },
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
                    {fmt(nonAllyTotalWithDiscount - allyTotalWithDiscount)}
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
              {ITEMS.filter((it) => (quantities[it.key] || 0) > 0).map((it) => (
                <ItemDetail key={it.key} item={it} qty={quantities[it.key]} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
