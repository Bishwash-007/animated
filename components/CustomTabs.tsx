import React from "react";
import { icons } from "lucide-react-native";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";

type IconName = keyof typeof icons;

interface TabItem {
  iconName: IconName;
  label: string;
}

interface TabsProps {
  data: TabItem[];
  selectedIndex?: number;
  onChange?: (index: number) => void;
  activeColor?: string;
  activeBackgroundColor?: string;
  inactiveColor?: string;
  inactiveBackgroundColor?: string;
  tabStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

interface IconComponentProps {
  name: IconName;
  color?: string;
}

const Icon: React.FC<IconComponentProps> = ({ name, color }) => {
  const IconComponent = icons[name];
  return IconComponent ? (
    <IconComponent color={color} size={24} style={{ marginLeft: 6 }} />
  ) : null;
};

const CustomTabs: React.FC<TabsProps> = ({
  data,
  selectedIndex = 0,
  onChange,
  activeColor = "#ffffff",
  inactiveColor = "#888888",
  activeBackgroundColor = "#ffffff",
  inactiveBackgroundColor = "#121212",
  tabStyle,
  labelStyle,
}) => {
  return (
    <Animated.View style={styles.tabContainer}>
      {data.map(({ iconName, label }, idx) => {
        const isActive = idx === selectedIndex;
        const color = isActive ? inactiveColor : activeColor;

        return (
          <TouchableOpacity
            key={idx}
            onPress={() => onChange?.(idx)}
            style={[
              styles.tab,
              {
                backgroundColor: isActive
                  ? activeBackgroundColor
                  : inactiveBackgroundColor,
              },
              tabStyle,
            ]}
          >
            <Icon name={iconName} color={color} />
            {isActive && (
              <Animated.Text
                entering={FadeInLeft.springify().damping(80).stiffness(200)}
                exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
                style={[{ color, marginLeft: 8 }, labelStyle]}
              >
                {label}
              </Animated.Text>
            )}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    paddingVertical: 8,
    borderRadius: 8,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 18,
  },
});

export default CustomTabs;
