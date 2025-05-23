/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect, Slot, usePathname } from 'expo-router'

import Header from '@/components/general/Header'
import { useGlobalContext } from '@/lib/global-provider'

const routeTitles: Record<string, string> = {
  '/': '読書',
  '/settings': '設定',
  '/calendar': 'カレンダー',
  '/reports': 'レポート'
}

export default function AppLayout() {
  const { loading, isLoggedIn } = useGlobalContext()
  const pathname = usePathname()

  if (loading) {
    return (
      <SafeAreaView className="flex h-full items-center justify-center bg-base-white">
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    )
  }

  // ToDo: ログイン機能の修正
  // if (!isLoggedIn) return <Redirect href="/sign-in" />

  return (
    <View className="flex h-full bg-base-white">
      <Header title={routeTitles[pathname] || 'Title'} />
      <Slot />
    </View>
  )
}
