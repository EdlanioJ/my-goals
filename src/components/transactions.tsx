import { FlatList, Text, View } from 'react-native'
import { Transaction, TransactionSkeleton } from './transaction'
import { TransactionData } from '@/db'

type Props = {
  data: TransactionData[] | undefined
  isLoading: boolean
}

export function Transactions({ data, isLoading }: Props) {
  const placeholder = new Array(3).fill(null)

  return (
    <View className="mt-10 flex-1 px-8">
      <View className="mb-4 border-b border-b-gray-400 pb-4">
        <Text className="font-semiBold text-lg text-white">Transações</Text>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerClassName="gap-4 pb-12"
        data={!isLoading ? data : placeholder}
        ListEmptyComponent={() => (
          <Text className="font-regular text-sm text-gray-300">
            Nenhuma transação registrada ainda.
          </Text>
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>
          item ? <Transaction data={item} /> : <TransactionSkeleton />
        }
      />
    </View>
  )
}
