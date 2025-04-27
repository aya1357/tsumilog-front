import React from 'react'
import { View, type ViewStyle } from 'react-native'

import { colors } from '../theme/colors'

type CardProps = {
  children: React.ReactNode
  style?: ViewStyle
}

export function Card({ children, style }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.background.card,
          borderRadius: 8,
          padding: 16,
          shadowColor: colors.neutral.black,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2
        },
        style
      ]}
    >
      {children}
    </View>
  )
}
