import { Text, View } from 'react-native'
type Props = {
  percentage: number
}
export function Progress({ percentage }: Props) {
  const value = percentage.toFixed(0) + '%'

  return (
    <View className="h-6 w-full flex-row items-center overflow-hidden rounded-full bg-gray-400">
      <View
        className="h-6 flex-row items-center rounded-full bg-green-500"
        style={{ width: `${percentage}%` }}
      >
        {percentage >= 60 && (
          <Text className="mx-5 font-semiBold text-xs text-black">{value}</Text>
        )}
      </View>
      {percentage < 60 && (
        <Text className="mx-5 font-semiBold text-xs text-white">{value}</Text>
      )}
    </View>
  )
}
