import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { AlarmClock, BookCheck, ChartBar } from 'lucide-react-native'

import { colors } from '@/components/theme/colors'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'

export default function ReportsScreen() {
  const monthlyStats = {
    totalPages: 247,
    totalBooks: 3,
    avgPagesPerDay: 12,
    streak: 8
  }
  const topGenres = [
    { name: 'ビジネス書', percentage: 0.45 },
    { name: '小説', percentage: 0.3 },
    { name: '自己啓発', percentage: 0.25 }
  ]
  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4">
      <Card style={{ marginBottom: 16 }}>
        <View className="flex-row gap-1">
          <BookCheck size={24} color={colors.primary.default} />
          <Text className="mb-4 text-lg font-bold">今月の読書統計</Text>
        </View>

        <View className="mb-4 flex-row justify-between">
          <View className="mx-1 flex-1 items-center rounded-lg bg-blue-50 p-4">
            <Text className="text-primary-700 text-2xl font-bold">{monthlyStats.totalPages}</Text>
            <Text className="mt-1 text-sm text-neutral-600">総ページ数</Text>
          </View>

          <View className="mx-1 flex-1 items-center rounded-lg bg-blue-50 p-4">
            <Text className="text-primary-700 text-2xl font-bold">{monthlyStats.totalBooks}</Text>
            <Text className="mt-1 text-sm text-neutral-600">読んだ本</Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <View className="mx-1 flex-1 items-center rounded-lg bg-blue-50 p-4">
            <Text className="text-primary-700 text-2xl font-bold">
              {monthlyStats.avgPagesPerDay}
            </Text>
            <Text className="mt-1 text-sm text-neutral-600">1日平均</Text>
          </View>

          <View className="mx-1 flex-1 items-center rounded-lg bg-blue-50 p-4">
            <Text className="text-primary-700 text-2xl font-bold">{monthlyStats.streak}</Text>
            <Text className="mt-1 text-sm text-neutral-600">連続日数</Text>
          </View>
        </View>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <View className="flex-row gap-1">
          <ChartBar size={24} color={colors.primary.default} />
          <Text className="mb-4 text-lg font-bold">ジャンル分布</Text>
        </View>

        <View className="space-y-4">
          {topGenres.map((genre, index) => (
            <View key={index} className="mb-2">
              <View className="mb-1 flex-row justify-between">
                <Text className="text-base font-medium">{genre.name}</Text>
                <Text className="text-primary-700 text-base font-medium">
                  {Math.round(genre.percentage * 100)}%
                </Text>
              </View>
              <ProgressBar progress={genre.percentage} color={getGenreColor(index)} height={8} />
            </View>
          ))}
        </View>
      </Card>

      <Card style={{ marginBottom: 16 }}>
        <View className="flex-row gap-1">
          <AlarmClock size={24} color={colors.primary.default} />
          <Text className="mb-4 text-lg font-bold">今月の読書時間帯</Text>
        </View>
        <View className="h-[150px] items-center justify-center rounded-lg bg-neutral-50">
          <Text className="text-sm text-neutral-600">読書時間のグラフがここに表示されます</Text>
        </View>
      </Card>
    </ScrollView>
  )
}

function getGenreColor(index: number): string {
  const genreColors = [
    colors.primary.light,
    colors.secondary.light,
    colors.accent.light,
    colors.success.light,
    colors.error.light
  ]

  return genreColors[index % genreColors.length]
}
