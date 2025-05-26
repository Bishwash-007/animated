import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { ArrowLeft } from "lucide-react-native";
import { router } from "expo-router";

const Swiper = () => {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(1, { duration: 500 }),
    transform: [
      {
        translateY: withTiming(0, { duration: 500 }),
      },
    ],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity onPress={router.back}>
        <ArrowLeft size={30} color="white" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 12,
    borderRadius: 12,
    zIndex: 10,
  },
});

export default Swiper;