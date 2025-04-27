import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import images from '@/constants/images'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'

type CharacterDisplayProps = {
  progress: number
}

export function CharacterDisplay({ progress }: CharacterDisplayProps) {
  const getProgressText = () => {
    if (progress === 0) {
      return `絶不調(0%)`
    } else if (progress < 25) {
      return `不調(${progress}%)`
    } else if (progress < 50) {
      return `順調(${progress}%)`
    } else if (progress < 75) {
      return `好調(${progress}%)`
    } else if (progress < 100) {
      return `絶好調(${progress}%)`
    } else {
      return `達成!(100%)`
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.characterContainer}>
        <Image source={images.character} style={styles.characterImage} resizeMode="contain" />
      </View>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {getProgressText().replace('${progress}', progress.toString())}
        </Text>
      </View>
    </View>
  )
}

CharacterDisplay.displayName = 'CharacterDisplay'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: spacing.md
  },
  characterContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  characterImage: {
    width: 150,
    height: 150
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary
  },
  infoIcon: {
    marginLeft: spacing.xs
  }
})
