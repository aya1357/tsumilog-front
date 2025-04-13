import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, useColorScheme, View } from 'react-native'
import { CalendarList, LocaleConfig } from 'react-native-calendars'
import type { Theme as CalendarTheme } from 'react-native-calendars/src/types'

import { CalendarDayItem } from './CalendarDayItem'
import { useCalendarEvents } from './hooks'

// カラーパレット定義
export const CalendarColors = {
  // メインカラー
  primary: '#2563eb', // メインの青色
  primaryLight: '#dbeafe', // 薄い青色
  primaryDark: '#1e40af', // 濃い青色

  // テキストカラー
  textPrimary: '#1e293b', // 通常テキスト
  textSecondary: '#64748b', // 薄いテキスト
  textInverted: '#ffffff', // 白いテキスト

  // 背景色
  background: '#ffffff', // 背景色
  backgroundAlt: '#f8fafc', // 代替背景色

  // 境界線
  border: '#e2e8f0', // 境界線色

  // 特別な日
  today: '#3b82f6', // 今日
  sunday: '#ef4444', // 日曜日
  saturday: '#3b82f6', // 土曜日

  // イベント関連色
  eventDefault: '#3b82f6' // デフォルトイベント色
}

// ダークモード用カラーパレット
export const DarkCalendarColors = {
  // メインカラー
  primary: '#3b82f6',
  primaryLight: '#1e3a8a',
  primaryDark: '#60a5fa',

  // テキストカラー
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textInverted: '#0f172a',

  // 背景色
  background: '#0f172a',
  backgroundAlt: '#1e293b',

  // 境界線
  border: '#334155',

  // 特別な日
  today: '#60a5fa',
  sunday: '#f87171',
  saturday: '#60a5fa',

  // イベント関連色
  eventDefault: '#60a5fa'
}

interface LocaleConfigType {
  locales: Record<
    string,
    {
      monthNames: string[]
      monthNamesShort: string[]
      dayNames: string[]
      dayNamesShort: string[]
    }
  >
  defaultLocale: string
}

// カレンダーの表示言語設定
;(LocaleConfig as LocaleConfigType).locales.jp = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ],
  dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土']
}
;(LocaleConfig as LocaleConfigType).defaultLocale = 'jp'

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
          dayComponent={(d) => (
            <CalendarDayItem
              {...d}
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
