import React, { type ComponentType } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { IconProps } from 'react-native-vector-icons/Icon'

import { colors } from '../theme/colors'
import { fonts, fontSizes, lineHeights } from '../theme/typography'

type TabIconProps = {
  focused: boolean
  IconComponent: ComponentType<IconProps>
  iconName: string
  title: string
}

export function TabIcon({ focused, IconComponent, iconName, title }: TabIconProps) {
  return (
    <View style={styles.container}>
      <IconComponent
        name={iconName}
        size={24}
        color={focused ? colors.primary.default : colors.neutral.medium}
      />
      <Text style={[styles.text, focused ? styles.focusedText : styles.unfocusedText]}>
        {title}
      </Text>
    </View>
  )
}

TabIcon.displayName = 'TabIcon'

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    width: '100%',
    textAlign: 'center',
    marginTop: 4,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs
  },
  focusedText: {
    color: colors.primary.default,
    fontFamily: fonts.medium
  },
  unfocusedText: {
    color: colors.neutral.medium,
    fontFamily: fonts.regular
  }
})
