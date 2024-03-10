import { TransactionData } from '@/db'
import { colors } from '@/styles/colors'
import { formatCurrency } from '@/utils/functions/format-currency'
import dayjs from 'dayjs'
import { Skeleton } from 'moti/skeleton'
import { Pressable, Text, View } from 'react-native'

type Props = {
  data: TransactionData
}
export function Transaction({ data }: Props) {
  return (
    <Pressable className="h-16 w-full flex-row items-center justify-between rounded-sm border border-gray-400 bg-gray-500 p-4">
      <Text
        className="font-regular"
        style={{
          color: data.amount > 0 ? colors.green['500'] : colors.red['500'],
        }}
      >
        {formatCurrency(data.amount)}
      </Text>

      <Text className="text-sm text-gray-300">
        {dayjs(data.created_at).format('DD/MM/YYYY [às] HH:mm')}
      </Text>
    </Pressable>
  )
}

export function TransactionSkeleton() {
  return (
    <Skeleton.Group show>
      <View className="h-16 w-full flex-row items-center justify-between rounded-sm border border-gray-400 bg-gray-500 p-4">
        <Skeleton colorMode="dark" radius={4} height={18} width={96}>
          <Text>Hidden</Text>
        </Skeleton>

        <Skeleton colorMode="dark" radius={4} height={18} width={124}>
          <Text>Hidden</Text>
        </Skeleton>
      </View>
    </Skeleton.Group>
  )
}
