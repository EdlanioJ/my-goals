import { Feather } from '@expo/vector-icons'
import { ScrollView, TouchableOpacity } from 'react-native'

import { colors } from '@/styles/colors'
import { EmptyGoal, Goal, GoalSkeleton } from './goal'
import { useGetAllGoals } from '@/hooks'
import { Skeleton } from 'moti/skeleton'

type Props = {
  onAdd: () => void
}
export function Goals({ onAdd }: Props) {
  const { data, isLoadingGoals } = useGetAllGoals()

  return (
    <ScrollView
      horizontal
      className="max-h-44 flex-1 "
      contentContainerClassName="gap-4 px-8 flex-1"
      showsHorizontalScrollIndicator={false}
    >
      <Skeleton
        show={isLoadingGoals}
        colors={[colors.green[500], colors.green[600]]}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={isLoadingGoals}
          onPress={onAdd}
          className="h-44 w-16 items-center justify-center rounded-lg bg-green-500"
        >
          <Feather name="plus" size={36} color={colors.black} />
        </TouchableOpacity>
      </Skeleton>

      {isLoadingGoals &&
        Array.from({ length: 3 }, (_, index) => <GoalSkeleton key={index} />)}
      {data?.map((item) => <Goal data={item} key={item.id} />)}
      {!isLoadingGoals && data?.length === 0 && <EmptyGoal />}
    </ScrollView>
  )
}
