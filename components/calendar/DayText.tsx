import React, { useMemo } from 'react'
import { StyleSheet, Text, type TextStyle } from 'react-native'

import type { colors } from '../theme/colors'
import { fonts, fontSizes, lineHeights } from '../theme/typography'

type Props = {
  children: React.ReactNode
  isSunday: boolean
  isSaturday: boolean
  state: string | undefined
  colors: typeof colors
}

export const DayText = React.memo(({ children, isSunday, isSaturday, state, colors }: Props) => {
  const textStyle = useMemo(() => {
    const styleArray: TextStyle[] = [styles.dayText]

    if (isSunday) styleArray.push({ color: colors.error.default })
    if (isSaturday) styleArray.push({ color: colors.secondary.default })
    if (state === 'today') styleArray.push({ color: colors.text.light, fontWeight: 'bold' })
    if (state === 'disabled') styleArray.push({ opacity: 0.5 })

    return styleArray
  }, [isSunday, isSaturday, state, colors])

  return <Text style={textStyle}>{children}</Text>
})

DayText.displayName = 'DayText'

const styles = StyleSheet.create({
  dayText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    textAlign: 'center'
  }
})
