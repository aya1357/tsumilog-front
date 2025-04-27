import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type TextStyle,
  type ViewStyle
} from 'react-native'

import { colors } from '../theme/colors'
import { radius } from '../theme/spacing'
import { typography } from '../theme/typography'

type ButtonProps = {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  icon?: React.ReactNode
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    disabled && styles.disabledButton,
    style
  ]

  const textStyles = [
    typography.button,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle
  ]

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline' || variant === 'text'
              ? colors.primary.default
              : colors.neutral.white
          }
        />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    marginRight: 8
  },
  // ボタンのスタイル
  primaryButton: {
    backgroundColor: colors.primary.default
  },
  secondaryButton: {
    backgroundColor: colors.secondary.default
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary.default
  },
  textButton: {
    backgroundColor: 'transparent'
  },
  // ボタンのサイズ
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24
  },
  // テキストのスタイル
  primaryText: {
    color: colors.neutral.white
  },
  secondaryText: {
    color: colors.neutral.white
  },
  outlineText: {
    color: colors.primary.default
  },
  textText: {
    color: colors.primary.default
  },
  // テキストのサイズ
  smallText: {
    fontSize: 12
  },
  mediumText: {
    fontSize: 14
  },
  largeText: {
    fontSize: 16
  },
  // 無効なボタンのスタイル
  disabledButton: {
    backgroundColor: colors.neutral.light,
    borderColor: colors.neutral.light
  },
  disabledText: {
    color: colors.neutral.dark
  }
})
