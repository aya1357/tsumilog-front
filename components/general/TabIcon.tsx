import React, { type ComponentType } from 'react'
import { Text, View } from 'react-native'
import type { IconProps } from 'react-native-vector-icons/Icon'

type TabTextStylesProps = {
  base: string
  state: {
    focused: string
    unfocused: string
  }
}

const tabTextStyles: TabTextStylesProps = {
  base: 'text-xs w-full text-center mt-1',
  state: {
    focused: 'text-primary-300 font-rubik-medium',
    unfocused: 'text-neutral-200 font-rubik'
  }
}

type TabIconProps = {
  focused: boolean
  IconComponent: ComponentType<IconProps>
  iconName: string
  title: string
}

export function TabIcon({ focused, IconComponent, iconName, title }: TabIconProps) {
  return (
    <View className="mt-1 flex flex-1 flex-col items-center">
      <IconComponent name={iconName} size={24} color={focused ? '#0061FF' : '#666876'} />
      <Text
        className={`${tabTextStyles.base} ${
          focused ? tabTextStyles.state.focused : tabTextStyles.state.unfocused
        }`}
      >
        {title}
      </Text>
    </View>
  )
}
