import { useMemo } from 'react'
import { StyleSheet, useColorScheme, View } from 'react-native'
import { CalendarList, LocaleConfig } from 'react-native-calendars'
import type { Theme as CalendarTheme } from 'react-native-calendars/src/types'

import { CalendarDayItem } from './CarendarDayItem'
import { useCalendarEvents } from './hooks'

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
// 多言語対応を行う場合は日本語以外にも切り替えられるよう実装が必要

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
  const { eventItems } = useCalendarEvents()
  const theme = useColorScheme()
  const cellMinHeight = 80

  // カレンダーのテーマを定義
  const calendarTheme: CalendarTheme = useMemo(
    () => ({
      monthTextColor: '#000',
      textMonthFontWeight: 'bold',
      calendarBackground: 'transparent',
      arrowColor: '#0000ff'
    }),
    []
  )

  return (
    <View style={styles.container}>
      <CalendarList
        key={theme} // ダークモードの切り替えなどで再レンダリングが必要な場合に指定
        pastScrollRange={PAST_RANGE} // カレンダーの月表示範囲、現在の月から24ヶ月前まで
        futureScrollRange={FUTURE_RANGE} // カレンダーの月表示範囲、現在の月から24ヶ月後まで
        firstDay={1} // 1週間の始まり (0: 日曜, 1: 始まり)
        showSixWeeks={true} // 6週間表示（hideExtraDays = falseの場合のみ）
        hideExtraDays={false} // 当月以外の日付を隠す
        monthFormat="yyyy年 M月"
        dayComponent={(d) => (
          <CalendarDayItem {...d} eventItems={eventItems} cellMinHeight={cellMinHeight} />
        )}
        markingType="custom" // 日付内表示をカスタムするので custom を指定
        theme={calendarTheme}
        horizontal={true}
        hideArrows={false}
        pagingEnabled={true} // 横スワイプでのページネーションを可能にする
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
