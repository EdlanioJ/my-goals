import { ActivityIndicator, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Input } from './ui/input'
import { Button } from './ui/button'
import { useAddGoal } from '@/hooks'
import { colors } from '@/styles/colors'

const schema = z.object({
  name: z.string(),
  value: z.string(),
})

type FormData = z.infer<typeof schema>

export function AddGoalForm() {
  const { addGoal, isAdding } = useAddGoal()
  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  function onSubmit(data: FormData) {
    console.log(data)
    addGoal({
      name: data.name,
      total: Number(data.value),
    })
  }

  return (
    <View>
      <View className="mb-6 gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Nome da meta"
            />
          )}
        />

        <Controller
          control={control}
          name="value"
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              placeholder="Valor"
              keyboardType="numeric"
            />
          )}
        />
      </View>

      <Button disabled={isAdding} onPress={handleSubmit(onSubmit)}>
        {isAdding ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          'Criar'
        )}
      </Button>
    </View>
  )
}
