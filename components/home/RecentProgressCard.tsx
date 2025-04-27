import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TrendingUp } from 'lucide-react-native'

import { colors } from '../theme/colors'
import { radius, shadow, spacing } from '../theme/spacing'

type ReadingEntry = {
  id: string
  date: string
  title: string
  pages: number
}

type MonthlyComparison = {
  currentPages: number
  previousPages: number
}

type RecentProgressCardProps = {
  entries: ReadingEntry[]
  onEntryPress: (id: string) => void
  monthlyComparison: MonthlyComparison
}

export function RecentProgressCard({
  entries,
  onEntryPress,
  monthlyComparison
}: RecentProgressCardProps) {
  const percentChange = Math.round(
    ((monthlyComparison.currentPages - monthlyComparison.previousPages) /
      (monthlyComparison.previousPages || 1)) *
      100
  )

  const isImprovement = percentChange >= 0

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>最近の読書記録</Text>
        <View style={styles.statsContainer}>
          <TrendingUp
            size={16}
            color={isImprovement ? colors.success.default : colors.error.default}
          />
          <Text
            style={[
              styles.statsText,
              { color: isImprovement ? colors.success.default : colors.error.default }
            ]}
          >
            {isImprovement ? '+' : ''}
            {percentChange}ページ 先月比
          </Text>
        </View>
      </View>

      <ScrollView style={styles.entriesList}>
        {entries.map((item, index) => (
          <React.Fragment key={item.id}>
            <TouchableOpacity style={styles.entryItem} onPress={() => onEntryPress(item.id)}>
              <View style={styles.entryInfo}>
                <Text style={styles.entryDate}>{item.date}</Text>
                <Text style={styles.entryTitle}>{item.title}</Text>
              </View>
              <View style={styles.entryPages}>
                <Text style={styles.pagesText}>{item.pages}ページ</Text>
              </View>
            </TouchableOpacity>
            {index < entries.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  )
}

RecentProgressCard.displayName = 'RecentProgressCard'

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    ...shadow.md
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.lightest
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  statsText: {
    marginLeft: spacing.xs,
    fontSize: 14,
    fontWeight: '600'
  },
  entriesList: {
    maxHeight: 80
  },
  entryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  },
  entryInfo: {
    flex: 1
  },
  entryDate: {
    fontSize: 12,
    color: colors.text.tertiary,
    marginBottom: spacing.xs / 2
  },
  entryTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary
  },
  entryPages: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  pagesText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.secondary,
    marginRight: spacing.sm
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral.lightest,
    marginHorizontal: spacing.md
  }
})
