import { ActivityIndicator, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { colors } from '@/styles/colors'
import { useAddTransaction } from '@/hooks'
import { TransactionTypeSelect } from './transaction-type-select'

const schema = z.object({
  amount: z.string(),
  type: z.enum(['up', 'down']).default('up'),
  goalId: z.number(),
})

type FormData = z.infer<typeof schema>

type Props = {
  goalId: number
}
export function AddTransactionForm({ goalId }: Props) {
  const { addTransaction, isAddingTransaction } = useAddTransaction()
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      goalId,
    },
  })

  function onSubmit(data: FormData) {
    addTransaction({
      amount: data.type === 'up' ? Number(data.amount) : -Number(data.amount),
      goalId: data.goalId,
    })
  }
  return (
    <View>
      <View className="mb-8 gap-4">
        <Controller
          control={control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <TransactionTypeSelect onChange={onChange} selected={value} />
          )}
        />

        <Controller
          control={control}
          name="amount"
          render={({ field }) => (
            <Input
              placeholder="valor"
              value={field.value}
              onChangeText={field.onChange}
              keyboardType="numeric"
            />
          )}
        />
      </View>

      <Button disabled={isAddingTransaction} onPress={handleSubmit(onSubmit)}>
        {isAddingTransaction ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          'Criar'
        )}
      </Button>
    </View>
  )
}
