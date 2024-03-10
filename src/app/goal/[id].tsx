import { useRef } from 'react'
import { Keyboard, Pressable, Text, View } from 'react-native'
import { Link, useGlobalSearchParams } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Skeleton } from 'moti/skeleton'

import { colors } from '@/styles/colors'
import { Transactions } from '@/components/transactions'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { useGetGoalById, useGetTransactionsByGoal } from '@/hooks'
import { formatCurrency } from '@/utils/functions/format-currency'
import { AddTransactionForm } from '@/components/add-transaction-form'

export default function GoalDetail() {
  const { id } = useGlobalSearchParams<{ id: string }>()
  const { data: goalTransactions, isGoalTransactionsLoading } =
    useGetTransactionsByGoal(Number(id))

  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const { data: goal, isLoadingGoal } = useGetGoalById(Number(id))
  const percentage = goal ? (goal.current / goal.total) * 100 : 0

  function handleCloseBottomSheet() {
    bottomSheetRef.current?.dismiss()
    Keyboard.dismiss()
  }

  function handleOpenBottomSheet() {
    bottomSheetRef.current?.present()
  }

  return (
    <View className="flex-1 pt-12">
      <Skeleton.Group show={isLoadingGoal}>
        <View className="px-8">
          <Skeleton width={36} height={36}>
            <Link href="../" asChild>
              <Pressable className="aspect-square w-10 items-center justify-center rounded border border-gray-400">
                <Feather name="chevron-left" color={colors.white} size={24} />
              </Pressable>
            </Link>
          </Skeleton>
          <View className="my-8 gap-1">
            <Skeleton height={32}>
              <Text className="font-bold text-4xl text-white">
                {goal?.name}
              </Text>
            </Skeleton>
            <Skeleton height={18} width={260}>
              <Text className="font-regular text-sm text-gray-300">
                {goal &&
                  `${formatCurrency(goal.current)} de ${formatCurrency(goal.total)}`}
              </Text>
            </Skeleton>
          </View>
          <Skeleton radius={32} colors={[colors.green[500], colors.green[600]]}>
            <Progress percentage={percentage} />
          </Skeleton>
        </View>
      </Skeleton.Group>

      <Transactions
        data={goalTransactions}
        isLoading={isGoalTransactionsLoading}
      />
      <View className="px-8 py-4">
        <Skeleton
          show={isLoadingGoal}
          radius={4}
          colors={[colors.blue[500], colors.blue[500]]}
        >
          <Button onPress={handleOpenBottomSheet}>nova transação</Button>
        </Skeleton>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        title="Nova transação"
        onClose={handleCloseBottomSheet}
      >
        <AddTransactionForm goalId={Number(id)} />
      </BottomSheet>
    </View>
  )
}
