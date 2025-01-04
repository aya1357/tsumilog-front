import { View } from 'react-native'
import { Card, Text } from 'react-native-paper'

export default function Index() {
  return (
    <View className="mx-4 mt-2 justify-center">
      <Card style={{ width: '100%', backgroundColor: '#FBFBFD' }}>
        <Card.Content className="flex-row justify-between px-16">
          <View>
            <View className="flex-row items-center">
              <Text className="mr-2 text-neutral-200">今日</Text>
              <Text className="text-3xl font-semibold">0P</Text>
            </View>
            <Text className="text-neutral-200">前日比 -</Text>
          </View>
          <View>
            <View className="flex-row items-center">
              <Text className="mr-2 text-neutral-200">今月</Text>
              <Text className="text-3xl font-semibold">500P</Text>
            </View>
            <Text className="text-neutral-200">前月比 -</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}
