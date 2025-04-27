import React from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link, Redirect } from 'expo-router'

import { colors } from '@/components/theme/colors'
import { fonts, fontSizes, lineHeights } from '@/components/theme/typography'
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
      Alert.alert('エラー', 'ログインに失敗しました')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={images.signIn} style={styles.image} resizeMode="contain" />
        <View style={styles.content}>
          <Text style={styles.title}>積みログ</Text>
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <View style={styles.buttonContent}>
              <Image source={icons.google} style={styles.googleIcon} resizeMode="contain" />
              <Text style={styles.buttonText}>Googleアカウントでログイン</Text>
            </View>
          </TouchableOpacity>
          <Link href="/" asChild>
            <Text style={styles.linkText}>ログイン</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.card
  },
  scrollContent: {
    flex: 1
  },
  image: {
    height: '66.666667%',
    width: '100%'
  },
  content: {
    paddingHorizontal: 40
  },
  title: {
    marginTop: 8,
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights['2xl'],
    color: colors.text.primary
  },
  loginButton: {
    marginTop: 20,
    width: '100%',
    borderRadius: 9999,
    backgroundColor: colors.background.card,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  googleIcon: {
    height: 20,
    width: 20
  },
  buttonText: {
    marginLeft: 8,
    fontFamily: fonts.medium,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    color: colors.text.primary
  },
  linkText: {
    textAlign: 'center',
    fontFamily: fonts.medium,
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
    color: colors.text.primary
  }
})

export default SignIn
