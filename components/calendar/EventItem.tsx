import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import type { colors } from '../theme/colors'
import { fonts, fontSizes, lineHeights } from '../theme/typography'
import type { CalendarItem } from './CalendarDayItem'
import { CALENDAR_CONSTANTS } from './constants/calendar'

type Props = {
  event: CalendarItem
  index: number
  onPress: (item: CalendarItem) => void
  colors: typeof colors
}

export const EventItem = React.memo(({ event, index, onPress, colors }: Props) => {
  const { CELL } = CALENDAR_CONSTANTS

  return (
    <TouchableOpacity
      style={[
        styles.eventItem,
        {
          backgroundColor: event.color || colors.primary.default,
          top: index * (CELL.HEIGHT + CELL.ITEM_PADDING)
        }
      ]}
      onPress={() => onPress(event)}
      activeOpacity={0.7}
    >
      {event.showText && (
        <View style={styles.eventRow}>
          <Text style={styles.eventText} numberOfLines={1}>
            {event.text}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
})

EventItem.displayName = 'EventItem'

const styles = StyleSheet.create({
  eventItem: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: CALENDAR_CONSTANTS.CELL.HEIGHT,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: CALENDAR_CONSTANTS.CELL.RADIUS
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  eventText: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.sm,
    textAlign: 'center',
    color: '#FFFFFF'
  }
})
