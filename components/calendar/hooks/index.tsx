import { useMemo } from 'react'

import { dateFormat } from '@/utils/dateFormatter'

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

export type Schedule = {
  id: string
  /** 予定名 */
  text: string
  /** 予定カラー */
  color: string
  /** 予定日 */
  date: Date
}

const COLORS = [
  '#A3D10C',
  '#8FBC8B',
  '#20B2AA',
  '#FFE944',
  '#FFD700',
  '#DEB887',
  '#FFA07A',
  '#FB7756',
  '#FF4D4D',
  '#FF99E6',
  '#CDA5F3',
  '#B0C4DE',
  '#87CEEB',
  '#9999FF',
  '#6B7DB3',
  '#778899',
  '#6F6D78'
]

export const useCalendarEvents = () => {
  const events = useMemo(
    () => [
      {
        id: 'id-1',
        text: '予定A',
        color: COLORS[0],
        date: new Date(2025, 3, 1)
      },
      {
        id: 'id-2',
        text: '予定B',
        color: COLORS[1],
        date: new Date(2025, 3, 3)
      },
      {
        id: 'id-3',
        text: '予定C',
        color: COLORS[2],
        date: new Date(2025, 3, 4)
      },
      {
        id: 'id-4',
        text: '予定D',
        color: COLORS[3],
        date: new Date(2025, 3, 21)
      },
      {
        id: 'id-5',
        text: '予定E',
        color: COLORS[4],
        date: new Date(2025, 3, 23)
      },
      {
        id: 'id-6',
        text: '予定F',
        color: COLORS[5],
        date: new Date(2025, 3, 23)
      },
      {
        id: 'id-7',
        text: '予定G',
        color: COLORS[6],
        date: new Date(2025, 3, 24)
      },
      {
        id: 'id-8',
        text: '予定H',
        color: COLORS[7],
        date: new Date(2025, 3, 29)
      },
      {
        id: 'id-9',
        text: '予定I',
        color: COLORS[8],
        date: new Date(2025, 3, 30)
      },
      {
        id: 'id-10',
        text: '予定J',
        color: COLORS[9],
        date: new Date(2025, 3, 31)
      }
    ],
    []
  )

  const eventItems = useMemo(() => {
    const result = new Map<string, CalendarItem[]>()
    events.forEach((event) => {
      const dayKey = dateFormat(event.date)
      const currentData = result.get(dayKey)
      // 既存のイベントがある場合、最大のインデックス値を取得
      const maxIndex = currentData?.reduce((max, event) => Math.max(max, event.index), 0)
      result.set(dayKey, [
        ...(currentData ?? []),
        {
          id: event.id,
          index: maxIndex !== undefined ? maxIndex + 1 : 0,
          color: event.color,
          text: event.text,
          showText: true
        }
      ])
    })
    return result
  }, [events])

  return { eventItems, isLoading: false }
}
