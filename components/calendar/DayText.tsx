import React, { useMemo } from 'react'
import { StyleSheet, Text, type TextStyle } from 'react-native'

import { CALENDAR_CONSTANTS } from './constants/calendar'

type Props = {
  children: React.ReactNode
  isSunday: boolean
  isSaturday: boolean
  state: string | undefined
}

export const DayText = React.memo(({ children, isSunday, isSaturday, state }: Props) => {
  const textStyle = useMemo(() => {
    const styleArray: TextStyle[] = [styles.dayText]

    if (isSunday) styleArray.push(styles.sundayText)
    if (isSaturday) styleArray.push(styles.saturdayText)
    if (state === 'today') styleArray.push(styles.todayText)
    if (state === 'disabled') styleArray.push(styles.disabledText)

    return styleArray
  }, [isSunday, isSaturday, state])

  return <Text style={textStyle}>{children}</Text>
})

DayText.displayName = 'DayText'

const styles = StyleSheet.create({
  dayText: {
    textAlign: 'center',
    marginBottom: CALENDAR_CONSTANTS.CELL.ITEM_PADDING,
    fontSize: 14,
    fontWeight: '500'
  },
  todayText: {
    color: '#ffffff',
    fontWeight: 'bold' as const
  },
  sundayText: {
    color: CALENDAR_CONSTANTS.COLORS.SUNDAY
  },
  saturdayText: {
    color: CALENDAR_CONSTANTS.COLORS.SATURDAY
  },
  disabledText: {
    opacity: 0.5
  }
})
