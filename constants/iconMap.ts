import type { ComponentType } from 'react'
import type { IconProps } from 'react-native-vector-icons/Icon'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

type IconComponent = ComponentType<IconProps>

export const IconMap = {
  Ionicons: Ionicons as IconComponent,
  MaterialIcons: MaterialIcons as IconComponent
} as const

export type IconLibraryName = keyof typeof IconMap
