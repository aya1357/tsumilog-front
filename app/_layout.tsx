import { PaperProvider } from 'react-native-paper'
import { Stack } from 'expo-router'

import './global.css'

import { useEffect } from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

import GlobalProvider from '@/lib/global-provider'

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'NotoSansJP-Black': require('../assets/fonts/NotoSansJP-Black.ttf') as number,
    'NotoSansJP-Bold': require('../assets/fonts/NotoSansJP-Bold.ttf') as number,
    'NotoSansJP-ExtraBold': require('../assets/fonts/NotoSansJP-ExtraBold.ttf') as number,
    'NotoSansJP-ExtraLight': require('../assets/fonts/NotoSansJP-ExtraLight.ttf') as number,
    'NotoSansJP-Light': require('../assets/fonts/NotoSansJP-Light.ttf') as number,
    'NotoSansJP-Medium': require('../assets/fonts/NotoSansJP-Medium.ttf') as number,
    'NotoSansJP-Regular': require('../assets/fonts/NotoSansJP-Regular.ttf') as number,
    'NotoSansJP-SemiBold': require('../assets/fonts/NotoSansJP-SemiBold.ttf') as number,
    'NotoSansJP-Thin': require('../assets/fonts/NotoSansJP-Thin.ttf') as number
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
