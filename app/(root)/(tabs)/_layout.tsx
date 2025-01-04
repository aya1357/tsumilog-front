import { Tabs } from 'expo-router'

import { TabIcon } from '@/components/general/TabIcon'
import { IconMap } from '@/constants/iconMap'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FBFBFD',
          position: 'absolute',
          borderTopColor: '#0061FF1A',
          borderTopWidth: 1,
          minHeight: 70
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              IconComponent={IconMap.Ionicons}
              iconName="home"
              title="Home"
            />
          )
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              IconComponent={IconMap.Ionicons}
              iconName="calendar"
              title="読書"
            />
          )
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              IconComponent={IconMap.Ionicons}
              iconName="settings-sharp"
              title="設定"
            />
          )
        }}
      />
    </Tabs>
  )
}
