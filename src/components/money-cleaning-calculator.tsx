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
import { Button } from "@/components/ui/button";

export function MoneyCleaningCalculator() {
  const [dirtyAmount, setDirtyAmount] = useState<number | "">("");
  const [feePercent, setFeePercent] = useState<number | "">("");

  const formatNumber = (v: number) =>
    new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(v);

  const { feeValue, cleanValue, effectiveRate } = useMemo(() => {
    const dirty = Number(dirtyAmount) || 0;
    const pct = Number(feePercent) || 0;
    const fee = (dirty * pct) / 100;
    const clean = Math.max(0, dirty - fee);
    const eff = dirty > 0 ? (clean / dirty) * 100 : 0;
    return { feeValue: fee, cleanValue: clean, effectiveRate: eff };
  }, [dirtyAmount, feePercent]);

  const applyPreset = (pct: number) => setFeePercent(pct);

  const setDirty = (v: string) => {
    const n = Number(v.replace(",", "."));
    setDirtyAmount(!Number.isFinite(n) ? "" : Math.max(0, n));
  };
  const setPct = (v: string) => {
    const n = Number(v.replace(",", "."));
    const bounded = Math.min(100, Math.max(0, n));
    setFeePercent(!Number.isFinite(bounded) ? "" : bounded);
  };

  const hasValues = (Number(dirtyAmount) || 0) > 0 && (Number(feePercent) || 0) >= 0;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Entradas */}
      <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center space-x-2">
            <span className="text-xl">🧼</span>
            <span>Conversão de Dinheiro Sujo → Limpo</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Informe o valor a ser limpo e a taxa (%) cobrada sobre o valor sujo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="dirty" className="text-white font-medium">
              Valor sujo (a ser limpo)
            </Label>
            <Input
              id="dirty"
              inputMode="decimal"
              placeholder="0"
              value={dirtyAmount}
              onChange={(e) => setDirty(e.target.value)}
              className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="percent" className="text-white font-medium">
              Taxa de lavagem (%)
            </Label>
            <div className="flex gap-2">
              <Input
                id="percent"
                inputMode="decimal"
                placeholder="0"
                value={feePercent}
                onChange={(e) => setPct(e.target.value)}
                className="text-lg bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500"
              />
              <Button
                type="button"
                onClick={() => applyPreset(20)}
                variant="secondary"
                className="bg-gray-700/60 border border-gray-600 text-gray-100"
                title="Preset 20%"
              >
                20%
              </Button>
              <Button
                type="button"
                onClick={() => applyPreset(22)}
                variant="secondary"
                className="bg-gray-700/60 border border-gray-600 text-gray-100"
                title="Preset 22%"
              >
                22%
              </Button>
            </div>
            <div className="text-xs text-gray-400">
              A taxa é aplicada sobre o valor sujo informado.
            </div>
          </div>

          <Separator className="bg-gray-700" />

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-600/30 text-blue-200 border-blue-600/40">
              Efetivo líquido: {hasValues ? effectiveRate.toFixed(2) : "0.00"}%
            </Badge>
            <Badge className="bg-gray-600/30 text-gray-200 border-gray-600/40">
              Taxa aplicada: {feePercent || 0}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Resultados */}
      <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center space-x-2">
            <span className="text-xl">💵</span>
            <span>Resultado</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Totais calculados automaticamente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg border border-emerald-500/30 bg-gradient-to-r from-emerald-600/20 to-emerald-500/10">
            <div className="text-sm text-emerald-200/80">Valor limpo</div>
            <div className="text-3xl font-bold text-emerald-300">
              {formatNumber(cleanValue)}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-yellow-500/30 bg-gradient-to-r from-yellow-600/20 to-amber-500/10">
            <div className="text-sm text-yellow-200/80">Taxa (descontada)</div>
            <div className="text-2xl font-bold text-yellow-300">
              {formatNumber(feeValue)}
            </div>
          </div>

          <Separator className="bg-gray-700" />

          <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
            <div className="flex justify-between p-2 bg-gray-700/30 rounded">
              <span>Valor sujo</span>
              <span className="font-medium">
                {formatNumber(Number(dirtyAmount) || 0)}
              </span>
            </div>
            <div className="flex justify-between p-2 bg-gray-700/30 rounded">
              <span>Taxa (%)</span>
              <span className="font-medium">{Number(feePercent) || 0}%</span>
            </div>
          </div>

          {hasValues && (
            <div className="text-xs text-gray-400">
              Fórmula: limpo = sujo − (sujo × taxa%).
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
