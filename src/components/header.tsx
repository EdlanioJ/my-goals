import { Text, View } from 'react-native'

type Props = {
  title: string
  subtitle: string
}
export function Header({ subtitle, title }: Props) {
  return (
    <View className="mb-10 mt-14 px-8">
      <Text className="text-4xl font-bold text-white">{title}</Text>
      <Text className="font-regular text-lg text-white">{subtitle}</Text>
    </View>
  )
}
