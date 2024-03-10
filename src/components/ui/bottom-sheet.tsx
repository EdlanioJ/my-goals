import { colors } from '@/styles/colors'
import { Feather } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import { forwardRef, useCallback, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'

type Props = {
  title: string
  onClose: () => void
  children: React.ReactNode
}
const BottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ children, title, onClose }, ref) => {
    const snapPoints = useMemo(() => [284], [])

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      [],
    )

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        enablePanDownToClose
        backgroundStyle={{
          borderWidth: 1,
          borderColor: colors.gray[400],
          backgroundColor: colors.gray[700],
        }}
        handleComponent={() => null}
        backdropComponent={renderBackdrop}
        snapPoints={snapPoints}
      >
        <View className="p-8">
          <View className="mb-6 flex-row justify-between">
            <Text className="font-semiBold text-xl text-white">{title}</Text>

            <Pressable onPress={onClose}>
              <Feather name="x" size={24} color={colors.gray['300']} />
            </Pressable>
          </View>
          {children}
        </View>
      </BottomSheetModal>
    )
  },
)
BottomSheet.displayName = 'BottomSheet'

export { BottomSheet }
