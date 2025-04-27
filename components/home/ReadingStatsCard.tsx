import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Award, BookOpen, Calendar, TrendingUp } from 'lucide-react-native'

import { colors } from '../theme/colors'
import { radius, shadow, spacing } from '../theme/spacing'
import { typography } from '../theme/typography'

type ReadingStatsCardProps = {
  todayPages: number
  previousDayPages: number
  daysRemaining: number
  monthlyTotalPages: number
  previousMonthPages: number
  targetPages: number
}

export function ReadingStatsCard({
  todayPages,
  previousDayPages,
  daysRemaining,
  monthlyTotalPages,
  previousMonthPages,
  targetPages
}: ReadingStatsCardProps) {
  // 前日比の計算
  const dayDifference = todayPages - previousDayPages
  const isDayImprovement = dayDifference >= 0

  // 前月比の計算
  const monthDifference = Math.round(
    ((monthlyTotalPages - previousMonthPages) / (previousMonthPages || 1)) * 100
  )
  const isMonthImprovement = monthDifference >= 0

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* 今日のページ数 */}
        <View style={styles.card}>
          <View style={styles.labelContainer}>
            <BookOpen size={16} color={colors.primary.default} />
            <Text style={styles.label}>今日</Text>
          </View>
          <Text style={[styles.value, { color: colors.primary.default }]}>
            {todayPages}
            <Text style={styles.unit}>ページ</Text>
          </Text>
          <Text
            style={[
              styles.comparison,
              { color: isDayImprovement ? colors.success.dark : colors.error.dark }
            ]}
          >
            前日比: {isDayImprovement ? '+' : ''}
            {dayDifference}
          </Text>
        </View>

        {/* 今月の総ページ数 */}
        <View style={styles.card}>
          <View style={styles.labelContainer}>
            <TrendingUp size={16} color={colors.secondary.default} />
            <Text style={styles.label}>今月</Text>
          </View>
          <Text style={[styles.value, { color: colors.secondary.default }]}>
            {monthlyTotalPages}
            <Text style={styles.unit}>ページ</Text>
          </Text>
          <Text
            style={[
              styles.comparison,
              { color: isMonthImprovement ? colors.success.dark : colors.error.dark }
            ]}
          >
            前月比: {isMonthImprovement ? '+' : ''}
            {monthDifference}%
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        {/* 残り日数 */}
        <View style={styles.card}>
          <View style={styles.labelContainer}>
            <Calendar size={16} color={colors.accent.dark} />
            <Text style={styles.label}>残り</Text>
          </View>
          <Text style={[styles.value, { color: colors.accent.dark }]}>
            {daysRemaining}
            <Text style={styles.unit}>日</Text>
          </Text>
        </View>

        {/* 目標ページ数 */}
        <View style={styles.card}>
          <View style={styles.labelContainer}>
            <Award size={16} color={colors.trophy} />
            <Text style={styles.label}>目標</Text>
          </View>
          <Text style={[styles.value, { color: colors.trophy }]}>
            {targetPages}
            <Text style={styles.unit}>ページ</Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

ReadingStatsCard.displayName = 'ReadingStatsCard'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs
  },
  card: {
    flex: 1,
    height: 90,
    backgroundColor: colors.background.card,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginHorizontal: spacing.xs / 2,
    ...shadow.sm,
    borderWidth: 1,
    borderColor: colors.neutral.lightest,
    justifyContent: 'space-between'
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2
  },
  label: {
    ...typography.caption,
    fontSize: 16,
    marginLeft: spacing.xs,
    includeFontPadding: false,
    lineHeight: 18
  },
  value: {
    ...typography.counter,
    fontSize: 28,
    textAlign: 'right',
    marginVertical: 0,
    ...Platform.select({
      android: {
        includeFontPadding: false,
        lineHeight: Platform.OS === 'android' ? 35 : undefined,
        paddingTop: 5
      }
    })
  },
  unit: {
    ...typography.caption,
    fontSize: 14,
    color: colors.text.tertiary,
    marginLeft: 2
  },
  comparison: {
    ...typography.caption,
    fontSize: 12,
    textAlign: 'right',
    color: colors.text.tertiary,
    marginBottom: 0
  }
})
