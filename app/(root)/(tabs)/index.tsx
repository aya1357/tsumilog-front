import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'

import { CharacterDisplay } from '@/components/home/CharacterDisplay'
import { DateScroller } from '@/components/home/DateScroller'
import { ReadingSimulator } from '@/components/home/ReadingSimulator'
import { ReadingStatsCard } from '@/components/home/ReadingStatsCard'
import { RecentProgressCard } from '@/components/home/RecentProgressCard'

export default function HomeScreen() {
  const generateDates = () => {
    const today = new Date()
    const dates = []
    const threeMonthsAgo = new Date(today)
    threeMonthsAgo.setMonth(today.getMonth() - 2)
    threeMonthsAgo.setDate(1)
    for (let d = new Date(threeMonthsAgo); d <= today; d.setDate(d.getDate() + 1)) {
      dates.push({
        date: new Date(d),
        hasReading: Math.random() > 0.5,
        isToday: d.toDateString() === today.toDateString(),
        isSelected: d.toDateString() === today.toDateString()
      })
    }
    return dates
  }
  const [dates, setDates] = useState(generateDates())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setDates(
      dates.map((d) => ({
        ...d,
        isSelected: d.date.toDateString() === date.toDateString()
      }))
    )
  }
  const recentEntries = [
    { id: '1', date: '4月20日', title: '思考の整理学', pages: 15 },
    { id: '2', date: '4月19日', title: 'アトミック・ハビット', pages: 20 },
    { id: '3', date: '4月18日', title: '思考の整理学', pages: 12 },
    { id: '4', date: '4月17日', title: '7つの習慣', pages: 18 },
    { id: '5', date: '4月16日', title: 'デザインの心理学', pages: 25 },
    { id: '6', date: '4月15日', title: '影響力の武器', pages: 30 },
    { id: '7', date: '4月14日', title: 'マンガでわかる統計学', pages: 22 },
    { id: '8', date: '4月13日', title: '時間革命', pages: 17 },
    { id: '9', date: '4月12日', title: '超効率勉強法', pages: 28 },
    { id: '10', date: '4月11日', title: '習慣の力', pages: 19 }
  ]

  const monthlyGoal = {
    targetPages: 200,
    currentPages: 200,
    daysRemaining: 10,
    todayPages: 20,
    previousDayPages: 15,
    monthlyTotalPages: 200,
    previousMonthPages: 170,
    progressPercentage: 100
  }

  const monthlyComparison = {
    currentPages: 200,
    previousPages: 170
  }

  const handleEntryPress = (id: string) => {
    console.log('Entry pressed:', id)
  }
  // 読書の進捗率（0〜100）
  const readingProgress = 100

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" contentContainerClassName="p-4">
        <RecentProgressCard
          entries={recentEntries}
          onEntryPress={handleEntryPress}
          monthlyComparison={monthlyComparison}
        />
        <DateScroller dates={dates} onDateSelect={handleDateSelect} selectedDate={selectedDate} />
        <CharacterDisplay progress={readingProgress} />
        <ReadingStatsCard
          targetPages={monthlyGoal.targetPages}
          daysRemaining={monthlyGoal.daysRemaining}
          todayPages={monthlyGoal.todayPages}
          previousDayPages={monthlyGoal.previousDayPages}
          monthlyTotalPages={monthlyGoal.monthlyTotalPages}
          previousMonthPages={monthlyGoal.previousMonthPages}
        />
        <ReadingSimulator />
      </ScrollView>
    </View>
  )
}
