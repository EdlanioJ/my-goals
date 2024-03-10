import { Feather } from '@expo/vector-icons'
import { ComponentProps } from 'react'
import { Pressable, PressableProps, Text } from 'react-native'
type TransactionTypeData = {
  title: string
  icon: ComponentProps<typeof Feather>['name']
  color: string
  selected: boolean
}
type Props = {
  data: TransactionTypeData
} & PressableProps
export function TransactionType({ data, ...rest }: Props) {
  return (
    <Pressable
      {...rest}
      className="flex-row gap-2 rounded bg-gray-400 px-4 py-2"
      style={{ opacity: data.selected ? 1 : 0.5 }}
    >
      <Feather name={data.icon} color={data.color} size={16} />
      <Text className="font-semiBold text-sm text-white">{data.title}</Text>
    </Pressable>
  )
}
