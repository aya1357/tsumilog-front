import { StyleSheet } from 'react-native'

import { colors } from './colors'

// フォントファミリーの定義
export const fonts = {
  thin: 'NotoSansJP-Thin',
  extraLight: 'NotoSansJP-ExtraLight',
  light: 'NotoSansJP-Light',
  regular: 'NotoSansJP-Regular',
  medium: 'NotoSansJP-Medium',
  semiBold: 'NotoSansJP-SemiBold',
  bold: 'NotoSansJP-Bold',
  extraBold: 'NotoSansJP-ExtraBold',
  black: 'NotoSansJP-Black'
} as const

// フォントサイズの定義
export const fontSizes = {
  xs: 9,
  sm: 10,
  base: 14,
  lg: 16,
  xl: 18,
  '2xl': 20,
  '3xl': 24,
  '4xl': 28
} as const

// 行の高さの定義
export const lineHeights = {
  xs: 13,
  sm: 14,
  base: 17,
  lg: 21,
  xl: 24,
  '2xl': 29,
  '3xl': 34
} as const

// テキストスタイルの定義
export const textStyles = {
  // 見出し
  h1: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights['3xl'],
    color: colors.neutral.darkest
  },
  h2: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights['2xl'],
    color: colors.neutral.darkest
  },
  h3: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights.xl,
    color: colors.neutral.darkest
  },
  h4: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.lg,
    color: colors.neutral.darkest
  },
  h5: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.base,
    color: colors.neutral.darkest
  },
  // 本文
  body1: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.xl,
    color: colors.neutral.darkest
  },
  body2: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.lg,
    color: colors.neutral.darkest
  },
  // 補足テキスト
  caption: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    color: colors.neutral.darker
  },
  // 強調
  subtitle1: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.xl,
    color: colors.neutral.darkest
  },
  subtitle2: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.lg,
    color: colors.neutral.darkest
  },
  // ボタンテキスト
  button: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.sm,
    letterSpacing: 0.5,
    color: colors.neutral.white
  },
  // カウンターテキスト（ページ数など）
  counter: {
    fontFamily: fonts.bold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights['2xl'],
    color: colors.secondary.default
  }
} as const

// スタイルシートの作成
export const typography = StyleSheet.create(textStyles)
