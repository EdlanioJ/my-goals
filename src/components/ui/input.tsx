import { forwardRef } from 'react'
import { TextInput, TextInputProps } from 'react-native'

const Input = forwardRef<TextInput, TextInputProps>(({ ...rest }, ref) => {
  return (
    <TextInput
      ref={ref}
      {...rest}
      className="h-14 w-full rounded-lg border border-gray-400 bg-gray-500 px-4 text-white placeholder:text-gray-300"
    />
  )
})

Input.displayName = 'Input'

export { Input }
