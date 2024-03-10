import { GoalData, useTransactionRepository } from '@/db'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetLatestTransactions() {
  const transactionsRepo = useTransactionRepository()

  const { data, isLoading } = useQuery({
    queryKey: ['latest-transactions'],
    queryFn: transactionsRepo.getLatest,
  })

  return { data, isLatestLoading: isLoading }
}

export function useGetTransactionsByGoal(goalId: number) {
  const transactionsRepo = useTransactionRepository()

  const { data, isLoading } = useQuery({
    queryKey: ['goal-transactions', goalId],
    queryFn: () => transactionsRepo.getByGoalId(goalId),
  })

  return { data, isGoalTransactionsLoading: isLoading }
}

export function useAddTransaction() {
  const transactionsRepo = useTransactionRepository()
  const queryClient = useQueryClient()
  const { dismiss } = useBottomSheetModal()

  const { mutate, isPending } = useMutation({
    mutationFn: transactionsRepo.add,
    onSuccess: (_, { goalId, amount }) => {
      queryClient.invalidateQueries({ queryKey: ['latest-transactions'] })
      queryClient.invalidateQueries({ queryKey: ['goal-transactions', goalId] })
      queryClient.invalidateQueries({ queryKey: ['goals'] })
      queryClient.setQueryData(
        ['goal', goalId],
        (oldValue: GoalData) =>
          ({
            ...oldValue,
            current: oldValue.current + amount,
          }) as GoalData,
      )
      dismiss()
    },
  })

  return { addTransaction: mutate, isAddingTransaction: isPending }
}
