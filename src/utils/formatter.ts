export function formatteMoney(moneyInCentes: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(moneyInCentes);
}