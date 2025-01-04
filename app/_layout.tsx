import { PaperProvider } from 'react-native-paper'
import { Stack } from 'expo-router'

import './global.css'

import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import GlobalProvider from '@/lib/global-provider'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Rubik-Bold': require('../assets/fonts/Rubik-Bold.ttf') as number,
    'Rubik-ExtraBold': require('../assets/fonts/Rubik-ExtraBold.ttf') as number,
    'Rubik-Light': require('../assets/fonts/Rubik-Light.ttf') as number,
    'Rubik-Medium': require('../assets/fonts/Rubik-Medium.ttf') as number,
    'Rubik-Regular': require('../assets/fonts/Rubik-Regular.ttf') as number,
    'Rubik-SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf') as number
  })

  useEffect(() => {
    if (fontsLoaded) {
      void SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <GlobalProvider>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </GlobalProvider>
  )
}
