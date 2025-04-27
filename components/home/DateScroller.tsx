import React, { useEffect, useRef } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Trophy } from 'lucide-react-native'

import { colors } from '../theme/colors'
import { radius, shadow, spacing } from '../theme/spacing'

type DateWithReading = {
  date: Date
  hasReading: boolean
  isToday: boolean
  isSelected: boolean
}

type DateScrollerProps = {
  dates: DateWithReading[]
  onDateSelect: (date: Date) => void
  selectedDate: Date
}

export function DateScroller({ dates, onDateSelect, selectedDate }: DateScrollerProps) {
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    const todayIndex = dates.findIndex((d) => d.isToday)
    if (todayIndex !== -1 && scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: todayIndex * 60 - 150,
          animated: true
        })
      }, 100)
    }
  }, [])

  // 曜日を取得
  const getDayOfWeek = (date: Date) => {
    const days = ['日', '月', '火', '水', '木', '金', '土']
    return days[date.getDay()]
  }

  // 選択された日付に応じてヘッダーテキストを変更
  const getHeaderText = (date: Date) => {
    const today = new Date()
    if (date.toDateString() === today.toDateString()) {
      return '今日'
    }
    return `${date.getMonth() + 1}月${date.getDate()}日`
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{getHeaderText(selectedDate)}</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateItem,
              item.isSelected && styles.selectedDateItem,
              item.isToday && styles.todayDateItem
            ]}
            onPress={() => onDateSelect(item.date)}
          >
            <Text
              style={[
                styles.dayOfWeek,
                item.isSelected && styles.selectedText,
                item.isToday && styles.todayText
              ]}
            >
              {getDayOfWeek(item.date)}
            </Text>
            <Text
              style={[
                styles.dateText,
                item.isSelected && styles.selectedText,
                item.isToday && styles.todayText
              ]}
            >
              {item.date.getDate()}
            </Text>
            {item.hasReading && (
              <View style={styles.trophyContainer}>
                <Trophy size={12} color={colors.trophy} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

DateScroller.displayName = 'DateScroller'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.md,
    marginLeft: spacing.md,
    color: colors.text.primary
  },
  scrollContent: {
    paddingHorizontal: spacing.md
  },
  dateItem: {
    width: 52,
    height: 64,
    backgroundColor: colors.primary.lightest,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    ...shadow.sm
  },
  selectedDateItem: {
    backgroundColor: colors.primary.default,
    transform: [{ scale: 1.05 }]
  },
  todayDateItem: {
    backgroundColor: colors.secondary.default
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary
  },
  dayOfWeek: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: spacing.xs / 2
  },
  selectedText: {
    color: colors.text.light
  },
  todayText: {
    color: colors.text.light
  },
  trophyContainer: {
    position: 'absolute',
    top: 5,
    right: 5
  }
})
