import React, { useCallback, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import type { DateData } from 'react-native-calendars'
import type { DayProps } from 'react-native-calendars/src/calendar/day'

import type { colors } from '../theme/colors'
import { fonts, fontSizes, lineHeights } from '../theme/typography'
import { CALENDAR_CONSTANTS } from './constants/calendar'
import { DayText } from './DayText'
import { EventItem } from './EventItem'

export type CalendarItem = {
  id: string
  /** 表示順(日付内) */
  index: number
  /** 表示カラー */
  color: string
  /** 表示文字 */
  text: string
  /** テキストを表示するかどうか */
  showText: boolean
}

type Props = DayProps & {
  date?: DateData | undefined
  eventItems: Map<string, CalendarItem[]>
  cellMinHeight: number
  colors: typeof colors
}

export const CalendarDayItem = React.memo((props: Props) => {
  const { date, eventItems: dayItems, children, state, cellMinHeight, colors } = props
  const isSunday = date ? new Date(date.dateString).getDay() === 0 : false
  const isSaturday = date ? new Date(date.dateString).getDay() === 6 : false
  const dayKey = date?.dateString ?? ''

  const events = useMemo(
    () =>
      (dayItems.get(dayKey) ?? [])
        .sort((a, b) => a.index - b.index)
        .slice(0, CALENDAR_CONSTANTS.CELL.MAX_EVENTS),
    [dayKey, dayItems]
  )

  const hasMoreEvents = useMemo(
    () => (dayItems.get(dayKey) ?? []).length > CALENDAR_CONSTANTS.CELL.MAX_EVENTS,
    [dayKey, dayItems]
  )

  const onDayPress = useCallback(() => {
    console.info('on press day', date?.dateString)
  }, [date?.dateString])

  const onEventPress = useCallback((item: CalendarItem) => {
    console.info('on press event', item.text)
  }, [])

  return (
    <TouchableOpacity
      style={[
        styles.cell,
        {
          minHeight: cellMinHeight,
          opacity: state === 'disabled' ? 0.6 : 1,
          backgroundColor: state === 'today' ? colors.primary.lightest : 'transparent'
        }
      ]}
      onPress={onDayPress}
      activeOpacity={0.7}
    >
      {state === 'today' ? (
        <View style={[styles.todayCircle, { backgroundColor: colors.secondary.default }]}>
          <DayText isSunday={isSunday} isSaturday={isSaturday} state={state} colors={colors}>
            {children}
          </DayText>
        </View>
      ) : (
        <DayText isSunday={isSunday} isSaturday={isSaturday} state={state} colors={colors}>
          {children}
        </DayText>
      )}

      <View style={styles.eventsContainer}>
        {events.map((event, i) => (
          <EventItem
            key={`${event.id}-${i}`}
            event={event}
            index={i}
            onPress={onEventPress}
            colors={colors}
          />
        ))}
        {hasMoreEvents && (
          <View style={[styles.moreContainer, { backgroundColor: colors.primary.lightest }]}>
            <Text style={[styles.moreText, { color: colors.primary.default }]}>その他</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
})
CalendarDayItem.displayName = 'CalendarDayItem'

const styles = StyleSheet.create({
  cell: {
    width: '100%',
    borderRadius: 4,
    padding: 2
  },
  todayCircle: {
    width: 24,
    height: 24,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: 2,
    marginBottom: 2
  },
  eventsContainer: {
    flex: 1,
    position: 'relative'
  },
  moreContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2
  },
  moreText: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    textAlign: 'center'
  }
})
