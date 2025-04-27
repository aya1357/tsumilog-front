import React from 'react'
import { ScrollView, Switch, Text, View } from 'react-native'
import {
  Bell,
  CircleHelp as HelpCircle,
  Mail,
  Moon,
  Share2,
  Star,
  Trash
} from 'lucide-react-native'

import { colors } from '@/components/theme/colors'
import { Card } from '@/components/ui/Card'

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(false)

  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4">
      <Text className="mb-2 mt-6 text-lg font-bold">アプリ設定</Text>

      <Card style={{ marginBottom: 16 }}>
        <View className="flex-row items-center justify-between border-b border-neutral-100 py-2">
          <View className="flex-row items-center gap-2">
            <Bell size={20} color={colors.primary.dark} />
            <Text className="text-base">通知</Text>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: colors.neutral.light, true: colors.primary.light }}
            thumbColor={notifications ? colors.primary.default : colors.neutral.medium}
          />
        </View>

        <View className="flex-row items-center justify-between border-b border-neutral-100 py-2">
          <View className="flex-row items-center gap-2">
            <Moon size={20} color={colors.primary.dark} />
            <Text className="text-base">ダークモード</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: colors.neutral.light, true: colors.primary.light }}
            thumbColor={darkMode ? colors.primary.default : colors.neutral.medium}
          />
        </View>
      </Card>

      <Text className="mb-2 text-lg font-bold">その他</Text>

      <Card style={{ marginBottom: 16 }}>
        <View className="flex-row items-center gap-2 border-b border-neutral-100 py-2">
          <Share2 size={20} color={colors.primary.dark} />
          <Text className="text-base">友達に紹介</Text>
        </View>

        <View className="flex-row items-center gap-2 border-b border-neutral-100 py-2">
          <Star size={20} color={colors.primary.dark} />
          <Text className="text-base">アプリを評価</Text>
        </View>

        <View className="flex-row items-center gap-2 border-b border-neutral-100 py-2">
          <Mail size={20} color={colors.primary.dark} />
          <Text className="text-base">お問い合わせ</Text>
        </View>

        <View className="flex-row items-center gap-2 py-2">
          <HelpCircle size={20} color={colors.primary.dark} />
          <Text className="text-base">ヘルプ</Text>
        </View>
      </Card>

      <Card style={{ marginTop: 32 }}>
        <View className="flex-row items-center gap-2 py-2">
          <Trash size={20} color={colors.error.dark} />
          <Text className="text-error-700 text-base">データを削除</Text>
        </View>
      </Card>

      <View className="mt-8 items-center">
        <Text className="text-sm text-neutral-600">バージョン 1.0.0</Text>
      </View>
    </ScrollView>
  )
}
