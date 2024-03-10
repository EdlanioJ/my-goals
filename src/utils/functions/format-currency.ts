export function formatCurrency(amount: number) {
  return amount.toLocaleString('pt-AO', {
    currency: 'aoa',
    style: 'currency',
  })
}
