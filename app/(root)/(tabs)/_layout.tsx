import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import Icons from "react-native-vector-icons/MaterialIcons";

type TabTextStylesProps = {
  base: string;
  state: {
    focused: string;
    unfocused: string;
  };
};

const tabTextStyles: TabTextStylesProps = {
  base: "text-xs w-full text-center mt-1",
  state: {
    focused: "text-primary-300 font-rubik-medium",
    unfocused: "text-black-200 font-rubik",
  },
};

type TabIconProps = {
  focused: boolean;
  iconName: string;
  title: string;
};

function TabIcon({
  focused,
  iconName,
  title,
}: TabIconProps) {
  return (
    <View className="flex-1 mt-1 flex flex-col items-center">
      <Icons
        name={iconName}
        size={24}
        color={focused ? "#0061FF" : "#666876"}
      />
      <Text
        className={`${tabTextStyles.base} ${
          focused ? tabTextStyles.state.focused : tabTextStyles.state.unfocused
        }`}
      >
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          borderTopColor: "#0061FF1A",
          borderTopWidth: 1,
          minHeight: 70,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home" title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="settings" title="設定" />
          ),
        }}
      />
    </Tabs>
  );
}
