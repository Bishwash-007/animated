import {
  Dimensions,
  Switch,
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

// Theme configuration
const Colors = {
  dark: {
    background: "#121212",
    circle: "#FFFFFF",
    text: "#FFFFFF",
  },
  light: {
    background: "#FFFFFF",
    circle: "#121212",
    text: "#000000",
  },
} as const;

// Track colors for the Switch component
const SWITCH_COLOR_TRACK = {
  false: "rgba(0, 0, 0, 0.3)",
  true: "rgba(255, 255, 255, 0.4)",
} as const;

type Theme = keyof typeof Colors;

// Constants
const SCREEN_WIDTH = Dimensions.get("screen").width;
const COMPONENT_SIZE = SCREEN_WIDTH * 0.7;

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("light");

  const progress = useDerivedValue(() =>
    theme === "dark"
      ? withTiming(1, { easing: Easing.bezier(0.4, 0, 0.2, 1) })
      : withTiming(0, { easing: Easing.bezier(0.4, 0, 0.2, 1) })
  );

  const rBackgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background]
    ),
  }));

  const rCircleStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle]
    ),
  }));

  const rTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text]
    ),
  }));

  const handleThemeToggle = (isDark: boolean) => {
    setTheme(isDark ? "dark" : "light");
  };

  return (
    <Animated.View style={[styles.container, rBackgroundStyle]}>
      <StatusBar
        barStyle={theme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={Colors[theme].background}
      />

      {/* Back Button */}
      <TouchableOpacity onPress={router.back} style={styles.backButton}>
        <ArrowLeft size={28} color={theme === "dark" ? "white" : "black"} />
      </TouchableOpacity>

      {/* Background Circle */}
      <Animated.View
        style={[
          rCircleStyle,
          {
            width: COMPONENT_SIZE,
            height: COMPONENT_SIZE,
            position: "absolute",
            borderRadius: COMPONENT_SIZE / 2,
          },
        ]}
      />

      {/* Foreground Content */}
      <View style={styles.content}>
        <Animated.Text style={[styles.themeText, rTextStyle]}>
          Theme: {theme}
        </Animated.Text>
        <Switch
          value={theme === "dark"}
          onValueChange={handleThemeToggle}
          trackColor={SWITCH_COLOR_TRACK}
          thumbColor={Colors[theme].circle}
        />
      </View>
    </Animated.View>
  );
};

export default ThemeSwitcher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    zIndex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  themeText: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
});