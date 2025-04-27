import React from 'react'
import { StyleSheet, View } from 'react-native'

import { colors } from '../theme/colors'
import { radius } from '../theme/spacing'

type ProgressBarProps = {
  progress: number
  color?: string
  height?: number
}

export function ProgressBar({
  progress,
  color = colors.primary.default,
  height = 10
}: ProgressBarProps) {
  // 0から1の範囲に調整
  const safeProgress = Math.min(Math.max(progress, 0), 1)

  return (
    <View style={[styles.container, { height }]}>
      <View
        style={[
          styles.progress,
          {
            width: `${safeProgress * 100}%`,
            backgroundColor: color
          }
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.neutral.light,
    borderRadius: radius.round,
    overflow: 'hidden',
    width: '100%'
  },
  progress: {
    height: '100%',
    borderRadius: radius.round
  }
})
