import { View } from 'react-native'
import { TransactionType } from './transaction-type'
import { colors } from '@/styles/colors'

export type TransactionType = 'up' | 'down'

type Props = {
  selected: TransactionType
  onChange: (status: TransactionType) => void
}

export function TransactionTypeSelect({ onChange, selected }: Props) {
  return (
    <View className="flex-row items-center gap-4">
      <TransactionType
        onPress={() => onChange('up')}
        data={{
          icon: 'plus',
          title: 'Depósito',
          color: colors.green[500],
          selected: selected === 'up',
        }}
      />

      <TransactionType
        onPress={() => onChange('down')}
        data={{
          icon: 'minus',
          title: 'Saque',
          color: colors.red[500],
          selected: selected === 'down',
        }}
      />
    </View>
  )
}
