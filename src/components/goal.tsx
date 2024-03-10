import { formatCurrency } from '@/utils/functions/format-currency'
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import { Progress } from './ui/progress'
import { Link } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Skeleton } from 'moti/skeleton'

export type GoalData = {
  id: number
  name: string
  current: number
  total: number
}
type Props = {
  data: GoalData
} & TouchableOpacityProps
export function Goal({ data, ...rest }: Props) {
  const percentage = (data.current / data.total) * 100

  return (
    <Skeleton.Group show>
      <Link href={`/goal/${data.id}`} asChild>
        <TouchableOpacity
          activeOpacity={0.7}
          className="h-44 w-40 justify-between rounded-lg bg-gray-500 p-4"
          {...rest}
        >
          <Text numberOfLines={1} className="font-semiBold text-lg text-white">
            {data.name}
          </Text>

          <View>
            <Text className="text-base text-white">
              {formatCurrency(data.total)}
            </Text>
            <Text className="text-base text-gray-300">
              de {formatCurrency(data.current)}
            </Text>
          </View>

          <Progress percentage={percentage} />
        </TouchableOpacity>
      </Link>
    </Skeleton.Group>
  )
}

export function EmptyGoal() {
  return (
    <View className="h-44 w-40 items-center justify-center gap-4 rounded-lg bg-gray-500 p-4">
      <Feather name="frown" size={32} color={colors.gray['300']} />
      <Text className="font-bold text-sm uppercase text-white">No goal</Text>
    </View>
  )
}

export function GoalSkeleton() {
  return (
    <Skeleton.Group show>
      <View className="h-44 w-40 justify-between rounded-lg bg-gray-500 p-4">
        <Skeleton height={24} radius={4} />

        <View>
          <Skeleton radius={4} height={18} width={96} />

          <Skeleton radius={4} height={18} />
        </View>

        <Skeleton
          radius={24}
          height={24}
          width={'100%'}
          colors={[colors.green[500], colors.green[600]]}
        />
      </View>
    </Skeleton.Group>
  )
}
