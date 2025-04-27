import { StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Tabs } from 'expo-router'
import { ChartBar as BarChart, Book, Calendar, Settings } from 'lucide-react-native'

import { colors } from '@/components/theme/colors'

export default function TabLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.dark,
        tabBarInactiveTintColor: colors.neutral.dark,
        tabBarStyle: [
          styles.tabBar,
          {
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom
          }
        ],
        tabBarLabelStyle: styles.tabBarLabel
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '読書',
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'カレンダー',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'レポート',
          tabBarIcon: ({ color, size }) => <BarChart size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '設定',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.neutral.white,
    borderTopColor: colors.neutral.light,
    shadowColor: colors.neutral.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 5
  },
  tabBarLabel: {
    fontFamily: 'NotoSansJP-Medium',
    fontSize: 10
  }
})
