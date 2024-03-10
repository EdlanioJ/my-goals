import { forwardRef } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

const Button = forwardRef<TouchableOpacity, TouchableOpacityProps>(
  ({ children, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        {...rest}
        activeOpacity={0.7}
        className="h-14 w-full items-center justify-center rounded-md bg-blue-500"
      >
        <Text className="font-semiBold text-sm uppercase text-white">
          {children}
        </Text>
      </TouchableOpacity>
    )
  },
)

Button.displayName = 'Button'
export { Button }
