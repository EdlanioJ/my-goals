import { useGoalRepository } from '@/db'
import { useBottomSheetModal } from '@gorhom/bottom-sheet'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useAddGoal() {
  const goalRepo = useGoalRepository()
  const queryClient = useQueryClient()
  const { dismiss } = useBottomSheetModal()

  const { isPending, mutate } = useMutation({
    mutationFn: goalRepo.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] })
      dismiss()
    },
  })

  return { isAdding: isPending, addGoal: mutate }
}

export function useGetAllGoals() {
  const goalRepo = useGoalRepository()

  const { data, isLoading } = useQuery({
    queryKey: ['goals'],
    queryFn: goalRepo.all,
  })

  return { data, isLoadingGoals: isLoading }
}

export function useGetGoalById(id: number) {
  const goalRepo = useGoalRepository()

  const { data, isLoading } = useQuery({
    queryKey: ['goal', id],
    queryFn: () => goalRepo.getById(id),
  })

  return { data, isLoadingGoal: isLoading }
}
