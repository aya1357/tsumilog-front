import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import type { CalendarItem } from './CalendarDayItem'
import { CALENDAR_CONSTANTS } from './constants/calendar'

type Props = {
  event: CalendarItem
  index: number
  onPress: (item: CalendarItem) => void
}

export const EventItem = React.memo(({ event, index, onPress }: Props) => {
  const { CELL } = CALENDAR_CONSTANTS

  return (
    <TouchableOpacity
      style={[
        styles.eventItem,
        {
          backgroundColor: event.color || CALENDAR_CONSTANTS.COLORS.DEFAULT_EVENT,
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
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center'
  }
})
