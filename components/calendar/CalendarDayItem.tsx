import React, { useCallback, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, type TextStyle } from 'react-native'
import type { DateData } from 'react-native-calendars'
import type { DayProps } from 'react-native-calendars/src/calendar/day'

export type CalendarItem = {
  id: string
  /** 表示順(日付内) */
  index: number
  /** 表示カラー */
  color: string
  /** 表示文字 */
  text: string
  /** 表示タイプ (start:予定開始日 / between:予定中間日 / end:予定終了日 / all:全日) */
  type: 'start' | 'between' | 'end' | 'all'
}

/** 日付内の予定バーの高さ */
export const CELL_HEIGHT = 16

const MAX_EVENTS = 3 // 1日に表示する最大予定数
const CELL_ITEM_PADDING = 3 // 予定間の余白
const CELL_RADIUS = 2 // 予定バーの角丸度

type Props = DayProps & {
  date?: DateData | undefined
  eventItems: Map<string, CalendarItem[]>
  cellMinHeight: number
  colors: Record<string, string>
}

export const CalendarDayItem = (props: Props) => {
  const { date, eventItems: dayItems, children, state, cellMinHeight, colors } = props
  const isSunday = date ? new Date(date.dateString).getDay() === 0 : false
  const isSaturday = date ? new Date(date.dateString).getDay() === 6 : false

  // 該当日付の予定を表示順(インデックス)に並び替える
  const events = useMemo(
    () =>
      (dayItems.get((date as DateData).dateString) ?? [])
        .sort((a, b) => a.index - b.index)
        .slice(0, MAX_EVENTS),
    [date, dayItems]
  )

  // イベントが最大数を超えているかチェック
  const hasMoreEvents = useMemo(
    () => (dayItems.get((date as DateData).dateString) ?? []).length > MAX_EVENTS,
    [date, dayItems]
  )

  // 日付をクリック
  const onDayPress = useCallback(() => {
    console.info('on press day', date?.dateString)
  }, [date?.dateString])

  // 予定をクリック
  const onEventPress = useCallback((item: CalendarItem) => {
    console.info('on press event', item.text)
  }, [])

  // 日付のスタイル計算
  const getDayTextStyle = () => {
    const textStyle: TextStyle[] = [cellStyles.dayText]

    if (isSunday) {
      textStyle.push(cellStyles.sundayText)
    }

    if (isSaturday) {
      textStyle.push(cellStyles.saturdayText)
    }

    if (state === 'today') {
      textStyle.push(cellStyles.todayText)
    }

    if (state === 'disabled') {
      textStyle.push(cellStyles.disabledText)
    }

    return textStyle
  }

  // 予定表示
  const renderEvent = useCallback(
    (v: CalendarItem, i: number) => {
      const borderLeft = v.type === 'start' || v.type === 'all' ? CELL_RADIUS : 0
      const borderRight = v.type === 'end' || v.type === 'all' ? CELL_RADIUS : 0
      const eventColor = v.color || colors.eventDefault || '#3b82f6'

      return (
        <TouchableOpacity
          key={`${v.id} - ${i}`}
          style={[
            cellStyles.event,
            {
              backgroundColor: eventColor,
              top: i * (CELL_HEIGHT + CELL_ITEM_PADDING),
              borderTopLeftRadius: borderLeft,
              borderBottomLeftRadius: borderLeft,
              borderTopRightRadius: borderRight,
              borderBottomRightRadius: borderRight
            }
          ]}
          onPress={() => onEventPress(v)}
          activeOpacity={0.7}
        >
          {v.type === 'start' || v.type === 'all' ? (
            <View style={cellStyles.eventRow}>
              <Text style={cellStyles.eventText} numberOfLines={1}>
                {v.text}
              </Text>
            </View>
          ) : (
            <></>
          )}
        </TouchableOpacity>
      )
    },
    [onEventPress, colors]
  )

  // 追加イベント表示
  const renderMoreEvents = useCallback(() => {
    if (!hasMoreEvents) return null

    return (
      <View style={cellStyles.moreContainer}>
        <Text style={cellStyles.moreText}>その他</Text>
      </View>
    )
  }, [hasMoreEvents])

  return (
    <TouchableOpacity
      style={[
        cellStyles.cell,
        {
          minHeight: cellMinHeight,
          opacity: state === 'disabled' ? 0.6 : 1,
          backgroundColor:
            state === 'today'
              ? 'rgba(219, 234, 254, 0.3)' // 薄い青色の背景（透明度30%）
              : 'transparent'
        }
      ]}
      onPress={onDayPress}
      activeOpacity={0.7}
    >
      {/* 今日の日付の場合はハイライト円を表示 */}
      {state === 'today' && (
        <View style={cellStyles.todayCircle}>
          <Text style={[getDayTextStyle()]}>{children}</Text>
        </View>
      )}

      {/* 今日以外の日付 */}
      {state !== 'today' && <Text style={getDayTextStyle()}>{children}</Text>}

      {/* イベント表示領域 */}
      <View style={cellStyles.eventsContainer}>
        {events.map((event, i) => renderEvent(event, i))}
        {renderMoreEvents()}
      </View>
    </TouchableOpacity>
  )
}

const cellStyles = StyleSheet.create({
  cell: {
    width: '100%',
    borderRadius: 4,
    padding: 2
  },
  dayText: {
    textAlign: 'center',
    marginBottom: CELL_ITEM_PADDING,
    fontSize: 14,
    fontWeight: '500'
  },
  todayText: {
    color: '#ffffff',
    fontWeight: 'bold' as const
  },
  sundayText: {
    color: '#ef4444' // 日曜日は赤文字
  },
  saturdayText: {
    color: '#3b82f6' // 土曜日は青文字
  },
  disabledText: {
    opacity: 0.5
  },
  todayCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 2
  },
  eventsContainer: {
    flex: 1,
    position: 'relative'
  },
  event: {
    width: '99%',
    height: CELL_HEIGHT,
    borderRadius: CELL_RADIUS,
    position: 'absolute',
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  eventText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    paddingLeft: 4,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.2
  },
  moreContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2
  },
  moreText: {
    fontSize: 9,
    color: '#3b82f6',
    fontWeight: '500'
  }
})
