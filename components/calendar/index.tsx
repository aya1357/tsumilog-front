import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native'
import { CalendarList } from 'react-native-calendars'
import type { Theme as CalendarTheme } from 'react-native-calendars/src/types'

import { CalendarDayItem } from './CalendarDayItem'
import { CalendarColors, DarkCalendarColors } from './constants/colors'
import { useCalendarEvents } from './hooks'

const PAST_RANGE = 24
const FUTURE_RANGE = 24

export const Calendar = () => {
  // hooksからローディング状態も取得する
  const { eventItems, isLoading: isEventsLoading } = useCalendarEvents()
  const colorScheme = useColorScheme()
  const isDark = colorScheme === 'dark'
  const colors = isDark ? DarkCalendarColors : CalendarColors
  const cellMinHeight = 80

  // カレンダーのローディング状態を管理
  const [isCalendarReady, setCalendarReady] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // カレンダーが初期化されたとき、またはイベントデータが読み込まれたときに確認
  useEffect(() => {
    // イベントデータが読み込まれている、かつカレンダーが準備できている場合にロード完了とする
    if (!isEventsLoading && isCalendarReady) {
      // ローディングスピナーをすぐに消さずに、少し遅延を持たせる（視覚的に滑らか）
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setIsLoading(true)
    }
  }, [isEventsLoading, isCalendarReady])

  // カレンダーのテーマを定義
  const calendarTheme: CalendarTheme = useMemo(
    () => ({
      // 全体設定
      calendarBackground: colors.background,
      backgroundColor: colors.background,

      // ヘッダー
      monthTextColor: colors.textPrimary,
      textMonthFontWeight: 'bold',
      textMonthFontSize: 16,

      // ナビゲーション矢印
      arrowColor: colors.primary,
      arrowWidth: 24,
      arrowHeight: 24,

      // 週の曜日ヘッダー
      textSectionTitleColor: colors.textSecondary,
      textDayHeaderFontWeight: '600',
      textDayHeaderFontSize: 12,

      // 日付
      dayTextColor: colors.textPrimary,
      textDayFontSize: 14,
      textDayFontWeight: '400',

      // 今日
      todayTextColor: colors.today,
      todayButtonFontWeight: 'bold',

      // 選択された日
      selectedDayBackgroundColor: colors.primary,
      selectedDayTextColor: colors.textInverted,

      // 無効な日
      textDisabledColor: colors.textSecondary,

      // その他
      dotColor: colors.primary,
      selectedDotColor: colors.textInverted,
      disabledDotColor: colors.textSecondary,
      indicatorColor: colors.primary
    }),
    [colors]
  )

  // カレンダーオンロード完了ハンドラー
  const handleOnCalendarToggle = () => {
    setCalendarReady(true)
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* ローディング中のインディケーター */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      {/* カレンダー表示部分 - ローディング中も読み込んでおく（opacity:0 で非表示） */}
      <View style={[styles.calendarContainer, isLoading && styles.hiddenCalendar]}>
        <CalendarList
          key={colorScheme}
          pastScrollRange={PAST_RANGE}
          futureScrollRange={FUTURE_RANGE}
          firstDay={1}
          showSixWeeks={false}
          hideExtraDays={false}
          monthFormat="yyyy年 M月"
          dayComponent={(dayProps) => (
            <CalendarDayItem
              {...dayProps}
              eventItems={eventItems}
              cellMinHeight={cellMinHeight}
              colors={colors}
            />
          )}
          markingType="custom"
          theme={calendarTheme}
          horizontal={true}
          hideArrows={false}
          pagingEnabled={true}
          calendarStyle={styles.calendar}
          calendarWidth={undefined}
          onVisibleMonthsChange={handleOnCalendarToggle} // 初回表示時に呼ばれる
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4
  },
  calendarContainer: {
    flex: 1
  },
  calendar: {
    paddingLeft: 8,
    paddingRight: 8
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    zIndex: 10
  },
  hiddenCalendar: {
    opacity: 0 // opacity:0 で非表示にする（レンダリングは行われる）
  }
})
