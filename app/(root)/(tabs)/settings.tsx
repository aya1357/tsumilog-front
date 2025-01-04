import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { logout } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'

interface SettingsItemProp {
  icon: React.ReactNode
  title: string
  onPress?: () => void
  textStyle?: string
  showArrow?: boolean
}

const settings = [
  {
    title: 'My Bookings',
    icon: 'event'
  },
  {
    title: 'Payments',
    icon: 'account-balance-wallet'
  },
  {
    title: 'Profile',
    icon: 'person'
  },
  {
    title: 'Notifications',
    icon: 'notifications'
  },
  {
    title: 'Security',
    icon: 'security'
  },
  {
    title: 'Language',
    icon: 'language'
  },
  {
    title: 'Help Center',
    icon: 'help'
  },
  {
    title: 'Invite Friends',
    icon: 'group'
  }
]

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProp) => (
  <TouchableOpacity onPress={onPress} className="flex flex-row items-center justify-between py-3">
    <View className="flex flex-row items-center gap-3">
      <MaterialIcons name={icon} size={24} color="#1a1a1a" />
      <Text className={`text-black-300 font-rubik-medium text-lg ${textStyle}`}>{title}</Text>
    </View>

    {showArrow && <MaterialIcons name="chevron-right" size={24} color="#1a1a1a" />}
  </TouchableOpacity>
)

export default function Settings() {
  const { user, refetch } = useGlobalContext()

  const handleLogout = async () => {
    const result = await logout()
    if (result) {
      Alert.alert('Success', 'Logged out successfully')
      void refetch({})
    } else {
      Alert.alert('Error', 'Failed to logout')
    }
  }

  return (
    <SafeAreaView className="h-full">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-32 px-7">
        <View className="mt-5 flex flex-row justify-center">
          <View className="relative mt-5 flex flex-col items-center">
            <Image source={{ uri: user?.avatar }} className="relative size-20 rounded-full" />
            <TouchableOpacity className="absolute bottom-11 right-2">
              <MaterialIcons name="camera-alt" size={24} color="#1a1a1a" />
            </TouchableOpacity>

            <Text className="mt-2 font-rubik-bold text-2xl">{user?.name}</Text>
          </View>
        </View>

        <View className="mt-5 flex flex-col border-t border-primary-200 pt-5">
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        <View className="mt-5 flex flex-col border-t border-primary-200 pt-5">
          <SettingsItem
            icon="logout"
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
