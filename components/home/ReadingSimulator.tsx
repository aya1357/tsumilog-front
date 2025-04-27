import React, { useState } from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  Modal,
  Button as PaperButton,
  TextInput as PaperTextInput,
  Portal
} from 'react-native-paper'
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { Calculator } from 'lucide-react-native'

import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { typography } from '../theme/typography'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

type SimulatorMode = 'pages' | 'days'

type SimulatorResult = {
  daysNeeded?: number
  pagesPerDay?: number
  completionDate?: string
}

export function ReadingSimulator() {
  const [mode, setMode] = useState<SimulatorMode>('pages')
  const [totalPages, setTotalPages] = useState('')
  const [dailyPages, setDailyPages] = useState('')
  const [targetDate, setTargetDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [dateText, setDateText] = useState('')
  const [result, setResult] = useState<SimulatorResult | null>(null)

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const currentDate = selectedDate
      setShowDatePicker(Platform.OS === 'ios') // iOSでのみモーダルを表示し続ける
      setTargetDate(currentDate)

      // 日本語形式で日付を表示
      const formattedDate = currentDate.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      setDateText(formattedDate)
    }
  }

  const calculate = () => {
    if (mode === 'pages') {
      const total = parseInt(totalPages)
      const daily = parseInt(dailyPages)

      if (total && daily) {
        const days = Math.ceil(total / daily)
        const completion = new Date()
        completion.setDate(completion.getDate() + days)

        setResult({
          daysNeeded: days,
          completionDate: completion.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        })
      }
    } else {
      const total = parseInt(totalPages)

      if (total && targetDate) {
        const today = new Date()
        const diffTime = Math.abs(targetDate.getTime() - today.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays <= 0) {
          // 過去の日付や今日の場合はエラー処理
          alert('未来の日付を選択してください')
          return
        }

        const pagesPerDay = Math.ceil(total / diffDays)

        setResult({
          pagesPerDay
        })
      }
    }
  }

  return (
    <Card style={styles.card}>
      <View style={styles.headerContainer}>
        <Calculator size={20} color={colors.accent.dark} />
        <Text style={styles.title}>読書シミュレーター</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, mode === 'pages' && styles.activeTab]}
          onPress={() => setMode('pages')}
        >
          <Text style={[styles.tabText, mode === 'pages' && styles.activeTabText]}>
            ページ数から計算
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, mode === 'days' && styles.activeTab]}
          onPress={() => setMode('days')}
        >
          <Text style={[styles.tabText, mode === 'days' && styles.activeTabText]}>
            日数から計算
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>本の総ページ数</Text>
          <PaperTextInput
            mode="outlined"
            value={totalPages}
            onChangeText={setTotalPages}
            placeholder="例）90"
            keyboardType="numeric"
            style={styles.input}
            placeholderTextColor={colors.neutral.dark}
            activeOutlineColor={colors.primary.default}
            dense={true}
          />
          <Text style={styles.unit}>ページ</Text>
        </View>

        {mode === 'pages' ? (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>1日の目標ページ数</Text>
            <PaperTextInput
              mode="outlined"
              value={dailyPages}
              onChangeText={setDailyPages}
              placeholder="例）5"
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor={colors.neutral.dark}
              activeOutlineColor={colors.primary.default}
              dense={true}
            />
            <Text style={styles.unit}>ページ</Text>
          </View>
        ) : (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>読み終えたい日付</Text>
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>{dateText || '日付を選択'}</Text>
            </TouchableOpacity>

            {/* AndroidとiOSで分岐処理 */}
            {showDatePicker && Platform.OS === 'android' && (
              <DateTimePicker
                value={targetDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>
        )}

        <Button
          title="計算"
          onPress={calculate}
          variant="primary"
          style={styles.button}
          disabled={mode === 'pages' ? !totalPages || !dailyPages : !totalPages || !dateText}
        />
      </View>

      {result && (
        <View style={styles.resultContainer}>
          {mode === 'pages' ? (
            <>
              <Text style={styles.resultText}>
                読み終わるまで <Text style={styles.highlight}>{result.daysNeeded}日</Text>{' '}
                かかります
              </Text>
              <Text style={styles.resultText}>
                完了予定日: <Text style={styles.highlight}>{result.completionDate}</Text>
              </Text>
            </>
          ) : (
            <Text style={styles.resultText}>
              1日 <Text style={styles.highlight}>{result.pagesPerDay}ページ</Text>{' '}
              読む必要があります
            </Text>
          )}
        </View>
      )}

      {/* iOS用のモーダルDatePicker */}
      {Platform.OS === 'ios' && (
        <Portal>
          <Modal
            visible={showDatePicker}
            onDismiss={() => setShowDatePicker(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <DateTimePicker
              value={targetDate}
              mode="date"
              display="inline"
              onChange={onDateChange}
              locale="ja-JP"
              minimumDate={new Date()}
            />
            <PaperButton
              mode="contained"
              onPress={() => setShowDatePicker(false)}
              style={styles.modalButton}
            >
              完了
            </PaperButton>
          </Modal>
        </Portal>
      )}
    </Card>
  )
}

ReadingSimulator.displayName = 'ReadingSimulator'

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.xxl
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    gap: 2
  },
  title: {
    ...typography.h4,
    color: colors.neutral.darkest
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
    backgroundColor: colors.neutral.lightest,
    borderRadius: spacing.sm,
    padding: spacing.xs
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: spacing.xs
  },
  activeTab: {
    backgroundColor: colors.primary.default
  },
  tabText: {
    ...typography.subtitle2,
    color: colors.neutral.darker
  },
  activeTabText: {
    color: colors.neutral.white
  },
  inputContainer: {
    gap: spacing.md
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm
  },
  label: {
    ...typography.subtitle2,
    flex: 1
  },
  input: {
    height: 40,
    backgroundColor: 'transparent',
    fontSize: typography.body1.fontSize,
    textAlign: 'center',
    width: 100
  },
  datePickerButton: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.neutral.dark,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.sm
  },
  datePickerText: {
    ...typography.body1,
    color: colors.neutral.darkest
  },
  unit: {
    ...typography.body2,
    color: colors.neutral.darker,
    width: 50
  },
  button: {
    marginTop: spacing.sm
  },
  resultContainer: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.neutral.lightest,
    borderRadius: spacing.sm
  },
  resultText: {
    ...typography.body2,
    textAlign: 'center',
    marginBottom: spacing.xs
  },
  highlight: {
    ...typography.subtitle1,
    color: colors.primary.dark
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: spacing.md,
    margin: spacing.lg,
    borderRadius: spacing.md
  },
  modalButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary.default
  }
})
