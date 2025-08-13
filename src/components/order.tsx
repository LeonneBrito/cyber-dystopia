'use client'

import { useState } from 'react'
import { toast } from 'sonner'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { gangs } from '@/constants/gangs'
import { allyMessages, nonAllyMessages } from '@/constants/katarina'
import { pricing } from '@/constants/pricing'
import { getRandomElement } from '@/utils/get-random-element'

export function Order() {
  const [orderGangName, setOrderGangName] = useState('')
  const [orderDate, setOrderDate] = useState(
    new Date().toISOString().split('T')[0],
  )
  const [orderColeteQty, setOrderColeteQty] = useState(0)
  const [orderCelularQty, setOrderCelularQty] = useState(0)
  const [orderBuyerType, setOrderBuyerType] = useState<'ally' | 'nonAlly'>(
    'ally',
  )
  const [isDonatingClothes, setIsDonatingClothes] = useState(false)
  const [orderDonatedClothes, setOrderDonatedClothes] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderMessage, setOrderMessage] = useState('')

  const webhookUrlAlly = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_ALLY || ''
  const webhookUrlNonAlly =
    process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_NONALLY || ''

  const getWebhookUrl = () =>
    orderBuyerType === 'nonAlly' ? webhookUrlNonAlly : webhookUrlAlly

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount)
  }
  const formatBrazilianDate = (dateString: string) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('pt-BR')
  }

  const calculateOrderTotal = () => {
    const isAllyType = orderBuyerType === 'ally'
    const coletePrice = isAllyType
      ? pricing.COLETE.ally
      : pricing.COLETE.nonAlly
    const celularPrice = isAllyType
      ? pricing.CELULAR_DESCARTAVEL.ally
      : pricing.CELULAR_DESCARTAVEL.nonAlly

    const total =
      orderColeteQty * coletePrice +
      orderCelularQty * celularPrice

    const discount = isDonatingClothes
      ? Math.floor(orderDonatedClothes / 10) * 500
      : 0

    return Math.max(0, total - discount)
  }

  const generateOrderMessage = () => {
    const total = calculateOrderTotal()
    const formattedDate = formatBrazilianDate(orderDate)
    const isAllyType = orderBuyerType !== 'nonAlly'

    let intro = ''
    if (isAllyType) {
      const intros = [
        ...allyMessages[0].all,
        ...(orderColeteQty > 0 ? allyMessages[0].colete : []),
        ...(orderCelularQty > 0 ? allyMessages[0].celular : []),
      ]
      intro = getRandomElement(intros)
    } else {
      const intros = [
        ...nonAllyMessages[0].all,
        ...(orderColeteQty > 0 ? nonAllyMessages[0].colete : []),
        ...(orderCelularQty > 0 ? nonAllyMessages[0].celular : []),
      ]
      intro = getRandomElement(intros)
    }

    let msg = `${intro}\n\n`
    msg += '```md\n'
    msg += `🧾 Encomenda: ${orderGangName}\n`
    msg += `📅 Data: ${formattedDate}\n`
    if (orderColeteQty > 0) msg += `🛡️ ${orderColeteQty}x Colete(s)\n`
    if (orderCelularQty > 0) msg += `📱 ${orderCelularQty}x Celular Descartável\n`
    msg += `\n💰 Total: ${formatCurrency(total)}`
    if (orderBuyerType === 'ally') msg += ' (mimos d ally 😋)'
    else msg += ' (n é d casa n tem mimo 😼)'

    if (isDonatingClothes && orderDonatedClothes >= 10) {
      msg += ` + ganhou desconto pq deu roupas 👕 (-${
        Math.floor(orderDonatedClothes / 10) * 500
      })`
    }
    msg += '\n```'

    return msg
  }

  const handleSubmitOrder = async () => {
    if (!orderGangName.trim()) {
      toast.error('Por favor, insira o nome da gang.')
      return
    }

    const selectedWebhookUrl = getWebhookUrl()
    if (!selectedWebhookUrl) {
      toast.error(
        `Webhook do Discord para ${
          orderBuyerType === 'ally' ? 'aliados' : 'não aliados'
        } não configurado. Verifique o arquivo .env.`,
      )
      return
    }
    setIsSubmitting(true)

    try {
      const message = generateOrderMessage()
      setOrderMessage(message)

      const response = await fetch(selectedWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message }),
      })

      if (response.ok) {
        toast.success('Encomenda enviada com sucesso para o Discord!')
        setOrderGangName('')
        setOrderColeteQty(0)
        setOrderCelularQty(0)
        setOrderDate(new Date().toISOString().split('T')[0])
      } else {
        throw new Error('Erro ao enviar para o Discord')
      }
    } catch (error) {
      toast.error('Erro ao enviar encomenda. Verifique o console.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Card da Encomenda */}
      <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <span className="text-xl">📝</span>
            <span>Criar Encomenda</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Preencha os dados da encomenda
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gangName" className="text-white font-medium">
              Nome da Gang
            </Label>
            <Select
              value={orderGangName}
              onValueChange={(value) => setOrderGangName(value)}
            >
              <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white w-full">
                <SelectValue placeholder="Selecione uma gang" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 text-white border-gray-600">
                {Object.entries(gangs).map(([key, label]) => (
                  <SelectItem key={key} value={label} className="capitalize">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderDate" className="text-white font-medium">
              Data da Encomenda
            </Label>
            <Input
              id="orderDate"
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
              className="bg-gray-700/50 border-gray-600 text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderColete" className="text-white font-medium">
                Coletes
              </Label>
              <Input
                id="orderColete"
                type="number"
                min="0"
                value={orderColeteQty}
                onChange={(e) =>
                  setOrderColeteQty(Number(e.target.value) || 0)
                }
                placeholder="0"
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderCelular" className="text-white font-medium">
                Celulares Descartáveis
              </Label>
              <Input
                id="orderCelular"
                type="number"
                min="0"
                value={orderCelularQty}
                onChange={(e) =>
                  setOrderCelularQty(Number(e.target.value) || 0)
                }
                placeholder="0"
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="buyerType"
                value="ally"
                checked={orderBuyerType === 'ally'}
                onChange={() => setOrderBuyerType('ally')}
                className="text-green-500"
              />
              <span className="text-green-400">Aliado</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="buyerType"
                value="nonAlly"
                checked={orderBuyerType === 'nonAlly'}
                onChange={() => setOrderBuyerType('nonAlly')}
                className="text-red-500"
              />
              <span className="text-red-400">Não-Aliado</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isDonatingClothes}
                onChange={(e) => setIsDonatingClothes(e.target.checked)}
                className="text-yellow-500"
              />
              <span className="text-yellow-400">Dando Roupas</span>
            </label>
          </div>

          {isDonatingClothes && (
            <div className="space-y-2">
              <Label
                htmlFor="orderDonatedClothes"
                className="text-white font-medium"
              >
                Quantidade de Roupas Doadas
              </Label>
              <Input
                id="orderDonatedClothes"
                type="number"
                min="0"
                value={orderDonatedClothes}
                onChange={(e) =>
                  setOrderDonatedClothes(
                    Math.max(0, Number(e.target.value) || 0),
                  )
                }
                placeholder="0"
                className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
              />
              {orderDonatedClothes >= 10 && (
                <div className="text-sm text-yellow-300">
                  Desconto aplicado: -$
                  {Math.floor(orderDonatedClothes / 10) * 500} (
                  {Math.floor(orderDonatedClothes / 10) * 10} roupas)
                </div>
              )}
            </div>
          )}

          {(orderColeteQty > 0 || orderCelularQty > 0) && (
            <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
              <div className="text-sm text-gray-300 space-y-2">
                <div className="font-medium text-white mb-2">
                  Resumo da Encomenda:
                </div>
                {orderColeteQty > 0 && (
                  <div>• {orderColeteQty} Colete(s)</div>
                )}
                {orderCelularQty > 0 && (
                  <div>• {orderCelularQty} Celular(es) Descartável(is)</div>
                )}
                <div className="font-bold text-lg text-blue-400 pt-2 border-t border-gray-600">
                  Total: {formatCurrency(calculateOrderTotal())}
                  {orderBuyerType === 'ally' && (
                    <span className="text-sm text-green-400 ml-2">
                      (Preço Aliado)
                    </span>
                  )}
                  {orderBuyerType === 'nonAlly' && (
                    <span className="text-sm text-red-400 ml-2">
                      (Preço Não-Aliado)
                    </span>
                  )}
                  {isDonatingClothes && orderDonatedClothes >= 10 && (
                    <span className="text-sm text-yellow-300 ml-2">
                      (-R${Math.floor(orderDonatedClothes / 10) * 500} de desconto por roupas)
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botão de envio */}
      <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <span className="text-xl">📤</span>
            <span>Enviar Encomenda</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Revise e confirme os dados antes de enviar para o Discord
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-300">
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 space-y-2">
            <div>
              <strong>Gang:</strong>{' '}
              {orderGangName || (
                <span className="text-red-400">[Não preenchido]</span>
              )}
            </div>

            {orderColeteQty > 0 || orderCelularQty > 0 ? (
              <div>
                <strong>Itens:</strong>{' '}
                {orderColeteQty > 0 && `${orderColeteQty}x Coletes`}
                {orderColeteQty > 0 && orderCelularQty > 0 && ', '}
                {orderCelularQty > 0 && `${orderCelularQty}x Celular(es)`}
              </div>
            ) : (
              <div className="text-red-400">Nenhum item selecionado</div>
            )}

            <div>
              <strong>Total:</strong>{' '}
              <span className="text-green-400 font-semibold">
                {formatCurrency(calculateOrderTotal())}
              </span>{' '}
              <span
                className={`text-sm ${
                  orderBuyerType === 'ally'
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}
              >
                {orderBuyerType === 'ally'
                  ? '(Preço Aliado)'
                  : '(Preço Não-Aliado)'}
              </span>
            </div>
          </div>

          {orderColeteQty + orderCelularQty > 0 && orderGangName.trim() && (
            <div className="bg-gray-900/40 p-4 rounded-lg border border-gray-700/50 font-mono text-sm text-gray-300 whitespace-pre-line">
              A mensagem surpresa será revelada após o envio 😉
            </div>
          )}

          <button
            onClick={handleSubmitOrder}
            disabled={isSubmitting || !orderGangName.trim()}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Confirmar e Enviar</span>
              </>
            )}
          </button>

          {orderMessage && (
            <div className="text-xs text-gray-500 pt-2 border-t border-gray-600/50">
              Última mensagem enviada:
              <pre className="mt-2 whitespace-pre-wrap font-mono text-gray-400">
                {orderMessage}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
