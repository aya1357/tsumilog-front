import React from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router'

import icons from '@/constants/icons'
import images from '@/constants/images'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext()

  if (!loading && isLoggedIn) return <Redirect href="/" />

  const handleLogin = async () => {
    const result = await login()

    if (result) {
      void refetch({})
    } else {
      Alert.alert('Error', 'Failed to login')
    }
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.signIn} className="h-4/6 w-full" resizeMode="contain" />
        <View className="px-10">
          <Text className="mt-2 text-center font-rubik-bold text-3xl text-black">積みログ</Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="mt-5 w-full rounded-full bg-white py-4 shadow-md shadow-zinc-300"
          >
            <View className="flex flex-row items-center justify-center">
              <Image source={icons.google} className="h-5 w-5" resizeMode="contain" />
              <Text className="ml-2 font-rubik-medium text-lg text-black">
                Googleアカウントでログイン
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
