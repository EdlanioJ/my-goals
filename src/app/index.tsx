import { useRef } from 'react'
import { Keyboard, View } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

import { Goals } from '@/components/goals'
import { Header } from '@/components/header'
import { AddGoalForm } from '@/components/add-goal-form'
import { Transactions } from '@/components/transactions'
import { BottomSheet } from '@/components/ui/bottom-sheet'

import { useGetLatestTransactions } from '@/hooks'

export default function Page() {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const { data: latestTransactions, isLatestLoading } =
    useGetLatestTransactions()

  function handleCloseBottomSheet() {
    bottomSheetRef.current?.dismiss()
    Keyboard.dismiss()
  }

  function handleOpenBottomSheet() {
    bottomSheetRef.current?.present()
  }

  return (
    <View className="flex-1 pt-8">
      <Header
        title="Suas metas"
        subtitle="Poupe hoje para colher os frutos amanhã."
      />

      <Goals onAdd={handleOpenBottomSheet} />
      <Transactions data={latestTransactions} isLoading={isLatestLoading} />

      <BottomSheet
        ref={bottomSheetRef}
        title="Nova meta"
        onClose={handleCloseBottomSheet}
      >
        <AddGoalForm />
      </BottomSheet>
    </View>
  )
}
